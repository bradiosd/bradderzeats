import { useState, useCallback } from 'react';

interface SwipeState {
  startX: number;
  startY: number;
  isSwiping: boolean;
}

export const useSwipe = (onSwipeLeft: () => void, onSwipeRight: () => void) => {
  const [swipeState, setSwipeState] = useState<SwipeState>({
    startX: 0,
    startY: 0,
    isSwiping: false,
  });

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setSwipeState({
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
      isSwiping: true,
    });
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!swipeState.isSwiping) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - swipeState.startX;
    const diffY = currentY - swipeState.startY;

    // Only trigger swipe if horizontal movement is greater than vertical
    if (Math.abs(diffX) > Math.abs(diffY)) {
      e.preventDefault(); // Prevent scrolling while swiping
    }
  }, [swipeState]);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!swipeState.isSwiping) return;

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = endX - swipeState.startX;
    const diffY = endY - swipeState.startY;

    // Only trigger swipe if horizontal movement is greater than vertical
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 50) {
        onSwipeRight();
      } else if (diffX < -50) {
        onSwipeLeft();
      }
    }

    setSwipeState(prev => ({ ...prev, isSwiping: false }));
  }, [swipeState, onSwipeLeft, onSwipeRight]);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}; 