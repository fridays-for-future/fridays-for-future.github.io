

const scheduleroot = document.getElementById("schedule-root");
let emojis = {
    "Aktivismus" : "📢",
    "Gesellschaft" : "💬",
    "Klimawandel" : "🌍"
}

let days = ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];


function addEvent(title, url, start, abstract, type, alternate) {
    let html = document.createElement("div");
    html.className = alternate ? "gridline alternate" : "gridline";

    link = url=="" ? start : "<a href=\"" + url + "\">" + start + "</a>";

    html.innerHTML = "<div class=\"time\">" + link + "</div><div><div class=\"title\">" + title + "</div>" + abstract + "</div><div class=\"institution\">" + type + "</div>";
    scheduleroot.appendChild(html);
}

function addDay(date) {
    let html = document.createElement("h3");
    
    html.innerText = days[date.getDay()] + ", " + date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear();
    scheduleroot.appendChild(html);
}


function* pretalxGen(pretalx) {
    for (var day of pretalx) {
        var dayempty = true;
        if (Object.keys(day.rooms).length !== 0) {
            if (dayempty) {
                dayempty = false;
            }
            // day contains events, otherwise skip it
            for (var room in day.rooms) {
                for (var event of day.rooms[room]){
                    yield event;
                }
            }
        }
    }
}

function* icalGen(ical) {
    var list = ical.getAllSubcomponents("vevent").sort(function(a,b){return a.getFirstPropertyValue("dtstart")>b.getFirstPropertyValue("dtstart");});
    for (var event of list) {
        yield event;
    }
}

var alternate = false;
var currentday;

function updateDay(date) {
    if (currentday === undefined || date.getDate() != currentday.getDate() || date.getMonth() != date.getMonth()) {
        currentday = date;
        addDay(date);
        alternate = false;
    } else {
        alternate = !alternate;
    }
}

function addPretalx(event, date) {
    updateDay(date);

    var speaker = "";
    for (i = 0; i < event.persons.length; i++)
        speaker += i==0? event.persons[i].public_name : ", "+event.persons[i].public_name;
    
    let emoji;
    if (event.track in emojis)
        emoji = emojis[event.track];
    else
        emoji = "";
    addEvent(emoji + " " + speaker + ": " + event.title, event.url, event.start, event.abstract, event.type, alternate); // TODO
    alternate = !alternate;
}

function addIcal(event, date) {
    updateDay(date);
    
    let abstract = event.getFirstPropertyValue("description");
    if (abstract == null) abstract = "";
    
    let type = event.getFirstPropertyValue("location");
    if (type == null) type = "";
    
    addEvent(event.getFirstPropertyValue("summary"), "", 
        (100 + date.getHours()+"").slice(1,3) + ":" + (100 + date.getMinutes()+"").slice(1,3),
        abstract, type, alternate)
}

function displaySchedule(pretalxraw, icalraw) {
    
    var pretalx = pretalxGen(pretalxraw);
    var ical = icalGen(icalraw);
    
    let pnext = pretalx.next().value;
    let pdate = new Date(pnext.date);
    let inext = ical.next().value;
    let idate = new Date(inext.getFirstPropertyValue("dtstart"));

    while (true) {
        
        if (pdate < idate) {
            addPretalx(pnext, pdate);
            pnext = pretalx.next().value;
            if (pnext === undefined) break;
            pdate = new Date(pnext.date);
        }
        
        if (pdate >= idate) {
            addIcal(inext, idate);
            inext = ical.next().value;
            if (inext === undefined) break;
            idate = new Date(inext.getFirstPropertyValue("dtstart"));
        }
        
    }
    
    while(pnext !== undefined) {
        pdate = new Date(pnext.date);
        addPretalx(pnext, pdate);
        pnext = pretalx.next().value;
    }
    
    while (inext !== undefined) {
        idate = new Date(inext.getFirstPropertyValue("dtstart"));
        addIcal(inext, idate);
        inext = ical.next().value;
    }
    
}


function getSchedule(){
    // read text from URL location
    var request = new XMLHttpRequest();
    var request2 = new XMLHttpRequest();
    request.open('GET', 'https://pretalx.hacc.space/fffmuc-klimacamp20/schedule/export/schedule.json', true);
    request2.open('GET', 'https://cloud.infra4future.de/remote.php/dav/public-calendars/r9ge3wS48e69Qnsf/?export', true);
    request.send(null);
    request2.send(null);
    
    var pretalx, ical;
    var load = 0;
    
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            pretalx = JSON.parse(request.response).schedule.conference.days;
            load += 1;
            if (load==2) displaySchedule(pretalx, ical);
        }
    }
    request2.onreadystatechange = function () {
        if (request2.readyState === 4 && request2.status === 200) {
            ical = new ICAL.Component(ICAL.parse(request2.response));
            load += 1;
            if (load==2) displaySchedule(pretalx, ical);
        }
    }
}

getSchedule();







