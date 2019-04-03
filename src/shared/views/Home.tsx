import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store/reducers';
import AtlasComponent from '../components/Atlas';
import SliderMenu from '../components/Atlas/Controls/SliderMenu';
import Atlas from '../components/Atlas/Atlas';

interface HomeProps {}

const Home: React.FunctionComponent<HomeProps> = ({}) => {
  const [atlas, setAtlas] = React.useState();
  console.log(atlas);
  return (
    <div className="workspace-container">
      <AtlasComponent setAtlas={setAtlas} />
      {atlas && (
        <SliderMenu
          onHover={atlas.plane.setHelperVisibility.bind(atlas.plane)}
          planeControls={{
            translateAlongNormal: atlas.plane.translateAlongNormal.bind(
              atlas.plane
            ),
            translateAlongUp: atlas.plane.translateAlongUp.bind(atlas.plane),
            translateAlongRight: atlas.plane.translateAlongRight.bind(
              atlas.plane
            ),
            rotateOnNormal: atlas.plane.rotateOnNormal.bind(atlas.plane),
            rotateOnUp: atlas.plane.rotateOnUp.bind(atlas.plane),
            rotateOnRight: atlas.plane.rotateOnRight.bind(atlas.plane),
          }}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
