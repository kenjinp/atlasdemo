import * as React from 'react';
import './search-menu.less';
import Draggable from 'react-draggable';
import Search from 'antd/lib/input/Search';
import { Collapse, List, Checkbox, Tooltip, Tabs, Tree } from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import SVG from 'react-inlinesvg';
import * as data from '../../../../../@data/allen_region_obj/1.json';
import { Resizable, ResizableBox } from 'react-resizable';
import '../../../../../node_modules/react-resizable/css/styles.css';

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
  console.log('THE ONE', data);
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
      }: {
        name: string;
        id: number;
        children: any[];
      }) => {
        return (
          <TreeNode title={name} key={`${id}`}>
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
              header={<h3 className="title">Search Datasets</h3>}
              key="datasets-search"
            >
              <Tabs defaultActiveKey="1">
                <TabPane tab="Search" key="1">
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
                            <CollapsePanel header={regionName} key={regionName}>
                              <div>
                                <Checkbox
                                  onChange={() =>
                                    setRegionVisibility(regionAcronym)
                                  }
                                  checked={
                                    regionVisibility.indexOf(regionAcronym) >= 0
                                  }
                                >
                                  Show Region
                                </Checkbox>
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
                                            morphologyVisibility.indexOf(
                                              name
                                            ) >= 0
                                          }
                                        >
                                          <SVG className="icon" src={neuron} />
                                          {name}
                                        </Checkbox>
                                      </Tooltip>
                                    </List.Item>
                                  )}
                                />
                              </div>
                            </CollapsePanel>
                          </Collapse>
                        );
                      }}
                    />
                  </div>
                </TabPane>
                <TabPane tab="Tree" key="2">
                  <div className="body">
                    <Tree>
                      <TreeNode title="Whole Brain" key="0-0">
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
