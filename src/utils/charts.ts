import { ChartData, chartKeyTypes } from "../types";

type ValueOfChartKeys = chartKeyTypes[keyof chartKeyTypes]; // get the values of the map

// Get price calculation based on initial investment ($100 for simplicity)
const getBaseWeightedPrice = (price: number, startingPrice: number): number =>
  Number((100 / startingPrice) * price);

// Get x axis data (simple date or datetime)
const getXData = (res: ChartData, INTERVAL_KEY: ValueOfChartKeys): string[] => {
  return res[INTERVAL_KEY] ? Object.keys(res[INTERVAL_KEY]) : ["2023-01-01"];
};

// Get y axis data (price at the close of the day)
const getYData = (res: ChartData, INTERVAL_KEY: ValueOfChartKeys): any[] => {
  return res[INTERVAL_KEY] ? Object.values(res[INTERVAL_KEY]) : [{ "4b. close (USD)": 0.0 }];
};

const calculateDataPoints = (
  symbolData: ChartData,
  INTERVAL_KEY: ValueOfChartKeys,
  type: string
): [Array<{ x: Date; y: number }>, number, number] => {
  const dataPoints: Array<{ x: Date; y: number }> = [];
  const closingAttribute = "4. close";
  const timeIntervalKeys = getXData(symbolData, INTERVAL_KEY); // date strings in reverse order
  const timeIntervalValues: any[] = getYData(symbolData, INTERVAL_KEY);
  const lastIndex = timeIntervalKeys.length - 1;
  const earliestDataPoint = timeIntervalValues[lastIndex]
    ? timeIntervalValues[lastIndex][closingAttribute]
    : 0;
  const latestDataPoint = timeIntervalValues[0]
    ? timeIntervalValues[0][closingAttribute]
    : 0;

  for (let i = lastIndex; i > 0; i--) {
    dataPoints.push({
      x: new Date(timeIntervalKeys[i]),
      y:
        type === "standard"
          ? getBaseWeightedPrice(
              timeIntervalValues[i] ? timeIntervalValues[i][closingAttribute] : 0,
              earliestDataPoint
            )
          : Number(timeIntervalValues[i][closingAttribute]),
    });
  }

  return [dataPoints, earliestDataPoint, latestDataPoint];
};

export { getXData, calculateDataPoints };