# React Draggable Infinite Carousel

Continuously moving React carousel with infinite looping and bidirectional
dragging. Built with native browser APIs and no carousel or animation libraries.

## Why this project exists

I needed a React carousel that continuously scrolls in an infinite loop while
still allowing the user to grab it and drag it horizontally in either direction.

Finding examples of infinite carousels, draggable sliders, and auto-scrolling
carousels was easy. Finding a simple implementation that combined all three
behaviors without relying on a carousel or animation library was not.

This repository is a focused example of that implementation.

## Features

- Continuous automatic scrolling
- Seamless infinite looping
- Horizontal dragging in both directions
- Automatic scrolling pauses while dragging
- Automatic scrolling resumes after the interaction
- Respects `prefers-reduced-motion`
- Uses native Pointer Events
- Uses `requestAnimationFrame` for automatic movement
- No carousel or animation library

## How it works

The carousel renders two copies of the same set of slides.

The distance between the first original slide and the first duplicated slide
defines the loop boundary. When the carousel reaches that boundary, its
translation is reset to the equivalent position in the other copy.

Automatic movement is driven by `requestAnimationFrame`. The distance travelled
is calculated using the elapsed time between animation frames rather than
assuming a fixed frame rate.

Pointer Events are used for dragging. When dragging starts, automatic movement
pauses. The pointer movement updates the horizontal translation directly, and
the carousel wraps between the two copies when either boundary is crossed.

When dragging ends, automatic movement continues from the current position.

## Reduced motion

The carousel respects the user's `prefers-reduced-motion` system preference.

When reduced motion is requested, continuous automatic scrolling is disabled.
Manual dragging remains available because the movement is directly controlled
by the user.

The preference is detected with the `usePrefersReducedMotion` hook and changes
are handled while the application is running.

## Built with

- React
- CSS Modules
- Pointer Events
- `requestAnimationFrame`
- `matchMedia`

## Running locally

```bash
npm install
npm run dev
```
