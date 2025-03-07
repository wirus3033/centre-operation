// frontend/src/component/Data/import.js
import * as XLSX from "xlsx";

// 📌 Fonction d'importation et transformation du fichier Excel en JSON
export const ImportData = async (file) => {
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
                    const headers = sheetData[0].map((h) => h.trim());
                    
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
                                population: parseInt(rowData.POPULATION) || 0,
                                menages: parseInt(rowData.MENAGES) || 0,
                            });
                        }
                    }
                }
            });
            resolve(allData);
        };

        reader.onerror = (error) => reject(error);
    });
};

// 📌 Gestion de l'importation et validation des données
export const handleImport = async (event, data = [], setImportedData, setImportDialogOpen, setLoading) => {
    const file = event.target.files[0];
    if (!file) {
        alert("❌ Aucun fichier sélectionné !");
        return;
    }

    console.log("📌 Début de l'importation du fichier :", file.name);
    setLoading(true);

    try {
        const newData = await ImportData(file);
        console.log("📌 Données importées :", newData);

        if (!Array.isArray(data)) {
            console.error("❌ `data` n'est pas un tableau !");
            return;
        }

        setImportedData(newData);
        setImportDialogOpen(true);
    } catch (error) {
        console.error("❌ Erreur d'importation :", error);
    } finally {
        setLoading(false);
    }
};
