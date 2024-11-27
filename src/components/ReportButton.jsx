import React from "react";
import { Button } from "@mui/material";
import { useReactToPrint } from "react-to-print";

const ReportButton = () => {
    const handlePrint = useReactToPrint({
        content: () => document.getElementById("expense-report"),
    });

    return (
        <Button variant="contained" onClick={handlePrint}>
            Download PDF
        </Button>
    );
};

export default ReportButton;
