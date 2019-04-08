import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store/reducers';
import AtlasComponent from '../components/Atlas';
import SliderMenu from '../components/Atlas/Controls/SliderMenu';
import { ContextMenuTrigger } from 'react-contextmenu';
import AtlasContextMenu from '../components/Atlas/ContextMenu';
import SearchMenu from '../components/Atlas/SearchMenu';
import { notification, Progress } from 'antd';

interface HomeProps {}

const Home: React.FunctionComponent<HomeProps> = ({}) => {
  const [atlas, setAtlas] = React.useState();
  const [showControls, setShowControls] = React.useState(true);
  const [showPlane, setShowPlane] = React.useState(true);
  const [contrast, setContrast] = React.useState(1.0);
  const [opacity, setOpacity] = React.useState(1.0);
  const [brightness, setBrightness] = React.useState(0);
  const [colormap, setColormap] = React.useState<string>('greys');
  const [query, setQuery] = React.useState<string>('');
  const [queryResults, setQueryResults] = React.useState<any[]>([]);
  const [colorMapStyles, setColorMapStyles] = React.useState<string[]>([]);
  const [
    morphologyVisibility,
    setMorphologyCollectionVisibility,
  ] = React.useState<string[]>([]);
  const [regionVisibility, setRegionCollectionVisibility] = React.useState<
    string[]
  >(['root']);

  if (atlas && !colorMapStyles.length) {
    setColorMapStyles(atlas.plane.getColormapStyles());
  }

  const setRegionVisibility = (acronym: string) => {
    const index = regionVisibility.indexOf(acronym);
    if (index >= 0) {
      const copy = [...regionVisibility];
      copy.splice(index, 1);
      // we have to remove
      atlas.regionCollection.hideRegionPerAcronym(acronym);
      return setRegionCollectionVisibility(copy);
    }
    // we hav to add
    atlas.regionCollection.showRegionPerAcronym(acronym);
    return setRegionCollectionVisibility([...regionVisibility, acronym]);
  };

  const setMorphologyVisibility = (name: string) => {
    const index = morphologyVisibility.indexOf(name);
    if (index >= 0) {
      const copy = [...morphologyVisibility];
      copy.splice(index, 1);
      // we have to remove
      atlas.morphologyCollection.hideMorphologyById(name);
      return setMorphologyCollectionVisibility(copy);
    }
    // we hav to add
    const lowerCaseName = `${name}`.toLowerCase();

    if (
      atlas.morphologyCollection &&
      atlas.morphologyCollection._collection[lowerCaseName] &&
      atlas.morphologyCollection._collection[lowerCaseName].mesh
    ) {
      notification.info({
        key: name,
        message: 'Morphology Loaded',
      });
    } else {
      notification.info({
        key: name,
        message: 'Morphology Loading',
        description: `Preparing morphology`,
      });
    }
    atlas.morphologyCollection.showMorphologyById(name);
    return setMorphologyCollectionVisibility([...morphologyVisibility, name]);
  };

  React.useEffect(() => {
    if (!atlas) {
      return;
    }
    atlas.morphologyCollection.on(
      'error',
      (data: { error: Error; name: string }) => {
        const { error, name } = data;
        notification.error({
          key: name,
          message: 'Morphology Loading',
          description: error.message,
        });
      }
    );
    // @ts-ignore
    atlas.morphologyCollection.on('loading', (morphologyInfo, progressInfo) => {
      const name = morphologyInfo.name;
      const percent = ~~(progressInfo.progress * 100);
      if (progressInfo.step === 'done') {
        notification.close(name);
      } else {
        notification.open({
          key: name,
          message: `Morphology ${progressInfo.step}`,
          description: (
            <div>
              <Progress percent={percent} status="active" />
            </div>
          ),
        });
      }
    });
  }, [atlas]);

  React.useEffect(() => {
    if (!atlas) {
      return;
    }
    setQueryResults(
      atlas.morphologyCollection.getMorphologiesPerRegionQuery(query)
    );
  }, [query, atlas]);

  React.useEffect(() => {
    if (!atlas) {
      return;
    }
    atlas.plane.useColormap(colormap);
  }, [colormap, atlas]);

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
        colormap={{
          value: colormap,
          set: setColormap,
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
        colorMapStyles={colorMapStyles}
      />
      {atlas && (
        <SearchMenu
          queryResults={queryResults}
          queryFunction={setQuery}
          morphologyVisibility={morphologyVisibility}
          setMorphologyVisibility={setMorphologyVisibility}
          regionVisibility={regionVisibility}
          setRegionVisibility={setRegionVisibility}
        />
      )}
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
