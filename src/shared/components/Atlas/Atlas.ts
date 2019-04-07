import * as ThreeOctreePlane from 'threeoctreeplane/dist/threeoctreeplane.js';

// Some matrices to test the world coordinates
const datasetConfig = {
  data_type: 'uint8',
  num_channels: 1,
  voxelToWorld: [10, 0, 0, 0, 0, 10, 0, 0, 0, 0, 10, 0, 0, 0, 0, 1],
  scales: [
    {
      chunk_sizes: [[64, 64, 64]],
      encoding: 'raw',
      key: '10um',
      resolution: [10000, 10000, 10000],
      size: [1320, 800, 1140],
      voxel_offset: [0, 0, 0],
    },
    {
      chunk_sizes: [[64, 64, 64]],
      encoding: 'raw',
      key: '20um',
      resolution: [20000, 20000, 20000],
      size: [660, 400, 570],
      voxel_offset: [0, 0, 0],
    },
    {
      chunk_sizes: [[64, 64, 64]],
      encoding: 'raw',
      key: '40um',
      resolution: [40000, 40000, 40000],
      size: [330, 200, 285],
      voxel_offset: [0, 0, 0],
    },
    {
      chunk_sizes: [[64, 64, 64]],
      encoding: 'raw',
      key: '80um',
      resolution: [80000, 80000, 80000],
      size: [165, 100, 143],
      voxel_offset: [0, 0, 0],
    },
    {
      chunk_sizes: [[64, 64, 64]],
      encoding: 'raw',
      key: '160um',
      resolution: [160000, 160000, 160000],
      size: [83, 50, 72],
      voxel_offset: [0, 0, 0],
    },
  ],
  type: 'image',
};

class Atlas {
  public plane: any;
  public slicer: any;
  public morphologyCollection: any;
  constructor(element: HTMLDivElement) {
    // @ts-ignore
    const threeContext = new ThreeOctreePlane.ThreeContext(element);

    // @ts-ignore
    const slicer = (this.slicer = new ThreeOctreePlane.Slicer(threeContext));

    const vdc = slicer.getVolumeDatasetCollection();
    const allenAverageModel = vdc.createVolumeDataset(
      'http://127.0.0.1:8080/{datasetName}/{lodName}/{xStart}-{xEnd}_{yStart}-{yEnd}_{zStart}-{zEnd}',
      // 'https://datasets.jonathanlurie.fr/{datasetName}/{lodName}/{xStart}-{xEnd}_{yStart}-{yEnd}_{zStart}-{zEnd}',
      'allen_10um_8bit',
      datasetConfig
    );

    const planeCollection = slicer.getPlaneCollection();
    const plane = (this.plane = planeCollection.getPlane());
    plane.setHelperVisibility(false);
    // plane.disable()

    // console.log(allenAverageModel);

    // plane.setShaderId('dev')
    // limit the max level of detail to render
    // allenAverageModel.setLodMaxIntersection(1)

    slicer.focusOnDataset(/* dataset name or use default */);
    slicer.showDatasetBox(/* dataset name or use default */);
    slicer.adaptPlaneToDataset(/* dataset name or use default */);

    const worldBoundaries = allenAverageModel.getWorldBoundaries();
    const worldBoundariesSize = worldBoundaries.getSize();
    const planeScale = plane.getScale();
    const largestSide = Math.max(planeScale.x, planeScale.y, planeScale.z);
    const planePosition = plane.getPosition();

    // loading a mesh using its id
    // @ts-ignore
    const regionCollection = new ThreeOctreePlane.RegionCollection(
      threeContext
    );
    regionCollection.on('ready', () => {
      regionCollection.showRegionById('997'); // the whole brain
      // regionCollection.showRegionById('385')
    });

    // similarly, we can hide it
    // regionCollection.hideRegionById('997')

    // loading morphology listing file
    // @ts-ignore
    const morphologyCollection = (this.morphologyCollection = new ThreeOctreePlane.MorphologyCollection(
      threeContext
    ));
    morphologyCollection.on('ready', () => {
      // console.log(morphologyCollection);
      // morphologyCollection.showMorphologyById('AA0046', 0xff0000);
      // morphologyCollection.hideMorphologyById('AA0046')
    });
  }
}

export default Atlas;
