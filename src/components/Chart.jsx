'use client';
import React, { useEffect, useRef } from "react";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Chart.js modüllerini kaydet
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Chart = ({ data, categoryColors = { expense: 'rgba(74, 144, 226, 1)', income: 'rgba(80, 227, 194, 0.7)' } }) => {
    const chartRef = useRef(null); // Chart.js grafik referansını tutmak için

    useEffect(() => {
        const chart = chartRef.current?.chartInstance;
        if (chart) {
            const ctx = chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
            gradient.addColorStop(0, categoryColors.expense); // Expense color
            gradient.addColorStop(1, categoryColors.income); // Income color
            chart.data.datasets[0].backgroundColor = gradient;
            chart.update();
        }
    }, [data, categoryColors]); // This effect runs whenever data or categoryColors change

    // Grafik verisi
    const chartData = {
        labels: data.map(item => item.category), // Categories
        datasets: [
            {
                label: 'Amount', // Label for the dataset
                data: data.map(item => item.amount), // Amount data
                backgroundColor: 'transparent', // Start with transparent, will be updated with gradient
                borderColor: categoryColors.income, // Border color for the bars
                borderRadius: 10, // Rounded corners
                borderWidth: 2, // Border thickness
                hoverBackgroundColor: '#D5F0FF', // Hover background color
                hoverBorderColor: categoryColors.income, // Hover border color
            },
        ],
    };

    // Grafik seçenekleri
    const chartOptions = {
        responsive: true,
        plugins: {
            tooltip: {
                backgroundColor: '#333', // Tooltip background color
                titleColor: '#fff', // Tooltip title color
                bodyColor: '#fff', // Tooltip body color
                borderColor: '#888', // Tooltip border color
                borderWidth: 1, // Tooltip border thickness
            },
            legend: {
                labels: {
                    fontColor: '#374151', // Legend label color
                    fontSize: 14, // Legend font size
                    fontStyle: 'bold', // Bold font style
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, // Hide X-axis gridlines
                },
                ticks: {
                    color: '#374151', // X-axis label color
                    fontSize: 14, // Font size for X-axis labels
                    fontWeight: 'bold', // Bold X-axis labels
                },
            },
            y: {
                grid: {
                    color: '#ddd', // Y-axis grid color
                },
                ticks: {
                    color: '#374151', // Y-axis label color
                    fontSize: 14, // Font size for Y-axis labels
                    fontWeight: 'bold', // Bold Y-axis labels
                },
            },
        },
    };

    return (
        <div style={{
            width: '100%',
            height: '415px',
            padding: '1rem',
            background: '#f9f9f9', // Light background color
            borderRadius: '10px', // Rounded corners for the chart container
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
        }}>
            <Bar ref={chartRef} data={chartData} options={chartOptions} />
        </div>
    );
};

export default Chart;
