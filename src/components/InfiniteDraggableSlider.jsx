import { useEffect, useRef, useState } from 'react';
import styles from './InfiniteDraggableSlider.module.css';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

function InfiniteDraggableSlider({ carouselItems, firstDuplicateSlideIndex }) {
  const carouselStartPosition = 0;
  const [elementStartX, setElementStartX] = useState(0);
  const [pointerStartX, setPointerStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [copiesDistance, setCopiesDistance] = useState(0);
  const trackRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (trackRef.current) {
      const firstOriginalSlide = trackRef.current.children[0];
      const firstDuplicateSlide =
        trackRef.current.children[firstDuplicateSlideIndex];

      setCopiesDistance(
        firstOriginalSlide.offsetLeft - firstDuplicateSlide.offsetLeft,
      );
    }
  }, [firstDuplicateSlideIndex]);

  useEffect(() => {
    if (isDragging || copiesDistance === 0 || prefersReducedMotion) {
      return;
    }

    let previousTimestamp = null;
    let animationId;

    const speed = 0.1; // pixels per millisecond

    function step(timestamp) {
      if (previousTimestamp === null) {
        previousTimestamp = timestamp;
      }

      const deltaTime = timestamp - previousTimestamp;
      const distance = speed * deltaTime;

      setTranslateX((previousTranslate) => {
        const nextTranslate = previousTranslate - distance;

        if (nextTranslate < copiesDistance) {
          return carouselStartPosition;
        }

        return nextTranslate;
      });

      previousTimestamp = timestamp;

      animationId = requestAnimationFrame(step);
    }

    animationId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationId);
  }, [isDragging, copiesDistance, prefersReducedMotion]);

  const resetDragPosition = (position, pointerPosition) => {
    setTranslateX(position);
    setElementStartX(position);
    setPointerStartX(pointerPosition);
  };

  const handlePointerMove = (event) => {
    if (!isDragging) {
      return;
    }

    const currentPointerPositionX = event.clientX;

    const currentTranslatePosition =
      elementStartX + currentPointerPositionX - pointerStartX;

    if (currentTranslatePosition > carouselStartPosition) {
      resetDragPosition(copiesDistance, currentPointerPositionX);
    } else if (currentTranslatePosition < copiesDistance) {
      resetDragPosition(carouselStartPosition, currentPointerPositionX);
    } else {
      setTranslateX(currentTranslatePosition);
    }
  };

  const handlePointerDown = (event) => {
    setPointerStartX(() => event.clientX);
    setElementStartX(translateX);
    setIsDragging(true);
    if (trackRef.current) {
      trackRef.current.setPointerCapture(event.pointerId);
    }
  };

  const endDrag = (event) => {
    setIsDragging(false);
    setElementStartX(translateX);
    if (trackRef.current) {
      trackRef.current.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className={styles.scroller}>
      <ul
        className={styles['inner-scroller']}
        ref={trackRef}
        style={{ transform: `translateX(${translateX}px)` }}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {carouselItems.map((image, i) => (
          <li key={i} className={styles.slide}>
            <img
              draggable="false"
              src={image.imgSrc}
              alt={image.imgAlt}
              height={image.height || 80}
              width={image.width || 160}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InfiniteDraggableSlider;
