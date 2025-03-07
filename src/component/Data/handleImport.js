// frontend/src/component/Data/handleImport.js
import * as XLSX from "xlsx";

export const verifyFile = async (file) => {
    return new Promise((resolve, reject) => {
        const fileName = file.name;
        const regex = /^(.+?)_CoBngrc\.xlsx$/;
        const match = fileName.match(regex);

        if (!match) {
            alert("❌ Nom de fichier invalide ! Format attendu : 'NOM_DE_LA_REGION_CoBngrc.xlsx'");
            return reject("Nom de fichier invalide");
        }

        const regionName = match[1]
            .normalize("NFD") // Supprime les accents éventuels
            .replace(/[\u0300-\u036f]/g, "") // Supprime les diacritiques
            .replace(/_/g, " ") // Remplace les underscores par des espaces
            .replace(/\s+/g, " ") // Remplace plusieurs espaces par un seul
            .trim()
            .toUpperCase();

        fetch("http://localhost:4000/api/region")
        .then((res) => res.json())
        .then((regions) => {
            console.log("📌 Liste des régions récupérées :", regions); // Vérification des régions en base
            console.log("📌 Région détectée :", regionName); // Vérification du nom extrait du fichier
    
            const regionExistante = regions.some(
                (r) => r.nom_region.toUpperCase().trim() === regionName.toUpperCase().trim()
            );
    
            console.log(`🔍 Région ${regionName} existante en base ? `, regionExistante); // Debug
    
            resolve({ regionName, regionExistante });
        })
        .catch((error) => {
            console.error("❌ Erreur lors de la récupération des régions :", error);
            reject("❌ Impossible de récupérer les régions !");
        });
    });
};

export const extractDataFromXLSX = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsBinaryString(file);

        reader.onload = (event) => {
            const binaryData = event.target.result;
            const workbook = XLSX.read(binaryData, { type: "binary" });

            let allData = [];

            workbook.SheetNames.forEach((sheetName) => {
                const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
                
                if (sheetData.length > 1) {
                    const headers = sheetData[0].map((h) => h.trim().toUpperCase());
                    
                    for (let i = 1; i < sheetData.length; i++) {
                        let row = sheetData[i];
                        let rowData = {};

                        headers.forEach((header, index) => {
                            rowData[header] = row[index] ? row[index].toString().trim() : "";
                        });

                        if (rowData.DISTRICT && rowData.COMMUNE && rowData.FOKONTANY && rowData.POPULATION && rowData.MENAGES) {
                            allData.push({
                                region: file.name.split("_")[0].toUpperCase(),
                                district: sheetName.toUpperCase(),
                                commune: rowData.COMMUNE.toUpperCase(),
                                fokontany: rowData.FOKONTANY.toUpperCase(),
                                population: isNaN(parseInt(rowData.POPULATION)) ? 0 : parseInt(rowData.POPULATION),
                                menages: isNaN(parseInt(rowData.MENAGES)) ? 0 : parseInt(rowData.MENAGES),
                            });
                        }
                    }
                }
            });

            console.log("📊 Données extraites :", allData);
            resolve(allData);
        };

        reader.onerror = (error) => reject("❌ Erreur lors de la lecture du fichier :" + error);
    });
};

export const handleImport = async (event, setImportedData, setImportDialogOpen, setRegionExistante, setLoading) => {
  const file = event.target.files[0];
  if (!file) {
      alert("❌ Aucun fichier sélectionné !");
      return;
  }

  setLoading(true);

  try {
      const { regionName, regionExistante } = await verifyFile(file);
      const allData = await extractDataFromXLSX(file);

      console.log("📩 Données prêtes à être envoyées en base :", allData);

      setImportedData(allData);
      setRegionExistante(regionExistante);
      setImportDialogOpen(true);
  } catch (error) {
      console.error(error);
  } finally {
      setLoading(false);
  }
};

export const confirmImportToDatabase = async (importedData, regionName, setImportDialogOpen, setLoading) => {
  if (!importedData || importedData.length === 0) {
      alert("❌ Aucune donnée à enregistrer !");
      return;
  }

  console.log("📤 Données envoyées au backend :", JSON.stringify({ data: importedData }, null, 2)); // Debug

  setLoading(true);

  try {
      const response = await fetch("http://localhost:4000/api/population", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ data: importedData }) // ⚠️ Assurer que `data` est bien un tableau
      });

      const result = await response.json();

      if (response.ok) {
          alert("✅ Importation réussie !");
          setImportDialogOpen(false);
      } else {
          alert(`❌ Erreur d'importation : ${result.error || "Erreur inconnue"}`);
      }
  } catch (error) {
      console.error("❌ Erreur lors de l'importation :", error);
      alert("❌ Une erreur s'est produite lors de l'importation des données.");
  } finally {
      setLoading(false);
  }
};
