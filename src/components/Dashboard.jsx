'use client'
import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Paper, Grid, Alert, Select, MenuItem, CircularProgress, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useRouter } from "next/router";
import Chart from "../components/Chart";
import { format } from "date-fns"; // Date-fns kullanarak tarih formatlama
import { jsPDF } from "jspdf"; // jsPDF kütüphanesini import et
import "jspdf-autotable"; // autoTable eklentisini import et

const Dashboard = ({ user }) => {
    const [monthlyIncome, setMonthlyIncome] = useState({});
    const [expenses, setExpenses] = useState([]);
    const [formValues, setFormValues] = useState({ category: "", amount: "", date: "" });
    const [exceeded, setExceeded] = useState(false);
    const [initialIncome, setInitialIncome] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const router = useRouter();

    const categories = ["Rent", "Personal", "Art", "Debts", "Groceries", "Entertainment", "Health", "Transport"];

    useEffect(() => {
        // Kullanıcı giriş yaptı mı kontrol et
        const loggedInUser = localStorage.getItem("user");
        if (!loggedInUser) {
            router.push("/login");
        } else {
            const currentUser = JSON.parse(loggedInUser);
            const currentUserId = currentUser.id;

            // Kullanıcıya özel verileri `localStorage`'dan yükle
            const savedIncome = localStorage.getItem(`monthlyIncome_${currentUserId}`);
            const savedExpenses = localStorage.getItem(`expenses_${currentUserId}`);

            if (savedIncome) {
                setMonthlyIncome(JSON.parse(savedIncome));
            }

            if (savedExpenses) {
                setExpenses(JSON.parse(savedExpenses));
            }
        }
    }, [router]);

    useEffect(() => {
        // Sayfa yenilendiğinde, mevcut kullanıcının verilerini `localStorage`'a kaydedin
        const currentUser = JSON.parse(localStorage.getItem("user"));
        if (currentUser) {
            const currentUserId = currentUser.id;

            // Her güncellenen veriyi kaydediyoruz
            localStorage.setItem(`monthlyIncome_${currentUserId}`, JSON.stringify(monthlyIncome));
            localStorage.setItem(`expenses_${currentUserId}`, JSON.stringify(expenses));
        }
    }, [monthlyIncome, expenses]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSetIncomeForMonth = () => {
        const income = parseFloat(initialIncome);
        if (!isNaN(income) && income > 0) {
            setLoading(true);
            const updatedIncome = { ...monthlyIncome, [selectedMonth]: income };
            setMonthlyIncome(updatedIncome);
            setLoading(false);
        }
    };

    const handleAddExpense = () => {
        if (formValues.category && formValues.amount && formValues.date) {
            const newExpense = {
                category: formValues.category,
                amount: parseFloat(formValues.amount),
                date: formValues.date,
            };
            setExpenses((prevExpenses) => {
                const updatedExpenses = [...prevExpenses, newExpense];
                return updatedExpenses;
            });
            setFormValues({ category: "", amount: "", date: "" });

            const selectedIncome = monthlyIncome[selectedMonth] || 0;
            const newTotalIncome = selectedIncome - parseFloat(formValues.amount);
            setMonthlyIncome({ ...monthlyIncome, [selectedMonth]: newTotalIncome });
            setExceeded(newTotalIncome < 0);
        }
    };

    const groupedExpenses = expenses
        .filter(expense => new Date(expense.date).getMonth() === selectedMonth)
        .reduce((acc, curr) => {
            acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
            return acc;
        }, {});

    const chartData = Object.keys(groupedExpenses).map((category) => ({
        category,
        amount: groupedExpenses[category],
        type: "expense",
    }));

    const incomeData = [{ category: "Income", amount: monthlyIncome[selectedMonth] || 0, type: "income" }];
    const combinedData = [...incomeData, ...chartData];

    const calculateTotalExpenses = () => {
        return Object.values(groupedExpenses).reduce((total, amount) => total + amount, 0);
    };

    const remainingAmount = (monthlyIncome[selectedMonth] || 0) - calculateTotalExpenses();

    // PDF indirme fonksiyonu
    const downloadPDF = () => {
        const doc = new jsPDF();

        // Başlık
        doc.setFontSize(20);
        doc.text("Monthly Budget Report", 14, 22);

        // Gelir ve gider verilerini yazdırma
        doc.setFontSize(12);
        doc.text(`Month: ${format(new Date(2024, selectedMonth), "MMMM yyyy")}`, 14, 30);
        doc.text(`Income: $${monthlyIncome[selectedMonth] || 0}`, 14, 40);

        // Tablolar için header ve veriler
        const tableData = expenses
            .filter(expense => new Date(expense.date).getMonth() === selectedMonth)
            .map((expense) => [expense.category, `$${expense.amount}`]);

        // Tablo başlıkları
        const tableColumns = ["Category", "Amount"];

        // autoTable ile tabloyu oluşturuyoruz
        doc.autoTable({
            startY: 50, // Tabloyu başlatmak için Y pozisyonu
            head: [tableColumns],
            body: tableData,
            theme: 'grid',
        });

        // Toplam harcama ve kalan miktarı yazdırma
        const totalExpenses = expenses
            .filter(expense => new Date(expense.date).getMonth() === selectedMonth)
            .reduce((acc, curr) => acc + curr.amount, 0);

        const remaining = (monthlyIncome[selectedMonth] || 0) - totalExpenses;
        doc.text(`Total Expenses: $${totalExpenses}`, 14, doc.lastAutoTable.finalY + 10);
        doc.text(`Remaining Budget: $${remaining}`, 14, doc.lastAutoTable.finalY + 20);

        // PDF'yi indirme
        doc.save(`Budget_Report_${format(new Date(2024, selectedMonth), "MMMM_yyyy")}.pdf`);
    };

    return user ? (
        <Box
            sx={{
                padding: "2rem",
                backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1F2937" : "#f3f4f6"),
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Grid container spacing={3} sx={{ flex: 1 }}>
                {/* Left Side: Income and Expense Form */}
                <Grid item xs={12} md={4}>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: "2rem",
                            marginBottom: "2rem",
                            backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#2d3748" : "#ffffff"),
                            borderRadius: "8px",
                        }}
                    >
                        <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
                            Welcome, {user.firstName} {user.lastName}
                        </Typography>

                        {/* Select Month */}
                        <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
                            <InputLabel>Select Month</InputLabel>
                            <Select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                label="Select Month"
                            >
                                {[...Array(12)].map((_, index) => (
                                    <MenuItem key={index} value={index}>
                                        {format(new Date(2024, index), "MMMM")}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Monthly Income */}
                        <TextField
                            label="Monthly Income"
                            variant="outlined"
                            value={initialIncome}
                            onChange={(e) => setInitialIncome(e.target.value)}
                            fullWidth
                            type="number"
                            sx={{ marginBottom: "1rem" }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSetIncomeForMonth}
                            sx={{
                                width: "100%",
                                backgroundColor: "#2D3748",
                                color: "white",
                                marginBottom: "2rem",
                            }}
                        >
                            {loading ? <CircularProgress size={24} /> : "Set Income"}
                        </Button>

                        {/* Expense Form */}
                        <TextField
                            label="Amount"
                            variant="outlined"
                            name="amount"
                            value={formValues.amount}
                            onChange={handleInputChange}
                            fullWidth
                            type="number"
                            sx={{ marginBottom: "1rem" }}
                        />
                        <TextField
                            label=""
                            variant="outlined"
                            name="date"
                            value={formValues.date}
                            onChange={handleInputChange}
                            fullWidth
                            type="date"
                            sx={{ marginBottom: "1rem" }}
                        />
                        <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
                            <InputLabel>Category</InputLabel>
                            <Select
                                name="category"
                                value={formValues.category}
                                onChange={handleInputChange}
                                label="Category"
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddExpense}
                            sx={{ marginBottom: "2rem" }}
                        >
                            Add Expense
                        </Button>
                    </Paper>
                </Grid>

                {/* Right Side: Chart and Expense Table */}
                <Grid item xs={12} md={8}>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: "2rem",
                            backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#2d3748" : "#ffffff"),
                            borderRadius: "8px",
                        }}
                    >
                        <Chart data={combinedData} />
                        <TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Category</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.entries(groupedExpenses).map(([category, amount]) => (
                                        <TableRow key={category}>
                                            <TableCell>{category}</TableCell>
                                            <TableCell align="right">${amount}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell>Total Expenses</TableCell>
                                        <TableCell align="right">${calculateTotalExpenses()}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* PDF Download Button */}
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={downloadPDF}
                            sx={{ marginTop: "2rem" }}
                        >
                            Download PDF Report
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    ) : (
        <Alert severity="error">You must log in to view your dashboard.</Alert>
    );
};

export default Dashboard;
