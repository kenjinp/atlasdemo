import * as React from 'react';
import './control-slider.less';
import { Icon } from 'antd';

interface ControlSliderProps {
  axis: 'x' | 'y' | 'z';
  controlMethod: VoidFunction;
  ratio: number;
  children: React.ReactChild;
}

const ControlSlider: React.FunctionComponent<ControlSliderProps> = props => {
  const { controlMethod, ratio, children } = props;
  return (
    <div className="control-slider">
      <Icon type="left" />
      {children}
      <Icon type="right" />
    </div>
  );
};

export default ControlSlider;
