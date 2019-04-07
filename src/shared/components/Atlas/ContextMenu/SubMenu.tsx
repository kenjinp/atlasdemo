import * as React from 'react';
import './sub-menu.less';

interface SubMenuProps {
  routes: {
    path: string;
    component: (path: string, goTo: (path: string) => void) => React.ReactNode;
  }[];
}

const SubMenu: React.FunctionComponent<SubMenuProps> = ({ routes }) => {
  const [currentRoute, setCurrentRoute] = React.useState('/');

  const routeToShow = routes.find(({ path }) => path === currentRoute);

  return (
    <div>
      {routeToShow && routeToShow.component(routeToShow.path, setCurrentRoute)}
    </div>
  );
};

export default SubMenu;
