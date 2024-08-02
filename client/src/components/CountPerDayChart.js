import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(CategoryScale);

function CountPerDayChart({ countPerDayData }) {

    const countPerDayOptions = {
        plugins: {
            title: {
                display: false,
                text: "Apply Count per Day",
            },
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                min: 0,
                ticks: {
                    stepSize: 1,
                    font: {
                        family: "inherit",
                        size: 12,
                        weight: "normal",
                    },
                },
            },
        }
    }

    return (
        <div className="chart-container">
            <h2>Apply Count per Day</h2>
            <Line
                data={countPerDayData}
                options={countPerDayOptions}
            />
        </div>
    )
}

export default CountPerDayChart;
