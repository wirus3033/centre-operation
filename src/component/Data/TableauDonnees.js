// frontend/src/component/Data/TableauDonnees.js
import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

const TableauDonnees = React.memo(({ regionsData }) => {
    return (
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><b>Région</b></TableCell>
                        <TableCell><b>District</b></TableCell>
                        <TableCell><b>Commune</b></TableCell>
                        <TableCell><b>Fokontany</b></TableCell>
                        <TableCell><b>Population Totale</b></TableCell>
                        <TableCell><b>Ménages Totaux</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {regionsData.length > 0 ? (
                        regionsData.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.region || "N/A"}</TableCell>
                                <TableCell>{row.district || "N/A"}</TableCell>
                                <TableCell>{row.commune || "N/A"}</TableCell>
                                <TableCell>{row.fokontany || "N/A"}</TableCell>
                                <TableCell>{(row.population || 0).toLocaleString()}</TableCell>
                                <TableCell>{(row.menages || 0).toLocaleString()}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} style={{ textAlign: "center" }}>
                                📌 Aucune donnée disponible
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
});

export default TableauDonnees;
