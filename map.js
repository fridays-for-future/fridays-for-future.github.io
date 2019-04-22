(function () {
  // get dom elements
  var viewportElem = document.getElementById('viewport');
  var mapPullOutElem = document.getElementById('map-pull-out');
  var mapModalElem = document.getElementById('map-modal');
  var mapElem = document.getElementById('map');
  var showMapElem = document.getElementById('show-map');
  var hideMapElem = document.getElementById('hide-map');
  
  var transitionInEndHanlder = function (e) {
    // disable animation and enter stable state
    mapPullOutElem.classList.remove('trans-active', 'trans-active-in');
    mapPullOutElem.classList.add('intra-active');
    mapModalElem.removeEventListener('transitionend', transitionInEndHanlder);
  }
  
  showMapElem.addEventListener('click', function (e) {
    // get current positions and sizes
    var viewportRect = viewportElem.getBoundingClientRect();
    var x1 = viewportRect.x;
    var y1 = viewportRect.y;
    var wv = viewportRect.width;
    var hv = viewportRect.height;
    var mapSectionRect = mapPullOutElem.getBoundingClientRect();
    var y0 = mapSectionRect.y;
    var x0 = mapSectionRect.x;
    var h0 = mapSectionRect.height;
    var w0 = mapSectionRect.width;
    if (hv < 696) {
      // prepare transition
      mapPullOutElem.classList.add('pre-active', 'circum-active');
      mapModalElem.style.transform = 'translate(' + x0 + 'px, ' + y0 + 'px)';
      mapModalElem.style.height = h0 + 'px';
      mapModalElem.style.width = w0 + 'px';
      // mapElem.style.transform = 'translate(' + -(wv - w0) / 2 + 'px, ' + -(hv - h0) / 2 + 'px)';
      mapModalElem.addEventListener('transitionend', transitionInEndHanlder);
      // force application of style changes and wait for next frame
      window.getComputedStyle(mapModalElem).width;
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          // enable animation
          mapPullOutElem.classList.add('trans-active', 'trans-active-in');
          // trigger transition
          mapPullOutElem.classList.add('active');
          mapModalElem.style.transform = '';
          mapModalElem.style.height = '';
          mapModalElem.style.width = '';
          // mapElem.style.transform = 'translate(0, 0)';
        });
      });
    } else {
      // prepare transition
      mapPullOutElem.classList.add('pre-active', 'circum-active');
      mapModalElem.addEventListener('transitionend', transitionInEndHanlder);
      // force application of style changes and wait for next frame
      window.getComputedStyle(mapModalElem).width;
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          // enable animation
          mapPullOutElem.classList.add('trans-active', 'trans-active-in');
          // trigger transition
          mapPullOutElem.classList.add('active');
        });
      });
    }
    e.preventDefault();
  });
  
  var transitionOutEndHanlder = function (e) {
    // disable animation and enter stable state
    mapPullOutElem.classList.remove('trans-active', 'trans-active-out', 'circum-active');
    mapModalElem.removeEventListener('transitionend', transitionOutEndHanlder);
  }
  
  hideMapElem.addEventListener('click', function (e) {
    // get current positions and sizes
    var viewportRect = viewportElem.getBoundingClientRect();
    var xv = viewportRect.x;
    var yv = viewportRect.y;
    var wv = viewportRect.width;
    var hv = viewportRect.height;
    var mapSectionRect = mapPullOutElem.getBoundingClientRect();
    var y1 = mapSectionRect.y;
    var x1 = mapSectionRect.x;
    var h1 = mapSectionRect.height;
    var w1 = mapSectionRect.width;
    if (hv < 696) {
      // prepare transition
      mapPullOutElem.classList.remove('intra-active', 'pre-active');
      mapModalElem.style.transform = 'translate(' + -x1 + 'px, ' + -y1 + 'px)';
      mapModalElem.style.height = hv + 'px';
      mapModalElem.style.width = wv + 'px';
      mapModalElem.addEventListener('transitionend', transitionOutEndHanlder);
      // force application of style changes and wait for next frame
      window.getComputedStyle(mapModalElem).width;
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          // enable animation
          mapPullOutElem.classList.add('trans-active', 'trans-active-out');
          // trigger transition
          mapModalElem.style.transform = '';
          mapModalElem.style.height = '';
          mapModalElem.style.width = '';
          mapPullOutElem.classList.remove('active');
        });
      });
    } else {
      // prepare transition
      mapPullOutElem.classList.remove('intra-active', 'pre-active');
      mapModalElem.addEventListener('transitionend', transitionOutEndHanlder);
      // force application of style changes and wait for next frame
      window.getComputedStyle(mapModalElem).width;
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          // enable animation
          mapPullOutElem.classList.add('trans-active', 'trans-active-out');
          // trigger transition
          mapPullOutElem.classList.remove('active');
        });
      });
    }
    e.preventDefault();
  });
})();
