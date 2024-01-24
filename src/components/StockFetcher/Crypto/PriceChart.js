import React from "react"
import PropTypes from "prop-types"
import { CanvasJSChart } from "canvasjs-react-charts"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import moment from "moment"

import { DIGITAL_CURRENCY_INTERVAL_KEY } from "../../../utils/consts"
import { getXData, calculateDataPoints } from "../../../utils/charts"

const INTERVAL_KEY = DIGITAL_CURRENCY_INTERVAL_KEY
const defaultApiData = { INTERVAL_KEY: {} }

class Canvas extends React.Component {
  state = {
    dataPoints: [],
    earliestDataPoint: 0,
    latestDataPoint: 0
  }

  componentDidMount () {
    const { data = defaultApiData } = this.props
    const [dataPoints, earliestDataPoint, latestDataPoint] = calculateDataPoints(data, INTERVAL_KEY, "crypto")

    this.setState({
      dataPoints,
      earliestDataPoint,
      latestDataPoint
    })

    this.chart.render()
  }

  componentWillUnmount() {
    this.chart = null
    this.setState({
      dataPoints: [],
      earliestDataPoint: 0,
      latestDataPoint: 0
    })
  }

  // Get data points for the given ticker and the benchmark (SPY)
  render () {
    const { data, search } = this.props

    // x-axis (api data is in reverse chronological order)
    const dates = getXData(data)
    const latestDate = new Date(dates[0])
    const earliestDate = new Date(dates[dates.length - 1])
    const {
      ["3. Digital Currency Name"]: tickerName,
      ["5. Market Name"]: market,
      ["6. Last Refreshed"]: updatedTimestamp
    } = data["Meta Data"] || {}
    const lastUpdate = moment(updatedTimestamp).format("MMMM Do YYYY, h:mm:ss a");
    const options = {
      title: {
        text: `Historical price for ${search} since ${earliestDate.toDateString()}`
      },
      data: [{
        type: "area", // other options ["spline", "area", "column"]
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
            margin: "10px auto",
            width: "70%"
          }}
        >
          <CardContent>
            <Typography color="primary" variant="subtitle1">
              Asset: <b>{tickerName}</b>
            </Typography>
            <Typography color="primary" variant="subtitle1">
              Trading in market: <b>{market}</b>
            </Typography>
            <Typography color="primary" variant="subtitle1" gutterBottom>
              Last Updated: <b>{lastUpdate}</b>
            </Typography>
          </CardContent>
        </Card>
        <CanvasJSChart
          containerProps={{
            width: "100%",
            height: "440px",
            margin: "auto"
          }}
          options={options}
          onRef={(ref) => (this.chart = ref)}
        />
        {/* You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods */}
      </>
    )
  }
}

Canvas.propTypes = {
  search: PropTypes.string,
  data: PropTypes.object
}

export default Canvas
