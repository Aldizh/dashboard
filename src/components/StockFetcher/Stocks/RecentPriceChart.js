import React from 'react'
import PropTypes from 'prop-types'
import { CanvasJSChart } from 'canvasjs-react-charts'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const calculateDataPoints = (symbolData) => {
  // const copy = symbolData.split(/\r?\n|\r|\n/g) // mutate reference
  const data = symbolData["Monthly Adjusted Time Series"]
  
  // time, open, high, low, close, volume
  // 2008-04-30: {1. open: '63.0000', 2. high: '84.8100', 3. low: '60.3100', 4. close: '83.4500'

  const dataPoints = []
  const timeIntervalKeys = []
  const timeIntervalValues = []

  Object.entries(data).forEach((row) => {
    // we care about the closing price for the y axis and date time for x-axis
    timeIntervalKeys.push(`${row[0]}`) // date
    timeIntervalValues.push(row[1]) // closing price
  })

  const lastIndex = timeIntervalKeys.length - 1
  const earliestDataPoint = timeIntervalValues[lastIndex]
    ? timeIntervalValues[lastIndex]['4. close']
    : 0
  const latestDataPoint = timeIntervalValues[0]
    ? timeIntervalValues[0]['4. close']
    : 0

  for (let i = lastIndex; i > 0; i--) {
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
    latestDataPoint: 0
  }

  componentDidMount() {
    const { data = '' } = this.props
    const monthlyData = data["Monthly Adjusted Time Series"]
    if (monthlyData) {
      const [dataPoints, earliestDataPoint, latestDataPoint] = calculateDataPoints(data)

      this.setState({
        dataPoints,
        earliestDataPoint,
        latestDataPoint
      })
  
      this.chart.render()
    }

  }

  componentWillUnmount () {
    this.chart = null
  }

  // Get data points for the given ticker and the benchmark (SPY)
  render () {
    const { search } = this.props

    const latestDate = new Date()
    const earliestDate = new Date();
    earliestDate.setDate(earliestDate.getDate() - 30);

    const lastUpdate = new Date().toDateString()

    const options = {
      title: {
        text: `Historical monthly price data for ${search}`
      },
      data: [{
        type: 'area', // Change it to "spline", "area", "column"
        dataPoints: this.state.dataPoints
      }],
      navigator: {
        slider: {
          minimum: earliestDate,
          maximum: latestDate
        }
      }
    }

    return (
      <>
        <Card
          variant="outlined"
          style={{
            margin: '10px auto',
            width: '70%'
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
              margin: 'auto'
            }}
            options={options}
            onRef={(ref) => (this.chart = ref)}
          />
          {/* You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods */}
        </>
      </>
    )
  }
}

Canvas.propTypes = {
  data: PropTypes.array,
  search: PropTypes.string
}

export default Canvas