

const scheduleroot = document.getElementById("schedule-root");
let emojis = {
    "Aktivismus" : "📢",
    "Gesellschaft" : "💬",
    "Klimawandel" : "🌍"
}

let days = ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];


function addEvent(event, alternate) {
    let html = document.createElement("div");
    html.className = alternate ? "gridline alternate" : "gridline";

    var speaker = "";
    for (i = 0; i < event.persons.length; i++)
        speaker += i==0? event.persons[i].public_name : ", "+event.persons[i].public_name;
    
    let emoji;
    if (event.track in emojis)
        emoji = emojis[event.track];
    else
        emoji = "";
    html.innerHTML = "<div class=\"time\"><a href=\"" + event.url + "\">" + event.start + "</a></div><div><div class=\"title\">" + emoji + " " + speaker + ": " + event.title + "</div>" + event.abstract + "</div><div class=\"institution\">" + event.type + "</div>";
    scheduleroot.appendChild(html);
}

function addDay(day) {
    let html = document.createElement("h3");
    let date = new Date(day.date);
    
    html.innerText = days[date.getDay()] + ", " + date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear();
    scheduleroot.appendChild(html);
}



function getScheduleJson(){
    // read text from URL location
    var request = new XMLHttpRequest();
    request.open('GET', 'https://pretalx.hacc.space/fffmuc-klimacamp20/schedule/export/schedule.json', true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            schedule = JSON.parse(request.response).schedule.conference.days;
            for (var day of schedule) {
                var dayempty = true;
                if (Object.keys(day.rooms).length !== 0) {
                    if (dayempty) {
                        addDay(day);
                        dayempty = false;
                    }
                    // day contains events, otherwise skip it
                    var alternate = false;
                    for (var room in day.rooms) {
                        day.rooms[room].forEach(function(event){
                            addEvent(event, alternate)
                            alternate = !alternate;
                        });
                    }
                }
            }
        }
    }
}

getScheduleJson();







