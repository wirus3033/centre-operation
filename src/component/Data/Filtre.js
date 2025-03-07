// frontend/src/component/Data/Filtre.js
import React, { useState, useEffect, useMemo } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";

const Filtre = ({ open, onClose, applyFilter, data }) => {
    const [filters, setFilters] = useState({ region: "", district: "", commune: "", fokontany: "" });

    // 📌 Pré-calculer les options filtrées avec useMemo pour éviter les recalculs inutiles
    const regionOptions = useMemo(() => [...new Set(data.map((row) => row.region))], [data]);
    const districtOptions = useMemo(
        () => data.filter((row) => row.region === filters.region).map((row) => row.district),
        [filters.region, data]
    );
    const communeOptions = useMemo(
        () => data.filter((row) => row.district === filters.district).map((row) => row.commune),
        [filters.district, data]
    );
    const fokontanyOptions = useMemo(
        () => data.filter((row) => row.commune === filters.commune).map((row) => row.fokontany),
        [filters.commune, data]
    );

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
            ...(name === "region" ? { district: "", commune: "", fokontany: "" } : {}),
            ...(name === "district" ? { commune: "", fokontany: "" } : {}),
            ...(name === "commune" ? { fokontany: "" } : {}),
        }));
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>🔍 Filtrer les données</DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Région</InputLabel>
                    <Select name="region" value={filters.region} onChange={handleFilterChange}>
                        <MenuItem value="">Toutes</MenuItem>
                        {regionOptions.map((region) => (
                            <MenuItem key={`region-${region}`} value={region}>{region}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal" disabled={!filters.region}>
                    <InputLabel>District</InputLabel>
                    <Select name="district" value={filters.district} onChange={handleFilterChange}>
                        <MenuItem value="">Tous</MenuItem>
                        {districtOptions.map((district) => (
                            <MenuItem key={`district-${district}`} value={district}>{district}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal" disabled={!filters.district}>
                    <InputLabel>Commune</InputLabel>
                    <Select name="commune" value={filters.commune} onChange={handleFilterChange}>
                        <MenuItem value="">Toutes</MenuItem>
                        {communeOptions.map((commune) => (
                            <MenuItem key={`commune-${commune}`} value={commune}>{commune}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal" disabled={!filters.commune}>
                    <InputLabel>Fokontany</InputLabel>
                    <Select name="fokontany" value={filters.fokontany} onChange={handleFilterChange}>
                        <MenuItem value="">Tous</MenuItem>
                        {fokontanyOptions.map((fokontany) => (
                            <MenuItem key={`fokontany-${fokontany}`} value={fokontany}>{fokontany}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} color="secondary">Annuler</Button>
                <Button onClick={() => applyFilter(filters)} color="primary">Appliquer</Button>
            </DialogActions>
        </Dialog>
    );
};

export default Filtre;
