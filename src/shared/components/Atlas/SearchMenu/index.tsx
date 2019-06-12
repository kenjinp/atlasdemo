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
  const { regionVisibility, setRegionVisibility } = props;

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
                  console.log(acronym);
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
          <Collapse bordered={false} defaultActiveKey={['datasets-search']}>
            <CollapsePanel
              header={<h3 className="title">Regions</h3>}
              key="datasets-search"
            >
              <div className="body">
                <Tree defaultExpandedKeys={regionVisibility}>
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
            </CollapsePanel>
          </Collapse>
        </div>
      </Draggable>
    </>
  );
};

export default SearchMenu;
