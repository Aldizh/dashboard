import React, { useEffect, useState, useRef } from "react"
import PropTypes from "prop-types"
import { CanvasJSChart } from "canvasjs-react-charts"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"

import { DIGITAL_CURRENCY_INTERVAL_KEY } from "../../../utils/consts"
import { getXData, calculateDataPoints } from "../../../utils/charts"

const INTERVAL_KEY = DIGITAL_CURRENCY_INTERVAL_KEY
const defaultApiData = { INTERVAL_KEY: {} }

const Canvas = (props) => {
  const chartRef = useRef(null)
  const [options, setOptions] = useState(null);

  const [market, setMarket] = useState(null)
  const [tickerName, setTickerName] = useState("")
  const [lastUpdate, setLastUpdate] = useState("")

  useEffect(() => {
    const { data = defaultApiData, search } = props
    const dates = getXData(data)
    const latestDate = new Date(dates[0])
    const earliestDate = new Date(dates[dates.length - 1])
    const {
      ["3. Digital Currency Name"]: tickerName,
      ["5. Market Name"]: market,
      ["6. Last Refreshed"]: updatedTimestamp
    } = data["Meta Data"] ?? {}

    setMarket(market)
    setTickerName(tickerName)
    setLastUpdate(updatedTimestamp)

    const [calculatedDataPoints] = calculateDataPoints(data, INTERVAL_KEY, "crypto")

    const options = {
      theme: "light2",
      title: {
        text: `Historical ${search} chart starting ${earliestDate.toDateString()}`
      },
      axisY: {
        title: "Price",
        prefix: "$"
      },
      data: [{
        type: "area",
        dataPoints: calculatedDataPoints
      }],
      navigator: {
        slider: {
          minimum: earliestDate,
          maximum: latestDate
        }
      },
    }

    setOptions(options)
  }, [JSON.stringify(props)]); // Why stringify? read: https://github.com/facebook/react/issues/14476

  useEffect(() => {
    chartRef.current && chartRef.current.render();
  }, [])

  return (
    <>
      <Card
        variant="outlined"
        style={{
          margin: "10px auto",
          width: "70%",
          backgroundColor: "white"
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
            Last Updated: <b>{(new Date(lastUpdate)).toLocaleString()}</b>
          </Typography>
        </CardContent>
      </Card>
      <CanvasJSChart
        containerProps={{
          width: "100%",
          height: "440px",
          margin: "auto",
        }}
        options={options}
        onRef={(ref) => (chartRef.current = ref)}
      />
    </>
  )
}

Canvas.propTypes = {
  search: PropTypes.string,
  data: PropTypes.object
}

export default Canvas