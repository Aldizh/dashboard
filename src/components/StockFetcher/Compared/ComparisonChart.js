import React from "react"
import PropTypes from "prop-types"
import { CanvasJS, CanvasJSChart } from "canvasjs-react-charts"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import moment from "moment"

import { getXData, calculateDataPoints } from "../../../utils/charts"

class Comparison extends React.Component {
  state = {
    dataPoints: [],
    spyDataPoints: [],
    earliestDataPoint: 0,
    latestDataPoint: 0,
    earliestSPYDataPoint: 0,
    latestSPYDataPoint: 0
  }

  componentDidMount () {
    const { data = {}, spyData, intervalKey } = this.props

    const [dataPoints, earliestDataPoint, latestDataPoint] = calculateDataPoints(data, intervalKey, "standard")
    const [spyDataPoints, earliestSPYDataPoint, latestSPYDataPoint] = calculateDataPoints(spyData, intervalKey, "standard")

    this.setState({
      dataPoints,
      earliestDataPoint,
      latestDataPoint,
      spyDataPoints,
      earliestSPYDataPoint,
      latestSPYDataPoint
    })

    this.chart.render()
  }

  componentWillUnmount () {
    this.chart = null
  }

  // Get data points for the given ticker and the benchmark (SPY)
  render () {
    const { data, search, intervalKey } = this.props
    const {
      earliestDataPoint,
      latestDataPoint,
      earliestSPYDataPoint,
      latestSPYDataPoint
    } = this.state

    // x-axis data (not sure why but is coming in reverse chronological order)
    const timeStamps = getXData(data, intervalKey)
    const latestDate = new Date(timeStamps[0])
    const earliestDate = new Date(timeStamps[timeStamps.length - 1])

    // Helpers to get the no. of days between first and last datapoints
    const oneDay = 1000 * 60 * 60 * 24
    const diffInTime = latestDate.getTime() - earliestDate.getTime()
    const diffInDays = Math.round(diffInTime / oneDay)
    const { ["3. Last Refreshed"]: updatedTimestamp } = data["Meta Data"] || {}
    const lastRefresh = moment(updatedTimestamp).format("MMMM Do YYYY, h:mm:ss a");
    const options = {
      theme: "light2",
      animationEnabled: true,
      title: {
        text: `Historical Price Comparison: ${search} vs SPY over the last ${diffInDays} days`
      },
      axisY: {
        title: "Price (weighted to 100$)",
        prefix: "$"
      },
      axisX: {
        title: "Day",
        interVal: 1,
        interValType: "day",
        labelFormatter: function (e) {
          return CanvasJS.formatDate(e.value, "DD MMM")
        }
      },
      toolTip: {
        shared: true
      },
      data: [
        {
          type: "spline",
          name: `${search}`,
          showInLegend: true,
          xValueType: "dateTime",
          xValueFormatString: "DD MMM YYYY",
          yValueFormatString: "$##.00",
          dataPoints: this.state.dataPoints
        },
        {
          type: "spline",
          name: "SPY",
          showInLegend: true,
          xValueType: "dateTime",
          xValueFormatString: "DD MMM YYYY",
          yValueFormatString: "$##.00",
          dataPoints: this.state.spyDataPoints
        }
      ],
      navigator: {
        slider: {
          minimum: earliestDate,
          maximum: latestDate
        }
      }
    }

    const spyGrowth = earliestSPYDataPoint
      ? parseFloat(
        ((latestSPYDataPoint - earliestSPYDataPoint) / earliestSPYDataPoint) * 100
      ).toFixed(2)
      : 0.00
    const stockGrowth = earliestDataPoint
      ? parseFloat(
        ((latestDataPoint - earliestDataPoint) / earliestDataPoint) * 100
      ).toFixed(2)
      : 0.00

    return (
      <>
        <Card
          variant="outlined"
          style={{
            margin: "10px auto",
            width: "70%"
          }}
        >
          <CardContent>
            <Typography color="primary" variant="subtitle1" gutterBottom>
              SPY Growth: <b>{spyGrowth}%</b>
            </Typography>
            <Typography color="primary" variant="subtitle1" gutterBottom>
              {search} Growth: <b>{stockGrowth}%</b>
            </Typography>
            <Typography color="primary" variant="subtitle1" gutterBottom>
              Last Data Refresh: <b>{lastRefresh}</b>
            </Typography>
          </CardContent>
        </Card>
        <>
          <CanvasJSChart
            containerProps={{
              width: "100%",
              height: "450px",
              margin: "auto"
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

Comparison.propTypes = {
  data: PropTypes.object,
  spyData: PropTypes.object,
  search: PropTypes.string,
  intervalKey: PropTypes.string,
  metrics: PropTypes.object,
}

export default Comparison
