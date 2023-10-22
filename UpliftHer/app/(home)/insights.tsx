import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { LineChart, PieChart, } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { Button, Icon } from "react-native-paper";
import { useEffect, useState } from "react";
import { mainColor, secondaryColor } from "../../constants/Colors";
import { MoodTrackingApi } from "../../services/mood-tracking-service";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import processRequest from "../../helpers/processRequest";
import { IMoodEntry } from "../../services/interfaces/IMoodEntry";
import IMood from "../../services/interfaces/IMood";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundColor: "#ffc67315",
  backgroundGradientFrom: secondaryColor,
  backgroundGradientTo: "#ffc673",
  useShadowColorFromDataset: false,
  color: () => "#ffc673",
  labelColor: (opacity = 1) => "#000",
  style: {
    borderRadius: 16,
  },
};

const InsightsScreen = () => {
  const [interval, setInterval] = useState<"week" | "month">("week");
  const [pieChartData, setPieChartData] = useState<IPieChartData[]>([]);
  const [lineChartData, setLineChartData] = useState<ILineChartData>({ datasets: [], legend: [], labels: [] });
  const [isLoading, setIsLoading] = useState(false);

  const getInterval: () => { from: Date, to: Date } = () => {
    const currentDate = moment();
    if (interval === "week") {
      const weekStart = currentDate.clone().startOf('isoWeek');
      const weekEnd = currentDate.clone().endOf('isoWeek');
      return { from: weekStart.toDate(), to: weekEnd.toDate() };
    } else {
      const monthStart = currentDate.clone().startOf('month');
      const monthEnd = currentDate.clone().endOf('month');
      return { from: monthStart.toDate(), to: monthEnd.toDate() };
    }
  }

  function prepareAndSetPieChartData(moods: IMood[], apiMoods: IMoodEntry[]) {
    const pieChartData = moods.map(m => {
      const count = apiMoods.map(val => val.moodSelection).flat().filter(x => x === m.text).length;

      return {
        name: m.text,
        count: count,
        color: m.color,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      };
    }, [interval]);

    setPieChartData(pieChartData);
  }

  function prepareAndSetLineChartData(moods: IMood[], apiMoods: IMoodEntry[], dateRange: { from: Date, to: Date }) {
    const labels: string[] = [];

    let currentDate = moment(dateRange.from);
    const stopDate = moment(dateRange.to);
    while (currentDate <= stopDate) {
      labels.push(currentDate.format("DD/MM/YYYY"));
      currentDate = moment(currentDate).add((interval === "week" ? 1 : 7), 'days');
    }

    const moodsGroup = MoodTrackingApi.getMoods().filter(m => m.text === "Happy" || m.text === "Very Sad" || m.text === "Anxious");
    // Calc count of each different moods for every day in the interval
    const dataSets: ILineChartDataSet[] = moodsGroup.map(m => {
      const dataSetValues: number[] = [];
      for (let i = 0; i < labels.length; i++) {
        const date1 = moment(labels[i], "DD/MM/YYYY");
        const date2 = i < labels.length - 1 ? moment(labels[i + 1], "DD/MM/YYYY") : moment(dateRange.to);
        const data = apiMoods.filter(val => moment(val.date, "YYYY-MM-DD").isBetween(date1, date2) && val.moodSelection.includes(m.text)).length;
        console.log(m.text, data);
        dataSetValues.push(data);
      }
      console.log(m.text, dataSetValues);

      return {
        data: dataSetValues,
        color: () => m.color,
        strokeWidth: 2
      };
    });

    const lineChartData = {
      labels: labels,
      datasets: dataSets,
      legend: moodsGroup.map(m => m.text)
    };

    setLineChartData(lineChartData);
  }

  useEffect(() => {
    const fetchData = async () => {
      const dateRange = getInterval();
      let apiMoods: IMoodEntry[] = [];

      await processRequest({
        loading: setIsLoading,
        request: () => MoodTrackingApi.getMoodEntriesForIntervalAsync(dateRange.from, dateRange.to),
        onSuccess: function (data: IMoodEntry[] | null): void {
          apiMoods = data ?? [];
        },
        onError: function (error: string): void {
          apiMoods = MoodTrackingApi.getMockData(dateRange.from, dateRange.to) // data ?? [];
        }
      });

      const moods = MoodTrackingApi.getMoods();
      prepareAndSetLineChartData(moods, apiMoods, dateRange);
      prepareAndSetPieChartData(moods, apiMoods);
    }

    fetchData().catch(console.error);
  }, [interval]);

  return (
    <ScrollView contentContainerStyle={{ minHeight: "100%" }}>
      <View style={styles.container}>
        {
          pieChartData.every(v => v.count === 0) ?
            <View style={styles.noDataContainer}>
              {isLoading && <ActivityIndicator size={48} />}
              <Icon source={"chart-line"} size={64} color={secondaryColor} />
              <Text style={styles.noDataText}>
                Start entering data through the tracker to view weekly or monthly graphs and insights about your mood.
              </Text>
            </View>
            :
            <>
              <View style={{ display: "flex", justifyContent: "center", flexDirection: "row", paddingVertical: 10 }}>
                <Button mode={interval !== "week" ? "text" : "contained-tonal"} onPress={() => setInterval("week")} >
                  Week
                </Button>
                <Button mode={interval !== "month" ? "text" : "contained-tonal"} onPress={() => setInterval("month")}>
                  Month
                </Button>

                <ActivityIndicator animating={isLoading} />
              </View>

              {lineChartData.datasets.length > 0 &&
                <LineChart
                  data={lineChartData}
                  width={screenWidth}
                  height={250}
                  chartConfig={chartConfig}
                />
              }
              <PieChart
                data={pieChartData}
                width={screenWidth}
                height={300}
                chartConfig={chartConfig}
                accessor={"count"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[10, 10]}
                absolute
              />
            </>
        }

      </View>
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    height: "100%"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: '100%'
  },
  noDataText: {
    textAlign: 'center',
    paddingVertical: 25,
    fontSize: 26,
    color: mainColor
  },
});

export default InsightsScreen;