import * as React from 'react';
import './context-menu.less';
import { Icon, Switch, Menu, Slider, InputNumber, Col, Row } from 'antd';
import { useTransition, animated, config } from 'react-spring';
import { ContextMenu } from 'react-contextmenu';
import MenuItem from 'antd/lib/menu/MenuItem';

interface BooleanState {
  value: boolean;
  set: (value: boolean) => void;
}

interface NumberState {
  value: number;
  set: (value: number) => void;
}

interface AtlasContextMenuProps {
  // children: React.ReactChild;
  controls: BooleanState;
  showPlane: BooleanState;
  brightness: NumberState;
  contrast: NumberState;
  opacity: NumberState;
  align: VoidFunction;
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
                <Menu>
                  <MenuItem onClick={align}>Reset Alignment</MenuItem>
                  <MenuItem>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>Colormaps</div>{' '}
                      <div>
                        <Icon type="arrow-right" />
                      </div>
                    </div>
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
                          max={1}
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
                  <MenuItem onClick={() => showPlane.set(!showPlane.value)}>
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
                  <MenuItem onClick={() => controls.set(!controls.value)}>
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
                </Menu>
              </div>
            </animated.div>
          )
      )}
    </ContextMenu>
  );
};

export default AtlasContextMenu;
