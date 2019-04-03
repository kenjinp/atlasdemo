import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store/reducers';
import AtlasComponent from '../components/Atlas';
import SliderMenu from '../components/Atlas/Controls/SliderMenu';
import { ContextMenuTrigger } from 'react-contextmenu';
import AtlasContextMenu from '../components/Atlas/ContextMenu';
interface HomeProps {}

const Home: React.FunctionComponent<HomeProps> = ({}) => {
  const [atlas, setAtlas] = React.useState();
  const [showControls, setShowControls] = React.useState(true);
  const [showPlane, setShowPlane] = React.useState(true);
  const [contrast, setContrast] = React.useState(1.0);
  const [opacity, setOpacity] = React.useState(1.0);
  const [brightness, setBrightness] = React.useState(0);

  if (atlas) {
    // console.log('styles', atlas.plane.getColormapStyles());
  }

  React.useEffect(() => {
    if (!atlas) {
      return;
    }
    atlas.plane.setBrightness(brightness);
  }, [brightness, atlas]);

  React.useEffect(() => {
    if (!atlas) {
      return;
    }
    atlas.plane.setContrast(contrast);
  }, [contrast, atlas]);

  React.useEffect(() => {
    if (!atlas) {
      return;
    }
    atlas.plane.setOpacity(opacity);
  }, [opacity, atlas]);

  React.useEffect(() => {
    if (!atlas) {
      return;
    }
    if (showPlane) {
      atlas.plane.enable();
    } else {
      atlas.plane.disable();
    }
  }, [showPlane, atlas]);

  // const [showControls, setShowControls] = React.useState(true);
  // const [showControls, setShowControls] = React.useState(true);
  return (
    <div className="workspace-container">
      <ContextMenuTrigger id="atlas">
        <AtlasComponent setAtlas={setAtlas} />
      </ContextMenuTrigger>
      <AtlasContextMenu
        id="atlas"
        align={() => {
          if (atlas) {
            atlas.plane.alignOnVoxelSpace();
          }
        }}
        brightness={{
          value: brightness,
          set: setBrightness,
        }}
        opacity={{
          value: opacity,
          set: setOpacity,
        }}
        contrast={{
          value: contrast,
          set: setContrast,
        }}
        controls={{
          value: showControls,
          set: setShowControls,
        }}
        showPlane={{
          value: showPlane,
          set: setShowPlane,
        }}
      />
      {atlas && (
        <SliderMenu
          showControls={showControls}
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
