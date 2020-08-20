

function getLibrary(){
    // read text from URL location
    var request = new XMLHttpRequest();
    var request2 = new XMLHttpRequest();
    request.open('GET', 'https://pad.hacc.space/s/rk8edGjMP#', true);
    request.send(null);
    
    
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            let markdown = request.response.split(`<div id="doc" class="container markdown-body">`)[1].split("</div>")[0];
            var converter = new showdown.Converter();
            converter.setOption("emoji", true);
            let html = converter.makeHtml(markdown);
            document.getElementById("climatelibrary-root").innerHTML = html;
        }
    }
}

getLibrary();



