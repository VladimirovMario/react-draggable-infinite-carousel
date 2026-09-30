import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: no-preference)';

/**
 * Detects whether the user prefers reduced motion.
 *
 * Uses the `prefers-reduced-motion` media feature and listens for changes
 * to the user's system preference.
 *
 * The media query checks for `no-preference`, so its result is inverted:
 * - `true`  → the user prefers reduced motion
 * - `false` → the user has no preference for reduced motion
 *
 * @returns {boolean} Whether the user prefers reduced motion.
 */
export function usePrefersReducedMotion() {
  const initialPreference = window.matchMedia(QUERY).matches;
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState(!initialPreference);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);

    const listener = (event) => {
      setPrefersReducedMotion(!event.matches);
    };

    mediaQueryList.addEventListener('change', listener);

    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, []);

  return prefersReducedMotion;
}
