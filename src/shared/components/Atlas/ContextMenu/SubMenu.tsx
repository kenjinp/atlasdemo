import * as React from 'react';
import './sub-menu.less';

interface SubMenuProps {
  // children: React.ReactChild;
}

const SubMenu: React.FunctionComponent<SubMenuProps> = props => {
  const [currentRoute, setCurrentRoute] = React.useState('/');

  // const { children } = props;

  const goTo = (pathId: string) => () => {
    setCurrentRoute(pathId);
  };

  const routes = [
    {
      id: '/',
      component: (
        <div id="/">
          <div>
            This is home 🐁 <a onClick={goTo('/shaz')}>Shaz</a>{' '}
            <a onClick={goTo('/hello')}>hello</a>
          </div>
        </div>
      ),
    },
    {
      id: '/hello',
      component: (
        <div id="/hello">
          hello 🍄<a onClick={goTo('/shaz')}>Shaz</a>
          <a onClick={goTo('/')}>Home</a>
        </div>
      ),
    },
    {
      id: '/shaz',
      component: (
        <div id="/shaz">
          shazbot 🧠<a onClick={goTo('/hello')}>Hello</a>
          <a onClick={goTo('/')}>Home</a>
        </div>
      ),
    },
  ];

  const routeToShow = routes.find(({ id }) => id === currentRoute);

  return <div>{routeToShow && routeToShow.component}</div>;
};

export default SubMenu;
