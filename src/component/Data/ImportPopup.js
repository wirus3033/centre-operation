// frontend/src/component/Data/ImportPopup.js
import React, { useState } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, CircularProgress, Snackbar, Alert
} from "@mui/material";

const ImportPopup = ({ open, onClose, importedData, regionExistante, handleConfirmImport }) => {
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleImport = async (replaceExisting) => {
        setLoading(true);
        setErrorMessage(null);
        setSuccessMessage(false);

        try {
            // Envoi des données à l'API
            const response = await fetch("http://localhost:4000/api/population", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    data: importedData,
                    replaceExisting: replaceExisting
                }),
            });

            if (!response.ok) {
                throw new Error(`Erreur API: ${response.statusText}`);
            }

            const result = await response.json();
            console.log("Réponse API:", result);

            setSuccessMessage(true);
        } catch (error) {
            setErrorMessage(`❌ Une erreur est survenue : ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>📁 Importation des données</DialogTitle>
            <DialogContent style={{ overflowX: "auto" }}>
                {loading ? (
                    <CircularProgress style={{ display: "block", margin: "20px auto" }} />
                ) : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ width: "20%" }}><b>Région</b></TableCell>
                                    <TableCell style={{ width: "15%" }}><b>District</b></TableCell>
                                    <TableCell style={{ width: "15%" }}><b>Commune</b></TableCell>
                                    <TableCell style={{ width: "15%" }}><b>Fokontany</b></TableCell>
                                    <TableCell style={{ width: "15%" }}><b>Population</b></TableCell>
                                    <TableCell style={{ width: "15%" }}><b>Ménages</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {importedData.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.region}</TableCell>
                                        <TableCell>{row.district}</TableCell>
                                        <TableCell>{row.commune}</TableCell>
                                        <TableCell>{row.fokontany}</TableCell>
                                        <TableCell>{row.population.toLocaleString()}</TableCell>
                                        <TableCell>{row.menages.toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Annuler</Button>
                {regionExistante ? (
                    <Button onClick={() => handleImport(true)} color="primary">Écraser les données existantes</Button>
                ) : (
                    <Button onClick={() => handleImport(false)} color="primary">Confirmer l'importation</Button>
                )}
            </DialogActions>

            {/* Messages de succès ou d'erreur */}
            <Snackbar open={successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage(false)}>
                <Alert severity="success">✅ Importation réussie !</Alert>
            </Snackbar>
            <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={() => setErrorMessage(null)}>
                <Alert severity="error">{errorMessage}</Alert>
            </Snackbar>
        </Dialog>
    );
};

export default ImportPopup;
