// @ts-ignore
import ThreeContext from 'threecontext';
// @ts-ignore
import MeshCollection from 'meshcollection';
// @ts-ignore
import OneAllenBrainOntology from 'oneallenbrainontology';

class RegionCollection {
  private meshCollection: any;
  constructor(threeContext: ThreeContext) {
    const mc = (this.meshCollection = new MeshCollection(threeContext));

    /**
     * Loads the top level brain region mesh
     */
    function loadRootRegionMesh() {
      const root = OneAllenBrainOntology.getRootNode();
      console.log({ root });
      displayRegionById(root.id, true);
    }

    /**
     * Display a brain region given its id. If the brain region mesh was never loaded,
     * it will.
     * @param {string|number} id - id of the brain region
     * @param {boolean} focusOn - if true, direct the camera towards the center of this brain region
     */
    function displayRegionById(id: string, focusOn = false) {
      const regionData = OneAllenBrainOntology.getRegionById(id);

      if (regionData === null) {
        console.warn(`The region with id ${id} does not exist.`);
        return;
      }

      // if already loaded, we show
      if (mc.has(id)) {
        mc.show(id);

        // if not already loaded, we load it
      } else {
        const meshUrl = `datasets/regionMeshes/${id}.obj`;
        const color = `#${regionData.color_hex_triplet}`;

        mc.loadMeshFromUrl(meshUrl, {
          color,
          focusOn,
          id,
        });
      }
    }

    /**
     * Hides the mesh of a brain region given its id.
     * @param {numner|string} id - id of the brain region
     */
    function hideMeshRegionById(id: string) {
      if (mc.has(id)) {
        mc.hide(id);
      }
    }

    loadRootRegionMesh();
  }
  hideRegionPerAcronym(acronym: string) {
    const regionData = OneAllenBrainOntology.getRegionByAcronym(acronym);

    if (regionData === null) {
      console.warn(`The region with acronym ${acronym} does not exist.`);
      return;
    }
    if (this.meshCollection.has(acronym)) {
      this.meshCollection.hide(acronym);
    }
  }
  showRegionPerAcronym(acronym: string) {
    const regionData = OneAllenBrainOntology.getRegionByAcronym(acronym);

    if (regionData === null) {
      console.warn(`The region with acronym ${acronym} does not exist.`);
      return;
    }

    const id = regionData.id;

    // if already loaded, we show
    if (this.meshCollection.has(id)) {
      this.meshCollection.show(id);

      // if not already loaded, we load it
    } else {
      const meshUrl = `datasets/regionMeshes/${id}.obj`;
      const color = `#${regionData.color_hex_triplet}`;

      this.meshCollection.loadMeshFromUrl(meshUrl, {
        color,
        id,
        focusOn: false,
      });
    }
  }
  getRegionDataPerName(acronym: string) {
    return OneAllenBrainOntology.getRegionByAcronym(acronym);
  }
  setOpacity(opacity: number, id: string) {}
}

export default RegionCollection;
