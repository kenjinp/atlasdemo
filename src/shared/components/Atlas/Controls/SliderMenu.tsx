import * as React from 'react';
import './slider-menu.less';
import ControlSlider from './ControlSlider';
import { useTransition, animated as a } from 'react-spring';

interface ControlSliderProps {}

const SliderMenu: React.FunctionComponent<ControlSliderProps> = props => {
  const {} = props;

  const menuItems = [
    <ControlSlider ratio={10} axis="z" controlMethod={() => {}}>
      <span> slice translate </span>
    </ControlSlider>,
    <ControlSlider ratio={10} axis="z" controlMethod={() => {}}>
      <span> up/down translate </span>
    </ControlSlider>,
    <ControlSlider ratio={10} axis="z" controlMethod={() => {}}>
      <span> right/left translate </span>
    </ControlSlider>,
    <ControlSlider ratio={0.01} axis="z" controlMethod={() => {}}>
      <span> slice rotate </span>
    </ControlSlider>,
    <ControlSlider ratio={0.01} axis="z" controlMethod={() => {}}>
      <span> up/down rotate </span>
    </ControlSlider>,
    <ControlSlider ratio={0.01} axis="z" controlMethod={() => {}}>
      <span> right/left rotate </span>
    </ControlSlider>,
  ];
  const keys = menuItems.map((element, index) => `slider-menu-${index}`);
  const transitions = useTransition(menuItems, keys, {
    from: { transform: 'scale3d(0.8, 0.8, 0.8)', opacity: 0 },
    enter: { transform: 'scale3d(1, 1, 1)', opacity: 1 },
    leave: { transform: 'scale3d(0.8, 0.8, 0.8)', opacity: 0 },
    trail: 300,
  });
  return (
    <div className="slider-menu">
      <p>slide or drag to position slicer</p>
      <div className="menu">
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
