

const scheduleroot = document.getElementById("schedule-root");
let emojis = {
    "Aktivismus" : "📢",
    "Gesellschaft" : "💬",
    "Klimawandel" : "🌍"
}

let days = ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];

const converter = new showdown.Converter();
converter.setOption("emoji", true);
converter.setOption("simplifiedAutoLink", true);

// teamup does weird stuff with its text, which is almost but not quite markdown, so there's some monkey-patching in here
function deescape (input) {
    return input.replace(/\s\\\"/g," “")
                .replace(/\\\"\s/g,"” ")
                .replace(/\\\"/g,"\"")
                .replace(/\\\*/g,"*");
}

function addEvent(title, url, start, abstract, place, alternate) {
    let html = document.createElement("div");
    html.className = alternate ? "gridline alternate" : "gridline";

    let time = null;
    if (url != "") {
        time = document.createElement("a");
        time.href = url;
    } else {
        time = document.createElement("div");
    }
    time.innerText = start;
    time.classList.add("time");
    html.appendChild(time);
    
    let dtitle = document.createElement("div");
    dtitle.className = "title";
    dtitle.innerText = deescape(title);
    
    let dtype = null;
    if (place.slice(0,8) == "https://") {
        dtype = document.createElement("a");
        dtype.href = place;
        dtype.innerText = place.replace("https://", "")
                               .replace("http://", "")
                               .split("/")[0];
    } else {
        dtype = document.createElement("div");
        dtype.innerText = deescape(place);
    }
    dtype.className = "institution";
    
    let dabstract = document.createElement("div");
    dabstract.innerHTML = converter.makeHtml(deescape(abstract));
    
    let content = document.createElement("div");
    content.appendChild(dtitle);
    content.appendChild(dabstract);
    html.appendChild(content);
    html.appendChild(dtype);
    
    
    scheduleroot.appendChild(html);
}

function addDay(date) {
    let html = document.createElement("h3");
    
    html.innerText = days[date.getDay()] + ", " + date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear();
    scheduleroot.appendChild(html);
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

function displaySchedule(icalraw) {
    
    var ical = icalGen(icalraw);
    
    let next = ical.next().value;
    let date = new Date(next.getFirstPropertyValue("dtstart"));
    
    let limit = new Date() - 1000 * 60 * 60 * 24 * 30;
    console.log(limit);

    while (next !== undefined) {
        date = new Date(next.getFirstPropertyValue("dtstart"));
        if (date > limit)
            addIcal(next, date);
        next = ical.next().value;
    }
    
}


function getSchedule(){
    // read text from URL location
    var request2 = new XMLHttpRequest();
    request2.open('GET', 'https://chaski.stuebinm.eu/fff-cal.ics', true);
    request2.send(null);
    
    
    request2.onreadystatechange = function () {
        if (request2.readyState === 4 && request2.status === 200) {
            let ical = new ICAL.Component(ICAL.parse(request2.response));
            displaySchedule(ical);
        }
    }
}

getSchedule();








