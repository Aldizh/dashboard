/* App.js */
import React from 'react'
import { CanvasJS, CanvasJSChart } from 'canvasjs-react-charts'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const INTERVAL_KEY = 'Time Series (15min)'
const defaultApiData = { INTERVAL_KEY: {} }

// Get price calculation based on initial investment ($100 for simplicity)
const getBaseWeightedPrice = (price, startingPrice) =>
  Number((100 / startingPrice) * price)

// Get x axis data (simple date or datetime)
const getXData = (res) => {
  if (!res[INTERVAL_KEY]) return ['2021-01-01']
  return Object.keys(res[INTERVAL_KEY])
}

// Get y axis data (price corresponding to it)
const getYData = (res) => {
  if (!res[INTERVAL_KEY]) return [{ '4.close': 0.0 }]
  return Object.values(res[INTERVAL_KEY])
}

class Canvas extends React.Component {
  state = {
    dataPoints: [],
    spyDataPoints: [],
    earliestDataPoint: 0,
    latestDataPoint: 0,
    earliestSPYDataPoint: 0,
    latestSPYDataPoint: 0
  }

  componentDidMount() {
    const { data = defaultApiData, spyData } = this.props
    const dataPoints = []
    const timeIntervalKeys = getXData(data) // date strings in reverse order
    const timeIntervalValues = getYData(data)
    const lastIndex = timeIntervalKeys.length - 1
    const earliestDataPoint = timeIntervalValues[lastIndex]
      ? timeIntervalValues[lastIndex]['4. close']
      : 0
    const latestDataPoint = timeIntervalValues[0]
      ? timeIntervalValues[0]['4. close']
      : 0

    for (var i = lastIndex; i > 0; i--) {
      dataPoints.push({
        x: new Date(timeIntervalKeys[i]),
        y: getBaseWeightedPrice(
          timeIntervalValues[i] ? timeIntervalValues[i]['4. close'] : "0.00",
          earliestDataPoint
        ),
      })
    }

    const spyDataPoints = []
    const spyTimeIntervalKeys = getXData(spyData) // date strings in reverse order
    const spyTimeIntervalValues = getYData(spyData)
    const earliestSPYDataPoint = spyTimeIntervalValues[lastIndex]
      ? spyTimeIntervalValues[lastIndex]['4. close']
      : 0
    const latestSPYDataPoint = spyTimeIntervalValues[0]
      ? spyTimeIntervalValues[0]['4. close']
      : 0
    for (var i = lastIndex; i > 0; i--) {
      spyDataPoints.push({
        x: new Date(spyTimeIntervalKeys[i]),
        y: getBaseWeightedPrice(
          spyTimeIntervalValues[i]['4. close'],
          earliestSPYDataPoint
        ),
      })
    }
    this.setState({
      dataPoints,
      spyDataPoints,
      earliestDataPoint,
      latestDataPoint,
      earliestSPYDataPoint,
      latestSPYDataPoint
    })

    this.chart.render()
  }

  componentWillUnmount() {
    this.chart = null
  }

  // Get data points for the given ticker and the benchmark (SPY)
  render() {
    const { data, search, symbol } = this.props
    const { 
      earliestDataPoint,
      latestDataPoint,
      earliestSPYDataPoint,
      latestSPYDataPoint
    } = this.state

    // x-axis data (not sure why but is coming in reverse chronological order)
    const timeStamps = getXData(data)
    const latestDate =  new Date(timeStamps[0])
    const earliestDate = new Date(timeStamps[timeStamps.length - 1])
    
    // Helpers to get the no. of days between first and last datapoints
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInTime = latestDate.getTime() - earliestDate.getTime();
    const diffInDays = Math.round(diffInTime / oneDay);
   
    const lastUpdate = data["Meta Data"] && data["Meta Data"]["3. Last Refreshed"]
    const options = {
      theme: 'light2',
      animationEnabled: true,
      title: {
        text: `Historical Price Comparison: ${search} vs SPY over the last ${diffInDays} days`,
      },
      axisY: {
        title: 'Price (weighted to 100$)',
        prefix: '$',
      },
      axisX: {
        title: 'Day',
        interVal: 1,
        interValType: 'day',
        labelFormatter: function (e) {
          return CanvasJS.formatDate(e.value, 'DD MMM')
        },
      },
      toolTip: {
        shared: true,
      },
      data: [
        {
          type: 'spline',
          name: `${search}`,
          showInLegend: true,
          xValueType: 'dateTime',
          xValueFormatString: 'DD MMM YYYY',
          yValueFormatString: '$##.00',
          dataPoints: this.state.dataPoints,
        },
        {
          type: 'spline',
          name: 'SPY',
          showInLegend: true,
          xValueType: 'dateTime',
          xValueFormatString: 'DD MMM YYYY',
          yValueFormatString: '$##.00',
          dataPoints: this.state.spyDataPoints,
        },
      ],
      navigator: {
        slider: {
          minimum: earliestDate,
          maximum: latestDate,
        },
      },
    }

    const containerProps = {
      width: '100%',
      height: '450px',
      margin: 'auto',
    }

    const metricsContainer = {
      "background-color": "#f9b79f"
    }

    const spyGrowth = parseFloat((latestSPYDataPoint-earliestSPYDataPoint)/earliestSPYDataPoint * 100).toFixed(2)
    const stockGrowth = parseFloat((latestDataPoint-earliestDataPoint)/earliestDataPoint * 100).toFixed(2)

    return (
      <>
        <Card variant="outlined"
          style={{
            margin: "10px auto",
            width: "70%"
        }}>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              SPY Growth: {spyGrowth}%
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {search} Growth: {stockGrowth}%
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Last Updated: {lastUpdate}
            </Typography>
          </CardContent>
        </Card>
        <div>
          <CanvasJSChart
            containerProps={containerProps}
            options={options}
            onRef={(ref) => (this.chart = ref)}
          />
          {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
        </div>
      </>
    )
  }
}

export default Canvas
