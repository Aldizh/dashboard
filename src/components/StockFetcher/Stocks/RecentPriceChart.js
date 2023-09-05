import React from "react"
import PropTypes from "prop-types"
import { CanvasJSChart } from "canvasjs-react-charts"

import { calculateDataPoints } from "../../../utils/charts"
import InfoCard from "../InfoCard"

class Canvas extends React.Component {
  state = {
    dataPoints: [],
    earliestDataPoint: 0,
    latestDataPoint: 0
  }

  componentDidMount() {
    const { data = {}, intervalKey } = this.props
    const monthlyData = data[intervalKey]
    if (monthlyData) {
      const [
        dataPoints,
        earliestDataPoint,
        latestDataPoint
      ] = calculateDataPoints(data, intervalKey, "standard")

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
    const { search, metrics } = this.props

    const latestDate = new Date()
    const earliestDate = new Date();
    earliestDate.setDate(earliestDate.getDate() - 30);

    const options = {
      title: {
        text: `Historical monthly price data for ${search}`
      },
      data: [{
        type: "area", // Change it to "spline", "area", "column"
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
        <InfoCard metrics={metrics} />
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

Canvas.propTypes = {
  data: PropTypes.array,
  search: PropTypes.string,
  intervalKey: PropTypes.string,
  metrics: PropTypes.object
}

export default Canvas
