import * as React from 'react';
import Atlas from './Atlas';
import './atlas-component.less';
interface AtlasProps {}

const AtlasComponent: React.FunctionComponent<AtlasProps> = ({}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (ref && ref.current) {
      new Atlas(ref.current);
    }
  }, [ref]);
  return <div ref={ref} className="atlas-component" />;
};

export default AtlasComponent;
