import { useState } from 'react';
import { DEFAULT_SPLIT } from './constants';

const MIN_MAP_PX = 240;
const MIN_FEED_PX = 320;
const KEY_STEP = 0.05;

// Keeps both panes at a usable width for the container's current size
function clampSplit(split, width) {
  const min = Math.min(MIN_MAP_PX / width, 0.5);
  const max = Math.max(1 - MIN_FEED_PX / width, 0.5);
  return Math.min(Math.max(split, min), max);
}

// Draggable divider between the map and the feed. `split` is the map's share of the width (0–1).
function SplitGutter({ containerRef, split, onChange }) {
  const [dragging, setDragging] = useState(false);

  const splitAt = (clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    return clampSplit((clientX - rect.left) / rect.width, rect.width);
  };

  const handlePointerDown = (e) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  };

  const handlePointerMove = (e) => {
    if (dragging) {
      onChange(splitAt(e.clientX));
    }
  };

  const handlePointerUp = (e) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    setDragging(false);
  };

  const handleKeyDown = (e) => {
    const width = containerRef.current.getBoundingClientRect().width;
    const moves = {
      ArrowLeft: split - KEY_STEP,
      ArrowRight: split + KEY_STEP,
      Home: 0,
      End: 1,
      Enter: DEFAULT_SPLIT,
    };
    if (e.key in moves) {
      e.preventDefault();
      onChange(clampSplit(moves[e.key], width));
    }
  };

  return (
    <div
      className={`split-gutter${dragging ? ' dragging' : ''}`}
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize map and feed"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(split * 100)}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onDoubleClick={() => onChange(DEFAULT_SPLIT)}
      onKeyDown={handleKeyDown}
      title="Drag to resize · double-click to reset"
    />
  );
}

export default SplitGutter;
