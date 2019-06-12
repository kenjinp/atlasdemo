import * as React from 'react';
import './search-menu.less';
import Draggable from 'react-draggable';
import Search from 'antd/lib/input/Search';
import { Collapse, List, Checkbox, Tooltip, Tabs, Tree } from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import SVG from 'react-inlinesvg';
import * as data from '../../../../../@data/regionMeshes/1.json';
import { Resizable, ResizableBox } from 'react-resizable';
import '../../../../../node_modules/react-resizable/css/styles.css';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

const neuron = require('../../../../../assets/neuron.svg');
const { TabPane } = Tabs;
const { TreeNode } = Tree;

interface SearchMenuProps {
  // children: React.ReactChild;
  queryResults: any[];
  queryFunction: (value: string) => void;
  setMorphologyVisibility: (value: string) => void;
  morphologyVisibility: string[];
  setRegionVisibility: (value: string) => void;
  regionVisibility: string[];
}

const SearchMenu: React.FunctionComponent<SearchMenuProps> = props => {
  const {
    queryResults,
    queryFunction,
    setMorphologyVisibility,
    morphologyVisibility,
    regionVisibility,
    setRegionVisibility,
  } = props;

  const mapRegionChildren = (children: any[]) => {
    return children.map(
      ({
        name,
        id,
        children,
        acronym,
      }: {
        name: string;
        id: number;
        children: any[];
        acronym: string;
      }) => {
        return (
          <TreeNode
            title={
              <div
                onClick={(e: React.MouseEvent) => {
                  setRegionVisibility(acronym);
                  e.stopPropagation();
                }}
              >
                {name}{' '}
                <Checkbox checked={regionVisibility.indexOf(acronym) >= 0} />
              </div>
            }
            key={acronym}
          >
            {mapRegionChildren(children)}
          </TreeNode>
        );
      }
    );
  };

  return (
    <>
      <Draggable handle=".handle">
        <div className="search-menu">
          <div className="handle" />
          <Collapse bordered={false}>
            <CollapsePanel
              header={<h3 className="title">Regions</h3>}
              key="datasets-search"
            >
              <Tabs defaultActiveKey="1">
                {/* <TabPane tab="Search" key="1">
                  <div className="body">
                    <Search
                      className="search"
                      placeholder="Search Datasets by Brain Region"
                      onSearch={queryFunction}
                      // style={{ width: 200 }}
                    />
                    <List
                      size="small"
                      className="list"
                      dataSource={queryResults}
                      renderItem={(morphologyCollection: any[]) => {
                        const regionName = morphologyCollection[0].regionName;
                        const regionAcronym =
                          morphologyCollection[0].regionAcronym;
                        return (
                          <Collapse bordered={false}>
                            <CollapsePanel
                              header={regionName}
                              key={regionName}
                              extra={
                                <div
                                  onClick={(e: React.MouseEvent) => {
                                    setRegionVisibility(regionAcronym);
                                    e.stopPropagation();
                                  }}
                                >
                                  <Checkbox
                                    // onChange={(e: CheckboxChangeEvent) => {
                                    //   setRegionVisibility(regionAcronym);
                                    //   e.stopPropagation();
                                    // }}
                                    checked={
                                      regionVisibility.indexOf(regionAcronym) >=
                                      0
                                    }
                                  />
                                </div>
                              }
                            >
                              <List
                                size="small"
                                dataSource={morphologyCollection}
                                renderItem={({ name }: { name: string }) => (
                                  <List.Item>
                                    <Tooltip title="morphology">
                                      <Checkbox
                                        onChange={() =>
                                          setMorphologyVisibility(name)
                                        }
                                        checked={
                                          morphologyVisibility.indexOf(name) >=
                                          0
                                        }
                                      >
                                        <SVG className="icon" src={neuron} />
                                        {name}
                                      </Checkbox>
                                    </Tooltip>
                                  </List.Item>
                                )}
                              />
                            </CollapsePanel>
                          </Collapse>
                        );
                      }}
                    />
                  </div>
                </TabPane> */}
                <TabPane tab="Tree" key="1">
                  <div className="body">
                    <Tree
                    // onCheck={(selectedKeys: any, e) => {
                    //   console.log(selectedKeys, e);
                    //   // (selectedKeys as string[]).forEach(acronym => {
                    //     setRegionVisibility(acronym);
                    //   // });
                    // }}
                    >
                      <TreeNode
                        title={
                          <div
                            onClick={(e: React.MouseEvent) => {
                              setRegionVisibility('root');
                              e.stopPropagation();
                            }}
                          >
                            Whole Brain{' '}
                            <Checkbox
                              checked={regionVisibility.indexOf('root') >= 0}
                            />
                          </div>
                        }
                        key="root"
                      >
                        {mapRegionChildren(data.children)}
                      </TreeNode>
                    </Tree>
                  </div>
                </TabPane>
              </Tabs>
            </CollapsePanel>
          </Collapse>
        </div>
      </Draggable>
    </>
  );
};

export default SearchMenu;
