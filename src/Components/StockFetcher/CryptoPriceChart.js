import React from 'react'
import { CanvasJSChart } from 'canvasjs-react-charts'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import { DIGITAL_CURRENCY_INTERVAL_KEY } from '../../utils/consts'

const INTERVAL_KEY = DIGITAL_CURRENCY_INTERVAL_KEY
const defaultApiData = { INTERVAL_KEY: {} }

// Get x axis data (simple date or datetime)
const getXData = (res) => {
  if (!res[INTERVAL_KEY]) return ['2022-01-01']
  return Object.keys(res[INTERVAL_KEY])
}

// Get y axis data (price at the close of the day)
const getYData = (res) => {
  if (!res[INTERVAL_KEY]) return [{ '4b. close (USD)': 0.0 }]
  return Object.values(res[INTERVAL_KEY])
}

const calculateDataPoints = (symbolData) => {
  const dataPoints = []
  const timeIntervalKeys = getXData(symbolData) // date strings in reverse order
  const timeIntervalValues = getYData(symbolData)
  const lastIndex = timeIntervalKeys.length - 1
  const earliestDataPoint = timeIntervalValues[lastIndex]
    ? timeIntervalValues[lastIndex]['4b. close (USD)']
    : 0
  const latestDataPoint = timeIntervalValues[0]
    ? timeIntervalValues[0]['4b. close (USD)']
    : 0

  for (var i = lastIndex; i > 0; i--) {
    dataPoints.push({
      x: new Date(timeIntervalKeys[i]),
      y: Number(timeIntervalValues[i]['4b. close (USD)'])
    })
  }

  return [dataPoints, earliestDataPoint, latestDataPoint]
}

class Canvas extends React.Component {
  state = {
    dataPoints: [],
    earliestDataPoint: 0,
    latestDataPoint: 0,
  }

  componentDidMount() {
    const { data = defaultApiData } = this.props
    const [dataPoints, earliestDataPoint, latestDataPoint] = calculateDataPoints(data)

    this.setState({
      dataPoints,
      earliestDataPoint,
      latestDataPoint
    })

    this.chart.render()
  }

  componentWillUnmount() {
    this.chart = null
  }

  // Get data points for the given ticker and the benchmark (SPY)
  render() {
    const { data, search } = this.props

    // x-axis (api data is in reverse chronological order)
    const dates = getXData(data)
    const latestDate = new Date(dates[0])
    const earliestDate = new Date(dates[dates.length - 1])
    const metaData = data['Meta Data']

    const lastUpdate = metaData && metaData['6. Last Refreshed']
    const options = {
      title: {
        text: `Historical price for ${search} since ${earliestDate.toDateString()}`,
      },
      data: [{				
        type: "area", // other options ["spline", "area", "column"]
        dataPoints: this.state.dataPoints
      }],
      navigator: {
        slider: {
          minimum: earliestDate,
          maximum: latestDate,
        },
      },
    }

    return (
      <>
        <Card
          variant="outlined"
          style={{
            margin: '10px auto',
            width: '70%',
          }}
        >
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Last Updated: {lastUpdate}
            </Typography>
          </CardContent>
        </Card>
        <>
          <CanvasJSChart
            containerProps={{
              width: '100%',
              height: '450px',
              margin: 'auto',
            }}
            options={options}
            onRef={(ref) => (this.chart = ref)}
          />
          {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
        </>
      </>
    )
  }
}

export default Canvas
