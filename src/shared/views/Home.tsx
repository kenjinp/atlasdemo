import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store/reducers';
import AtlasComponent from '../components/Atlas';
import SliderMenu from '../components/Atlas/Controls/SliderMenu';

interface HomeProps {}

const Home: React.FunctionComponent<HomeProps> = ({}) => {
  return (
    <div className="workspace-container">
      <AtlasComponent />
      <SliderMenu />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
