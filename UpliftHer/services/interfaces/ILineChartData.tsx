
interface ILineChartData {
    labels: string[];
    datasets: ILineChartDataSet[];
    legend: string[];
}

interface IBarChartData {
    labels: string[];
    data: number[][];
    legend: string[];
    barColors: string[];
}