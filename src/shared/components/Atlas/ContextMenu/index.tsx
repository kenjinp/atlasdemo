import * as React from 'react';
import './context-menu.less';
import { Icon, Switch, Menu, Slider, InputNumber, Col, Row } from 'antd';
import { useTransition, animated, config } from 'react-spring';
import { ContextMenu } from 'react-contextmenu';
import MenuItem from 'antd/lib/menu/MenuItem';
import ColorPreview from '../../ColorMap/color-preview';
import SubMenu from './SubMenu';

const fullscreen = () => {
  if (document && document.body.requestFullscreen) {
    document.documentElement.requestFullscreen();
  }
};

interface BooleanState {
  value: boolean;
  set: (value: boolean) => void;
}

interface NumberState {
  value: number;
  set: (value: number) => void;
}

interface StringState {
  value: string;
  set: (value: string) => void;
}

interface AtlasContextMenuProps {
  // children: React.ReactChild;
  controls: BooleanState;
  showPlane: BooleanState;
  brightness: NumberState;
  contrast: NumberState;
  opacity: NumberState;
  colormap: StringState;
  align: VoidFunction;
  colorMapStyles: string[];
  id: string;
}

const AtlasContextMenu: React.FunctionComponent<
  AtlasContextMenuProps
> = props => {
  const {
    id,
    controls,
    showPlane,
    align,
    brightness,
    contrast,
    opacity,
    colormap,
    colorMapStyles,
  } = props;
  const [show, setShow] = React.useState(false);
  const transitions = useTransition(show, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <ContextMenu
      id={id}
      onShow={() => setShow(true)}
      onHide={() => setShow(false)}
    >
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div style={props}>
              <div className="context-menu">
                <div className="placeholder">
                  <SubMenu
                    routes={[
                      {
                        path: '/colormaps',
                        component: (path, goTo) => {
                          return (
                            <div>
                              <div>
                                <a onClick={() => goTo('/')}>
                                  <h3 className="title">
                                    <Icon type="arrow-left" />
                                    ColorMaps
                                  </h3>
                                </a>
                              </div>
                              <Menu className="scroll">
                                {colorMapStyles.map(key => {
                                  return (
                                    <MenuItem
                                      onClick={() => {
                                        colormap.set(key);
                                      }}
                                    >
                                      <Row>
                                        <Col span={24}>
                                          <ColorPreview name={key} />
                                        </Col>
                                      </Row>
                                    </MenuItem>
                                  );
                                })}
                              </Menu>
                            </div>
                          );
                        },
                      },
                      {
                        path: '/',
                        component: (path, goTo) => {
                          return (
                            <div>
                              <div>
                                <h3 className="title">Menu</h3>
                              </div>
                              <Menu>
                                <MenuItem onClick={align}>
                                  Reset Alignment
                                </MenuItem>
                                <MenuItem
                                  onClick={() => {
                                    goTo('/colormaps');
                                  }}
                                >
                                  <Row>
                                    <Col span={12}>Colormaps</Col>
                                    <Col span={12}>
                                      <ColorPreview name={colormap.value} />
                                    </Col>
                                  </Row>
                                </MenuItem>
                                <MenuItem>
                                  <Row>
                                    <Col span={12}>Brighness</Col>
                                    <Col span={12}>
                                      <Slider
                                        min={-2}
                                        max={2}
                                        step={0.01}
                                        onChange={value => {
                                          // @ts-ignore
                                          brightness.set(value);
                                        }}
                                        value={brightness.value}
                                      />
                                    </Col>
                                  </Row>
                                </MenuItem>
                                <MenuItem>
                                  <Row>
                                    <Col span={12}>Contrast</Col>
                                    <Col span={12}>
                                      <Slider
                                        min={0}
                                        max={5}
                                        step={0.01}
                                        onChange={value => {
                                          // @ts-ignore
                                          contrast.set(value);
                                        }}
                                        value={contrast.value}
                                      />
                                    </Col>
                                  </Row>
                                </MenuItem>
                                <MenuItem>
                                  <Row>
                                    <Col span={12}>Opacity</Col>
                                    <Col span={12}>
                                      <Slider
                                        min={0}
                                        max={5}
                                        step={0.01}
                                        onChange={value => {
                                          // @ts-ignore
                                          opacity.set(value);
                                        }}
                                        value={opacity.value}
                                      />
                                    </Col>
                                  </Row>
                                </MenuItem>
                                <MenuItem
                                  onClick={() =>
                                    showPlane.set(!showPlane.value)
                                  }
                                >
                                  <Row>
                                    <Col span={12}>Plane Slice</Col>
                                    <Col span={12}>
                                      <Switch
                                        size="small"
                                        onChange={showPlane.set}
                                        checked={showPlane.value}
                                      />
                                    </Col>
                                  </Row>
                                </MenuItem>
                                <MenuItem
                                  onClick={() => controls.set(!controls.value)}
                                >
                                  <Row>
                                    <Col span={12}>Plane Controls</Col>
                                    <Col span={12}>
                                      <Switch
                                        size="small"
                                        onChange={controls.set}
                                        checked={controls.value}
                                      />
                                    </Col>
                                  </Row>
                                </MenuItem>
                                <MenuItem onClick={fullscreen}>
                                  <Row>
                                    <Col span={12}>fullscreen Mode</Col>
                                    <Col span={12}>
                                      <Switch
                                        size="small"
                                        onChange={fullscreen}
                                        checked={false}
                                      />
                                    </Col>
                                  </Row>
                                </MenuItem>
                              </Menu>
                            </div>
                          );
                        },
                      },
                    ]}
                  />
                </div>
              </div>
            </animated.div>
          )
      )}
    </ContextMenu>
  );
};

export default AtlasContextMenu;
