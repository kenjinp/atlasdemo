import * as React from 'react';
import './color-preview.less';
const colormap = require('colormap');

interface ColorPreviewProps {
  name: string;
}

const ColorPreview: React.FunctionComponent<ColorPreviewProps> = props => {
  const { name } = props;
  const colors = colormap({
    colormap: name,
    nshades: 20,
    format: 'hex',
    alpha: 1,
  });
  return (
    <div className="color-preview">
      <div className="wrapper">
        <div className="label">{name}</div>
        {colors.map((color: string) => (
          <div className="color" style={{ background: color }} />
        ))}
      </div>
    </div>
  );
};

export default ColorPreview;
