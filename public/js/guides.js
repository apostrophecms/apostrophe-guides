(function() {
  const $iframe = document.body.querySelector('[data-apos-guides-iframe]');
  if (!$iframe) {
    return false;
  }

  $iframe.onload = function() {
    setHeight();
  };

  window.onresize = function() {
    throttle(setHeight(), 50);
  };

  function getHeight() {
    return $iframe.contentWindow.document.body.offsetHeight;
  }

  function setHeight() {
    $iframe.style = '';
    const height = getHeight();
    $iframe.style = 'height:' + height + 'px';
  }

  function throttle(func, duration) {
    let shouldWait = false;
    return function(...args) {
      if (!shouldWait) {
        func.apply(this, args);
        shouldWait = true;
        setTimeout(function() {
          shouldWait = false;
        }, duration);
      }
    };
  }
})();
