import React from 'react'
import { CanvasJSChart } from 'canvasjs-react-charts'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const INTERVAL_KEY = 'Time Series (Daily)'
const defaultApiData = { INTERVAL_KEY: {} }

// Get x axis data (simple date or datetime)
const getXData = (res) => {
  if (!res[INTERVAL_KEY]) return ['2022-01-01']
  return Object.keys(res[INTERVAL_KEY])
}

// Get y axis data (price corresponding to it)
const getYData = (res) => {
  if (!res[INTERVAL_KEY]) return [{ '4.close': 0.0 }]
  return Object.values(res[INTERVAL_KEY])
}

const calculateDataPoints = (symbolData) => {
  const dataPoints = []
  const timeIntervalKeys = getXData(symbolData) // date strings in reverse order
  const timeIntervalValues = getYData(symbolData)
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
      y: Number(timeIntervalValues[i]['4. close'])
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

    // x-axis data (not sure why but is coming in reverse chronological order)
    const timeStamps = getXData(data)
    const latestDate = new Date(timeStamps[0])
    const earliestDate = new Date(timeStamps[timeStamps.length - 1])

    const lastUpdate =
      data['Meta Data'] && data['Meta Data']['3. Last Refreshed']
    const options = {
      title: {
        text: `Historical price for ${search} since ${earliestDate.toDateString()}`,
      },
      data: [{				
        type: "area", // Change it to "spline", "area", "column"
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
