document.addEventListener('DOMContentLoaded', function() {
  let touchstartX = 0;
  let touchendX = 0;

  function handleGesture() {
      if (touchendX < touchstartX) {
          const nextLink = document.getElementById('next');
          if (nextLink) {
              window.location.href = nextLink.href;
          }
      }
      if (touchendX > touchstartX) {
          const prevLink = document.getElementById('prev');
          if (prevLink) {
              window.location.href = prevLink.href;
          }
      }
  }

  document.addEventListener('touchstart', function(event) {
      touchstartX = event.changedTouches[0].screenX;
  }, false);

  document.addEventListener('touchend', function(event) {
      touchendX = event.changedTouches[0].screenX;
      handleGesture();
  }, false);
});
