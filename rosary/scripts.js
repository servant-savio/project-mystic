let showDebug = false;

document.addEventListener('DOMContentLoaded', function() {
  const localShowDebug = localStorage.getItem("showDebug");
  if (localShowDebug == null) {
    localStorage.setItem(showDebug)
  } else {
    showDebug = localShowDebug;
  }
  
  const touchstart = {X:0, Y:0};
  const touchend = {X:0, Y:0};

  function isXorY (startX, endX, startY, endY) {
    const deltaX = Math.abs(startX - endX);
    const deltaY = Math.abs(startY - endY);
    return (deltaX > deltaY) ? "X" : "Y";
  }

  /* addDebug - useful for phone where you can't access console logs. */

  function addDebug(debugText) {
    if (showDebug) {
        debugDiv.innerHTML = `${debugDiv.innerText}<br/>${debugText}`;
    }
  }

  function handleGesture() {
    const debugDiv = document.getElementById("debugDiv");
    let nextId, prevId;
    const XorY = isXorY(touchstart.X, touchend.X, touchstart.Y, touchend.Y);
    nextId = `next${XorY}`;
    prevId = `prev${XorY}`;
    const currentTouchstart = touchstart[XorY]; 
    const currentTouchend = touchend[XorY]; 

    addDebug(`XorY: ${XorY}, nextId: ${nextId}, prevId: ${prevId}`);
    addDebug(`${debugDiv.innerText} <br>currentTouchstart: ${currentTouchstart}, currentTouchend: ${currentTouchend}`);

    if (currentTouchend < currentTouchstart) {
        addDebug(`${debugDiv.innerText} <br>currentTouchend < currentTouchstart`);
        const nextLink = document.getElementById(nextId);
        if (nextLink) {
            window.location.href = nextLink.href;
        }
    } else if (currentTouchend > currentTouchstart) {
        debugDiv.innerHTML = `${debugDiv.innerText} <br>currentTouchend > currentTouchstart`;
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
