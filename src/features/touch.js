/**
 * Very small touch-swipe hook (currently logs only).
 * Kept to preserve existing behavior and as an extension point.
 */
export function initTouchSupport() {
  let touchStartY = 0;
  let touchEndY = 0;

  document.addEventListener("touchstart", (e) => {
    touchStartY = e.touches[0]?.clientY ?? 0;
  });

  document.addEventListener("touchend", (e) => {
    touchEndY = e.changedTouches[0]?.clientY ?? 0;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe up - extension point
        console.log("向上滑动");
      } else {
        // Swipe down - extension point
        console.log("向下滑动");
      }
    }
  }
}

