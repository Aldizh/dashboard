import React from 'react'
import PropTypes from 'prop-types'
import { CanvasJSChart } from 'canvasjs-react-charts'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import { calculateDataPoints } from '../../../utils/charts'
import { MONTHLY_INTERVAL_ADJUSTED_KEY } from '../../../utils/consts'
class Canvas extends React.Component {
  state = {
    dataPoints: [],
    earliestDataPoint: 0,
    latestDataPoint: 0
  }

  componentDidMount() {
    const { data = '' } = this.props
    const intervalKey = MONTHLY_INTERVAL_ADJUSTED_KEY
    const monthlyData = data[intervalKey]
    if (monthlyData) {
      const [dataPoints, earliestDataPoint, latestDataPoint] = calculateDataPoints(data, intervalKey, "standard")

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
