import * as React from 'react';
import './atlas-component.less';
interface AtlasProps {
  setAtlas: (atlas: any) => void;
}

const AtlasComponent: React.FunctionComponent<AtlasProps> = props => {
  const { setAtlas } = props;
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (ref && ref.current && typeof window !== 'undefined') {
      const Atlas = require('./Atlas').default;
      setAtlas(new Atlas(ref.current));
    }
  }, [ref]);
  return <div ref={ref} className="atlas-component" />;
};

export default AtlasComponent;
