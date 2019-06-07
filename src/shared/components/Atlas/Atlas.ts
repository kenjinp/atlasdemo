// @ts-ignore
import ThreeContext from 'threecontext';
// @ts-ignore
import VolumeSlicer from 'volumeslicer';
import RegionCollection from './RegionCollection';

// Some matrices to test the world coordinates
const TEST_MATRICES = {
  IDENTITY: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  BY_10: [10, 0, 0, 0, 0, 10, 0, 0, 0, 0, 10, 0, 0, 0, 0, 1],
  BIG_OFFSET: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1000, 2000, 3000, 1],
  HALF_OFFSET: [1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, -660, 400, -570, 1],
  NON_ISO_SCALING: [3, 0, 0, 0, 0, 10, 0, 0, 0, 0, 5, 0, 0, 0, 0, 1],
  NON_ISO_SCALING_2: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0.3, 0, 10, 20, 30, 1],
  ROTATION_ONLY: [
    1,
    0,
    0,
    0,
    0,
    0.5000000000000001,
    0.8660254037844386,
    0,
    0,
    -0.8660254037844386,
    0.5000000000000001,
    0,
    0,
    0,
    0,
    1,
  ], // PI/3
  ROTATION_BIG_OFFSET: [
    1,
    0,
    0,
    0,
    0,
    0.5000000000000001,
    0.8660254037844386,
    0,
    0,
    -0.8660254037844386,
    0.5000000000000001,
    0,
    1000,
    2000,
    3000,
    1,
  ],
  MULTI_ROTATION: [
    0.5270378633297923,
    -0.3972330787924597,
    -0.7512902047343827,
    0,
    -0.642032960086751,
    0.39309216146920933,
    -0.6582341762273587,
    0,
    0.5567986788588956,
    0.8292674078393101,
    -0.04786227654907482,
    0,
    4024.56886636522,
    5411.01638392107,
    280.7824934491489,
    1,
  ],
};

const datasetConfig = {
  data_type: 'uint8',
  num_channels: 1,
  voxelToWorld: TEST_MATRICES.BY_10,
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
  public planeCollection: any;
  public morphologyCollection: any;
  public regionCollection: any;
  constructor(element: HTMLDivElement) {
    const options = {
      webgl2: true, // enable WebGL2 if `true` (default: false)
      embedLight: false, // embeds the light into the camera if true (default: false)
      antialias: true, // enables antialias if true (default: true)
      showAxisHelper: false, // shows the axis helper at (0, 0, 0) when true (default: false)
      axisHelperSize: 100, // length of the the 3 axes of the helper (default: 100)
      controlType: 'trackball', // 'orbit': locked poles or 'trackball': free rotations (default: 'trackball')
      cameraPosition: { x: 0, y: 0, z: 0 }, // inits position of the camera (default: {x: 0, y: 0, z: 100})
      cameraLookAt: { x: 0, y: 0, z: 0 }, // inits position to look at (default: {x: 0, y: 0, z: 0})
      raycastOnDoubleClick: true, // performs a raycast when double clicking (default: `true`).
      // If some object from the scene are raycasted, the event 'raycast'
      // is emitted with the list of intersected object from the scene as argument.
    };

    // @ts-ignore
    const threeContext = new ThreeContext(element, options);
    // CAMERA BUSINESS
    const camera = threeContext.getCamera();
    // this is because our unit is micron
    camera.far = 1000000;
    // this is because the
    camera.up.negate();
    camera.updateProjectionMatrix();

    // @ts-ignore
    const slicer = new VolumeSlicer.Slicer({ threeContext });

    const vdc = slicer.getVolumeDatasetCollection();
    const allenAverageModel = vdc.createVolumeDataset(
      'datasets/{datasetName}/{lodName}/{xStart}-{xEnd}_{yStart}-{yEnd}_{zStart}-{zEnd}',
      'allen_10um_8bit',
      datasetConfig
    );
    allenAverageModel.setLodMaxIntersection(3);

    slicer.focusOnDataset(/* dataset name or use default */);
    slicer.showDatasetBox(/* dataset name or use default */);

    slicer.adaptPlaneToDataset(/* the default plane */);
    slicer.computeIntersectedCuboids(null, allenAverageModel.getName(), false);

    const planeCollection = (this.planeCollection = slicer.getPlaneCollection());
    planeCollection.getPlane().disable();

    // create 3 planes to put in a group
    const p0 = planeCollection.addPlane(null, false);
    slicer.adaptPlaneToDataset(p0);

    const p1 = planeCollection.addPlane(null, false);
    slicer.adaptPlaneToDataset(p1);
    p1.rotateOnUp(Math.PI / 2);
    p1.setHelperVisibility(false);

    const p2 = planeCollection.addPlane(null, false);
    slicer.adaptPlaneToDataset(p2);
    p2.rotateOnRight(Math.PI / 2);
    p2.setHelperVisibility(false);

    planeCollection.useColormap('bone');

    // TODO
    // @ts-ignore
    planeCollection.forEach((p, i) => {
      slicer.computeIntersectedCuboids(p, allenAverageModel.getName(), false);
    });

    // get the default one
    const plane = (this.plane = planeCollection.getPlane());

    const worldBoundaries = allenAverageModel.getWorldBoundaries();
    const worldBoundariesSize = worldBoundaries.getSize();
    const planeScale = plane.getScale();
    const largestSide = Math.max(planeScale.x, planeScale.y, planeScale.z);
    const planePosition = plane.getPosition();

    // loading a mesh using its id
    // @ts-ignore
    const regionCollection = (this.regionCollection = new RegionCollection(
      threeContext
    ));
  }
}

export default Atlas;
