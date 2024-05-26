document.addEventListener('DOMContentLoaded', function() {
  const touchstart = {X:0, Y:0};
  const touchend = {X:0, Y:0};

  function isXorY (startX, endX, startY, endY) {
    const deltaX = Math.abs(startX - endX);
    const deltaY = Math.abs(startY - endY);
    return (deltaX > deltaY);
  }

  function handleGesture() {
    let nextId, prevId;
    const XorY = isXorY(touchstart.X, touchend.X, touchstart.Y, touchend.Y);
    nextId = `next${XorY}`;
    prevId = `prev${XorY}`;
    const currentTouchstart = touchstart[XorY]; 
    const currentTouchend = touchend[XorY]; 

    if (currentTouchend < currentTouchstart) {
        const nextLink = document.getElementById(nextId);
        if (nextLink) {
            window.location.href = nextLink.href;
        }
    } else if (currentTouchend > currentTouchstart) {
        const prevLink = document.getElementById(prevId);
        if (prevLink) {
            window.location.href = prevLink.href;
        }
    }
  }

  document.addEventListener('touchstart', function(event) {
    touchstart.X = event.changedTouches[0].screenX;
    touchstart.Y = event.changedTouches[0].screenY;
  }, false);

  document.addEventListener('touchend', function(event) {
    touchend.X = event.changedTouches[0].screenX;
    touchend.Y = event.changedTouches[0].screenY;
    handleGesture();
  }, false);
});
