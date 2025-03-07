// frontend/src/hooks/getFullLocation.js
const getFullLocation = (id_fokontany, fokontany, communes, districts, regions) => {
  if (!id_fokontany || !fokontany.length || !communes.length || !districts.length || !regions.length) {
      return { region: "Inconnu", district: "Inconnu", commune: "Inconnu", fokontany: "Inconnu" };
  }

  const fok = fokontany.find((f) => String(f.id_fokontany) === String(id_fokontany));
  if (!fok) return { region: "Inconnu", district: "Inconnu", commune: "Inconnu", fokontany: "Inconnu" };

  const commune = communes.find((c) => c.id_commune === fok.id_commune) || {};
  const district = districts.find((d) => d.id_district === commune.id_district) || {};
  const region = regions.find((r) => r.id_region === district.id_region) || {};

  return {
      region: region.nom_region || "Inconnu",
      district: district.nom_district || "Inconnu",
      commune: commune.nom_commune || "Inconnu",
      fokontany: fok.nom_fokontany || "Inconnu",
  };
};

export default getFullLocation;
