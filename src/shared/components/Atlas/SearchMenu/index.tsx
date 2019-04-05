import * as React from 'react';
import './search-menu.less';
import Draggable from 'react-draggable';
import Search from 'antd/lib/input/Search';
import { Collapse, List, Checkbox, Tooltip } from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import SVG from 'react-inlinesvg';
const neuron = require('../../../../../assets/neuron.svg');

interface SearchMenuProps {
  // children: React.ReactChild;
  queryResults: any[];
  queryFunction: (value: string) => void;
  setMorphologyVisibility: (value: string) => void;
  morphologyVisibility: string[];
}

const SearchMenu: React.FunctionComponent<SearchMenuProps> = props => {
  const {
    queryResults,
    queryFunction,
    setMorphologyVisibility,
    morphologyVisibility,
  } = props;
  return (
    <Draggable handle=".handle">
      <div className="search-menu">
        <Collapse bordered={false}>
          <CollapsePanel
            header={
              <div className="handle">
                <h3 className="title">Datasets</h3>
              </div>
            }
            key="datasets-search"
          >
            <div className="body">
              <Search
                className="search"
                placeholder="Search Datasets"
                onSearch={queryFunction}
                // style={{ width: 200 }}
              />
              <List
                size="small"
                className="list"
                dataSource={queryResults}
                renderItem={(morphologyCollection: any[]) => {
                  const regionName = morphologyCollection[0].regionName;
                  return (
                    <Collapse bordered={false}>
                      <CollapsePanel
                        header={regionName}
                        key={regionName}
                      >
                        <List
                          size="small"
                          dataSource={morphologyCollection}
                          renderItem={({ name }: { name: string }) => (
                            <List.Item>
                              <Tooltip title="morphology">
                                <Checkbox
                                  onChange={() => setMorphologyVisibility(name)}
                                  checked={
                                    morphologyVisibility.indexOf(name) >= 0
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
          </CollapsePanel>
        </Collapse>
      </div>
    </Draggable>
  );
};

export default SearchMenu;
