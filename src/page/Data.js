// frontend/src/page/Data.js
import React, { useState } from "react";
import ImportPopup from "../component/Data/ImportPopup";
import Filtre from "../component/Data/Filtre";
import TableauDonnees from "../component/Data/TableauDonnees";
import { Button, CircularProgress } from "@mui/material";
import { handleImport } from "../component/Data/handleImport";

const Data = () => {
    const [importedData, setImportedData] = useState([]);
    const [importDialogOpen, setImportDialogOpen] = useState(false);
    const [filterDialogOpen, setFilterDialogOpen] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [regionExistante, setRegionExistante] = useState(false);
    const [regionName, setRegionName] = useState("");

    const applyFilter = (filters) => {
        const filtered = importedData.filter(row =>
            (!filters.region || row.region === filters.region) &&
            (!filters.district || row.district === filters.district) &&
            (!filters.commune || row.commune === filters.commune) &&
            (!filters.fokontany || row.fokontany === filters.fokontany)
        );
        setFilteredData(filtered);
        setFilterDialogOpen(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileName = file.name;
            const regex = /^(.+?)_CoBngrc\.xlsx$/;
            const match = fileName.match(regex);
            
            if (match) {
                const extractedRegionName = match[1]
                    .normalize("NFD") // Supprime les accents éventuels
                    .replace(/[\u0300-\u036f]/g, "") // Supprime les diacritiques
                    .replace(/_/g, " ") // Remplace les underscores par des espaces
                    .replace(/\s+/g, " ") // Remplace plusieurs espaces par un seul
                    .trim()
                    .toUpperCase();
                setRegionName(extractedRegionName);
            } else {
                alert("❌ Nom de fichier invalide ! Format attendu : 'NOM_DE_LA_REGION_CoBngrc.xlsx'");
                return;
            }
            handleImport(e, setImportedData, setImportDialogOpen, setRegionExistante, setLoading);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>📊 Gestion des Données</h2>
            {regionName && <h4>📍 Région détectée : {regionName}</h4>}
            <input
                type="file"
                accept=".xlsx"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="file-input"
            />
            <label htmlFor="file-input">
                <Button variant="contained" color="primary" component="span">
                    📥 Importer un fichier
                </Button>
            </label>

            <Button variant="outlined" color="secondary" onClick={() => setFilterDialogOpen(true)} style={{ marginLeft: "10px" }}>
                🔍 Filtrer les données
            </Button>

            {loading && <CircularProgress style={{ display: "block", margin: "20px auto" }} />}
            <TableauDonnees regionsData={filteredData.length > 0 ? filteredData : importedData} />
            
            <ImportPopup open={importDialogOpen} onClose={() => setImportDialogOpen(false)} importedData={importedData} regionExistante={regionExistante} handleConfirmImport={() => {}} />
            <Filtre open={filterDialogOpen} onClose={() => setFilterDialogOpen(false)} applyFilter={applyFilter} data={importedData} />
        </div>
    );
};

export default Data;
