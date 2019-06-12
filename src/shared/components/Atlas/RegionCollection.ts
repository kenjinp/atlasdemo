// @ts-ignore
import ThreeContext from 'threecontext';
// @ts-ignore
import MeshCollection from 'meshcollection';
// @ts-ignore
import OneAllenBrainOntology from 'oneallenbrainontology';

class RegionCollection {
  private meshCollection: any;
  constructor(threeContext: ThreeContext) {
    this.meshCollection = new MeshCollection(threeContext);
  }
  hideRegionPerAcronym(acronym: string) {
    const regionData = OneAllenBrainOntology.getRegionByAcronym(acronym);
    console.log('hide stuff', acronym, regionData, this.meshCollection);

    if (regionData === null) {
      console.warn(`The region with acronym ${acronym} does not exist.`);
      return;
    }
    const { id } = regionData;
    if (this.meshCollection.has(id)) {
      this.meshCollection.hide(id);
    }
  }
  showRegionPerAcronym(acronym: string) {
    const regionData = OneAllenBrainOntology.getRegionByAcronym(acronym);

    if (regionData === null) {
      console.warn(`The region with acronym ${acronym} does not exist.`);
      return;
    }

    const { id } = regionData;

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
  getRegionDataPerAcronym(acronym: string) {
    return OneAllenBrainOntology.getRegionByAcronym(acronym);
  }
  getRegionDataPerId(id: number) {
    return OneAllenBrainOntology.getRegionById(id);
  }
}

export default RegionCollection;
