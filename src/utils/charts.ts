import { ChartData, chartKeys } from "../types"

// Get price calculation based on initial investment ($100 for simplicity)
const getBaseWeightedPrice = (price: number, startingPrice: number) =>
  Number((100 / startingPrice) * price)

// Get x axis data (simple date or datetime)
const getXData = (res: ChartData, INTERVAL_KEY: chartKeys): string[] => {
  const resKeys: ChartData[chartKeys] = res[INTERVAL_KEY]
  if (!resKeys) return ['2022-01-01']
  return Object.keys(resKeys)
}

// Get y axis data (price at the close of the day)
const getYData = (res: ChartData, INTERVAL_KEY: chartKeys) => {
  const resData: ChartData[chartKeys] = res[INTERVAL_KEY]
  if (!resData) return [{ '4b. close (USD)': 0.0 }]
  return Object.values(resData)
}

const calculateDataPoints = (symbolData: ChartData, INTERVAL_KEY: chartKeys, type: string) => {
  const dataPoints: Array<{
    x: Date,
    y: number
  }> = []
  const closingAttribute = type === "standard" ? '4. close' : '4b. close (USD)'
  const timeIntervalKeys = getXData(symbolData, INTERVAL_KEY) // date strings in reverse order
  const timeIntervalValues: any[] = getYData(symbolData, INTERVAL_KEY)
  const lastIndex = timeIntervalKeys.length - 1
  const earliestDataPoint = timeIntervalValues[lastIndex]
    ? timeIntervalValues[lastIndex][closingAttribute]
    : 0
  const latestDataPoint = timeIntervalValues[0]
    ? timeIntervalValues[0][closingAttribute]
    : 0

  for (let i = lastIndex; i > 0; i--) {
    dataPoints.push({
      x: new Date(timeIntervalKeys[i]),
      y: type === "standard" ? getBaseWeightedPrice(
        timeIntervalValues[i] ? timeIntervalValues[i][closingAttribute] : '0.00',
        earliestDataPoint
      ) : Number(timeIntervalValues[i][closingAttribute])
    })
  }

  return [dataPoints, earliestDataPoint, latestDataPoint]
}

export { getXData, calculateDataPoints }