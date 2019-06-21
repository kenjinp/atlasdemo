import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store/reducers';
import AtlasComponent from '../components/Atlas';
import SliderMenu from '../components/Atlas/Controls/SliderMenu';
import { ContextMenuTrigger } from 'react-contextmenu';
import AtlasContextMenu from '../components/Atlas/ContextMenu';
import SearchMenu from '../components/Atlas/SearchMenu';
import { notification, Progress } from 'antd';
import { removeItemFromList } from '../utils';

interface HomeProps {}

const Home: React.FunctionComponent<HomeProps> = ({}) => {
  const [atlas, setAtlas] = React.useState();
  const [showControls, setShowControls] = React.useState(false);
  const [showPlane, setShowPlane] = React.useState(false);
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
  >(['root', 'HIP']);
  const [loadingRegionList, setLoadingRegionList] = React.useState<string[]>(
    []
  );

  if (atlas && !colorMapStyles.length) {
    setColorMapStyles(atlas.plane.getColormapStyles());
  }

  const setRegionVisibility = (acronym: string) => {
    // Do nothing if it's in the queue to load!
    if (loadingRegionList.includes(acronym)) {
      return;
    }
    const index = regionVisibility.indexOf(acronym);
    if (index >= 0) {
      const copy = [...regionVisibility];
      copy.splice(index, 1);
      // we have to remove
      atlas.regionCollection.hideRegionPerAcronym(acronym);
      return setRegionCollectionVisibility(copy);
    }
    // we hav to add
    // setLoadingRegionList([...loadingRegionList, acronym]);
    atlas.regionCollection.showRegionPerAcronym(acronym);
    return setRegionCollectionVisibility([...regionVisibility, acronym]);
  };

  const setMorphologyVisibility = (name: string) => {
    setMorphologyCollectionVisibility(
      removeItemFromList(morphologyVisibility, name)
    );

    // we hav to add
    const lowerCaseName = `${name}`.toLowerCase();

    if (
      atlas.morphologyCollection &&
      atlas.morphologyCollection._collection[lowerCaseName] &&
      atlas.morphologyCollection._collection[lowerCaseName].mesh
    ) {
      notification.info({
        key: name,
        message: `Morphology ${name} Loaded`,
      });
    } else {
      notification.info({
        key: name,
        message: `Morphology ${name} Loading`,
        description: `Preparing morphology`,
      });
    }
    return setMorphologyCollectionVisibility([...morphologyVisibility, name]);
  };

  React.useEffect(() => {
    if (!atlas) {
      return;
    }
    // atlas.morphologyCollection.on(
    //   'error',
    //   (data: { error: Error; name: string }) => {
    //     const { error, name } = data;
    //     notification.error({
    //       key: name,
    //       message: `Morphology ${name} Loading`,
    //       description: error.message,
    //     });
    //   }
    // );
    // @ts-ignore
    // atlas.morphologyCollection.on('loading', (morphologyInfo, progressInfo) => {
    //   const name = morphologyInfo.name;
    //   const percent = ~~(progressInfo.progress * 100);
    //   if (progressInfo.step === 'done') {
    //     notification.close(name);
    //   } else {
    //     notification.open({
    //       key: name,
    //       message: `Morphology ${name} ${progressInfo.step}`,
    //       description: (
    //         <div>
    //           <Progress percent={percent} status="active" />
    //         </div>
    //       ),
    //     });
    //   }
    // });
  }, [atlas]);

  React.useEffect(() => {
    if (!atlas) {
      return;
    }
    atlas.regionCollection.meshCollection.on(
      'onMeshLoadError',
      (error: Error, id: number) => {
        const { name, acronym } = atlas.regionCollection.getRegionDataPerId(id);
        // setLoadingRegionList(removeItemFromList(loadingRegionList, acronym));
        notification.error({
          key: `${id}`,
          message: `Region ${name} Loading`,
          description: error.message,
        });
      }
    );
    // @ts-ignore
    atlas.regionCollection.meshCollection.on(
      'onMeshLoadingProgress',
      (id: number, step: string, progress: number) => {
        const { name, acronym } = atlas.regionCollection.getRegionDataPerId(id);

        const percent = ~~(progress * 100);
        if (step === 'done') {
          // setLoadingRegionList(removeItemFromList(loadingRegionList, acronym));
          notification.open({
            key: `${id}`,
            message: `Region ${name} loaded`,
            duration: 3,
          });
        } else {
          notification.open({
            key: `${id}`,
            message: `Region ${name} ${step}`,
            description: (
              <div>
                <Progress percent={percent} status="active" />
              </div>
            ),
          });
        }
      }
    );
  }, [atlas]);

  React.useEffect(() => {
    if (!atlas) {
      return;
    }
    atlas.planeCollection.useColormap(colormap);
  }, [colormap, atlas]);

  React.useEffect(() => {
    if (!atlas) {
      return;
    }
    atlas.planeCollection.setBrightness(brightness);
  }, [brightness, atlas]);

  React.useEffect(() => {
    if (!atlas) {
      return;
    }
    atlas.planeCollection.setContrast(contrast);
  }, [contrast, atlas]);

  React.useEffect(() => {
    if (!atlas) {
      return;
    }
    regionVisibility.forEach(acronym => {
      console.log('change region visibility', acronym);
      atlas.regionCollection.showRegionPerAcronym(acronym);
    });
  }, [regionVisibility, atlas, opacity]);

  React.useEffect(() => {
    if (!atlas) {
      return;
    }
    if (showPlane) {
      atlas.planeCollection.enableAll();
    } else {
      atlas.planeCollection.disableAll();
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
          onHover={atlas.planeCollection.setHelperVisibility.bind(
            atlas.planeCollection
          )}
          planeControls={{
            translateAlongNormal: atlas.planeCollection.translateAlongNormal.bind(
              atlas.planeCollection
            ),
            translateAlongUp: atlas.planeCollection.translateAlongUp.bind(
              atlas.planeCollection
            ),
            translateAlongRight: atlas.planeCollection.translateAlongRight.bind(
              atlas.planeCollection
            ),
            rotateOnNormal: atlas.planeCollection.rotateOnNormal.bind(
              atlas.planeCollection
            ),
            rotateOnUp: atlas.planeCollection.rotateOnUp.bind(
              atlas.planeCollection
            ),
            rotateOnRight: atlas.planeCollection.rotateOnRight.bind(
              atlas.planeCollection
            ),
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
