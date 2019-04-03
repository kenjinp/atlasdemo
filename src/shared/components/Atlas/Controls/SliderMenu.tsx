import * as React from 'react';
import './slider-menu.less';
import ControlSlider from './ControlSlider';
import { useTransition, animated as a } from 'react-spring';
import useHover from '../../../hooks/useHover';

export interface PlaneControls {
  translateAlongNormal: (n: number) => void;
  translateAlongUp: (n: number) => void;
  translateAlongRight: (n: number) => void;
  rotateOnNormal: (n: number) => void;
  rotateOnUp: (n: number) => void;
  rotateOnRight: (n: number) => void;
}

interface ControlSliderProps {
  planeControls: PlaneControls;
  onHover: VoidFunction;
  showControls: boolean;
}

const SliderMenu: React.FunctionComponent<ControlSliderProps> = props => {
  const { planeControls, onHover, showControls } = props;
  const [bind, isHovering] = useHover(onHover);

  const menuItems = showControls
    ? [
        <ControlSlider
          ratio={10}
          axis="z"
          controlMethod={planeControls.translateAlongNormal}
        >
          <span> slice translate </span>
        </ControlSlider>,
        <ControlSlider
          ratio={10}
          axis="y"
          controlMethod={planeControls.translateAlongUp}
        >
          <span> up/down translate </span>
        </ControlSlider>,
        <ControlSlider
          ratio={10}
          axis="x"
          controlMethod={planeControls.translateAlongRight}
        >
          <span> right/left translate </span>
        </ControlSlider>,
        <ControlSlider
          ratio={0.01}
          axis="z"
          controlMethod={planeControls.rotateOnNormal}
        >
          <span> slice rotate </span>
        </ControlSlider>,
        <ControlSlider
          ratio={0.01}
          axis="y"
          controlMethod={planeControls.rotateOnUp}
        >
          <span> up/down rotate </span>
        </ControlSlider>,
        <ControlSlider
          ratio={0.01}
          axis="x"
          controlMethod={planeControls.rotateOnRight}
        >
          <span> right/left rotate </span>
        </ControlSlider>,
      ]
    : [];
  const keys = menuItems.map((element, index) => `slider-menu-${index}`);
  const transitions = useTransition(menuItems, keys, {
    from: { transform: 'scale3d(0.8, 0.8, 0.8)', opacity: 0 },
    enter: { transform: 'scale3d(1, 1, 1)', opacity: 1 },
    leave: { transform: 'scale3d(0.8, 0.8, 0.8)', opacity: 0 },
    trail: 50,
  });
  const boolTransitions = useTransition(showControls, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  return (
    <div className="slider-menu">
      {boolTransitions.map(
        ({ item, key, props }) =>
          item && (
            <a.div style={props}>
              <p>slide or drag to position slicer</p>
            </a.div>
          )
      )}
      <div {...bind} className="menu">
        {transitions.map(({ item, props, key }) => (
          <a.div key={key} style={{ ...props, width: '33%' }}>
            {item}
          </a.div>
        ))}
      </div>
    </div>
  );
};

export default SliderMenu;
