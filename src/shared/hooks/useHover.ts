import * as React from 'react';
import { debounce } from '../utils';

export default function useHover(callback?: (isHovering: boolean) => void) {
  const [value, setValue] = React.useState(false);

  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (callback) {
      callback(value);
    }
  }, [value]);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  React.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);
    }
    return () => {
      if (node) {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      }
    };
  }, [ref.current]);

  return [{ ref }, value];
}
