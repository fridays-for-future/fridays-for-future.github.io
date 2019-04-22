(function () {
  // get dom elements
  var calendarPullOutElem = document.getElementById('calendar-pull-out');
  var showCalendarElem = document.getElementById('show-calendar');
  var hideCalendarElem = document.getElementById('hide-calendar');
  
  var transitionInEndHanlder = function (e) {
    // disable animation and enter stable state
    calendarPullOutElem.classList.remove('trans-active', 'trans-active-in');
    calendarPullOutElem.classList.add('intra-active');
    calendarPullOutElem.removeEventListener('transitionend', transitionInEndHanlder);
  }
  
  showCalendarElem.addEventListener('click', function (e) {
    // prepare transition
    calendarPullOutElem.classList.add('pre-active', 'circum-active');
    calendarPullOutElem.addEventListener('transitionend', transitionInEndHanlder);
    // force application of style changes and wait for next frame
    window.getComputedStyle(calendarPullOutElem).height;
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        // enable animation
        calendarPullOutElem.classList.add('trans-active', 'trans-active-in');
        // trigger transition
        calendarPullOutElem.classList.add('active');
      });
    });
    e.preventDefault();
  });
  
  var transitionOutEndHanlder = function (e) {
    // disable animation and enter stable state
    calendarPullOutElem.classList.remove('trans-active', 'trans-active-out', 'circum-active');
    calendarPullOutElem.removeEventListener('transitionend', transitionOutEndHanlder);
  }
  
  hideCalendarElem.addEventListener('click', function (e) {
    // prepare transition
    calendarPullOutElem.classList.remove('intra-active', 'pre-active');
    calendarPullOutElem.addEventListener('transitionend', transitionOutEndHanlder);
    // force application of style changes and wait for next frame
    window.getComputedStyle(calendarPullOutElem).height;
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        // enable animation
        calendarPullOutElem.classList.add('trans-active', 'trans-active-out');
        // trigger transition
        calendarPullOutElem.classList.remove('active');
      });
    });
    e.preventDefault();
  });
})();
