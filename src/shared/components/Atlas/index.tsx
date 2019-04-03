import * as React from 'react';
import Atlas from './Atlas';
import './atlas-component.less';
interface AtlasProps {
  setAtlas: (atlas: Atlas) => void;
}

const AtlasComponent: React.FunctionComponent<AtlasProps> = props => {
  const { setAtlas } = props;
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (ref && ref.current) {
      setAtlas(new Atlas(ref.current));
    }
  }, [ref]);
  return <div ref={ref} className="atlas-component" />;
};

export default AtlasComponent;
