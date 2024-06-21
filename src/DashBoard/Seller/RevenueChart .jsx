
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const RevenueChart = ({ totalRevenue, pendingTotal }) => {
    const data = {
        labels: ['Total Revenue', 'Pending Total'],
        datasets: [
            {
                label: 'Amount in USD',
                data: [totalRevenue, pendingTotal],
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return <Bar data={data} options={options} />;
};

export default RevenueChart;
