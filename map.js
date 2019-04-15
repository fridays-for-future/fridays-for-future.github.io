(function () {
  var viewportElem = document.getElementById('viewport');
  var mapSectionElem = document.getElementById('map-section');
  var showMapElem = document.getElementById('show-map');
  var hideMapElem = document.getElementById('hide-map');
  var mapContainerElem = document.getElementById('map-container');
  
  showMapElem.addEventListener('click', function (e) {
    mapContainerElem.style.visibility = 'visible';
    var viewportRect = viewportElem.getBoundingClientRect();
    var xv = viewportRect.x;
    var yv = viewportRect.y;
    var showMapRect = showMapElem.getBoundingClientRect();
    var y0 = showMapRect.y;
    var x0 = showMapRect.x;
    var h0 = showMapRect.height;
    var w0 = showMapRect.width;
    mapContainerElem.style.top = y0 - yv + 'px';
    mapContainerElem.style.left = x0 - xv + 'px';
    mapContainerElem.style.height = "48px";
    mapContainerElem.style.width = w0 + "px";
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        mapContainerElem.style.transitionProperty = 'top, left, width, height';
        mapContainerElem.style.top = '0';
        mapContainerElem.style.left = '0';
        mapContainerElem.style.width = '100%';
        mapContainerElem.style.height = '100%';
        window.setTimeout(function () {
        }, 300);
      })
    })
    e.preventDefault();
  });
  
  hideMapElem.addEventListener('click', function (e) {
  var viewportRect = viewportElem.getBoundingClientRect();
  var xv = viewportRect.x;
  var yv = viewportRect.y;
  var showMapRect = showMapElem.getBoundingClientRect();
  var y0 = showMapRect.y;
  var x0 = showMapRect.x;
  var h0 = showMapRect.height;
  var w0 = showMapRect.width;
    mapContainerElem.style.top = y0 - yv + 'px';
    mapContainerElem.style.left = x0 - xv + 'px';
    mapContainerElem.style.height = "48px";
    mapContainerElem.style.width = w0 + "px";
    window.setTimeout(function () {
      mapContainerElem.style.visibility = 'hidden';
      mapContainerElem.style.transitionProperty = 'none';
    }, 300);
    e.preventDefault();
  });
})();
