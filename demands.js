(function () {
  // get dom elements
  var demandsPullOutElem = document.getElementById('demands-pull-out');
  var showdemandsElem = document.getElementById('show-demands');
  var hidedemandsElem = document.getElementById('hide-demands');
  
  var transitionInEndHanlder = function (e) {
    // disable animation and enter stable state
    demandsPullOutElem.classList.remove('trans-active', 'trans-active-in');
    demandsPullOutElem.classList.add('intra-active');
    demandsPullOutElem.removeEventListener('transitionend', transitionInEndHanlder);
  }
  
  showdemandsElem.addEventListener('click', function (e) {
    // prepare transition
    demandsPullOutElem.classList.add('pre-active', 'circum-active');
    demandsPullOutElem.addEventListener('transitionend', transitionInEndHanlder);
    // force application of style changes and wait for next frame
    window.getComputedStyle(demandsPullOutElem).height;
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        // enable animation
        demandsPullOutElem.classList.add('trans-active', 'trans-active-in');
        // trigger transition
        demandsPullOutElem.classList.add('active');
      });
    });
    e.preventDefault();
  });
  
  var transitionOutEndHanlder = function (e) {
    // disable animation and enter stable state
    demandsPullOutElem.classList.remove('trans-active', 'trans-active-out', 'circum-active');
    demandsPullOutElem.removeEventListener('transitionend', transitionOutEndHanlder);
  }
  
  hidedemandsElem.addEventListener('click', function (e) {
    // prepare transition
    demandsPullOutElem.classList.remove('intra-active', 'pre-active');
    demandsPullOutElem.addEventListener('transitionend', transitionOutEndHanlder);
    // force application of style changes and wait for next frame
    window.getComputedStyle(demandsPullOutElem).height;
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        // enable animation
        demandsPullOutElem.classList.add('trans-active', 'trans-active-out');
        // trigger transition
        demandsPullOutElem.classList.remove('active');
      });
    });
    e.preventDefault();
  });
})();
