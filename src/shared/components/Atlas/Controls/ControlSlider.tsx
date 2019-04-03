import * as React from 'react';
import './control-slider.less';
import { Icon } from 'antd';
import useSlide from '../../../hooks/useSlide';

interface ControlSliderProps {
  axis: 'x' | 'y' | 'z';
  controlMethod: (n: number) => void;
  ratio: number;
  children: React.ReactChild;
}

const ControlSlider: React.FunctionComponent<ControlSliderProps> = props => {
  const { controlMethod, ratio, children, axis } = props;
  const [bind] = useSlide(d => {
    controlMethod(d * ratio);
  });
  return (
    <div {...bind} className={`control-slider ${axis}`}>
      <Icon type="left" />
      {children}
      <Icon type="right" />
    </div>
  );
};

export default ControlSlider;
