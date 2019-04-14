(function () {
  var mapSectionElem = document.getElementById('map-section');
  var showRouteElem = document.getElementById('show-route');
  var hideRouteElem = document.getElementById('hide-route');
  var mapLayerElem = document.getElementById('map-layer');
  
  showRouteElem.addEventListener('click', function (e) {
    var w = 1.2 * mapSectionElem.getBoundingClientRect().width
    mapSectionElem.style.height = w + 'px';
    showRouteElem.style.transform = 'translateY(42px)';
    hideRouteElem.style.visibility = "visible";
    hideRouteElem.style.transform = 'translateY(0)';
    window.setTimeout(function () {
      showRouteElem.style.visibility = "hidden";
    }, 300);
    e.preventDefault();
  });
  hideRouteElem.addEventListener('click', function (e) {
    mapSectionElem.style.height = '56px';
    showRouteElem.style.visibility = "visible"
    showRouteElem.style.transform = 'translateY(0)';
    hideRouteElem.style.transform = 'translateY(42px)';

    window.setTimeout(function () {
    hideRouteElem.style.visibility = "hidden";
    }, 300);
    e.preventDefault();
  });
})();
