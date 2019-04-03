import * as React from 'react';

// Watch an when a scrolling element reaches the bottom, then callback!
const useSlide = (callback: (d: number) => void) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [sliderDown, setSliderDown] = React.useState(false);
  const [cursorPos, setCursorPos] = React.useState<number>(0);

  const onMouseDown = (e: MouseEvent) => {
    setSliderDown(true);
    setCursorPos(e.screenX);
  };

  const onMouseUp = (e: MouseEvent) => {
    setSliderDown(false);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!sliderDown) {
      return;
    }

    const d = e.screenX - cursorPos;
    setCursorPos(e.screenX);
    callback(d);
  };

  React.useEffect(() => {
    if (ref && ref.current) {
      ref.current.addEventListener('mousedown', onMouseDown);
      ref.current.addEventListener('mouseup', onMouseUp);
      ref.current.addEventListener('mousemove', onMouseMove);
    }
    return () => {
      if (ref && ref.current) {
        ref.current.removeEventListener('mousedown', onMouseDown);
        ref.current.removeEventListener('mouseup', onMouseUp);
        ref.current.removeEventListener('mousemove', onMouseMove);
      }
    };
  });

  return [{ ref }];
};

export default useSlide;
