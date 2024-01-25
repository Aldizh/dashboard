import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { CanvasJS, CanvasJSChart } from "canvasjs-react-charts";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { getXData, calculateDataPoints } from "../../../utils/charts"

const Comparison = (props) => {
  const { data = {}, spyData = {}, search, intervalKey } = props

  const chartRef = useRef(null);
  const [options, setOptions] = useState(null);
  const [lastRefresh, setLastRefresh] = useState("")

  const [spyGrowth, setSpyGrowth] = useState(0)
  const [stockGrowth, setStockGrowth] = useState(0)

  useEffect(() => {
    const oneDay = 1000 * 60 * 60 * 24;
    const timeStamps = getXData(data, intervalKey)
    const latestDate = new Date(timeStamps[0])
    const earliestDate = new Date(timeStamps[timeStamps.length - 1])
    const diffInTime = latestDate.getTime() - earliestDate.getTime();
    const diffInDays = Math.round(diffInTime / oneDay);

    const [dataPoints, earliestDataPoint, latestDataPoint] = calculateDataPoints(
      data,
      intervalKey,
      "standard"
    );

    const [spyDataPoints, earliestSPYDataPoint, latestSPYDataPoint] = calculateDataPoints(spyData, intervalKey, "standard")

    setSpyGrowth(earliestSPYDataPoint
      ? parseFloat(
        ((latestSPYDataPoint - earliestSPYDataPoint) / earliestSPYDataPoint) * 100
      ).toFixed(2)
      : 0.00)

    setStockGrowth(earliestDataPoint
      ? parseFloat(
        ((latestDataPoint - earliestDataPoint) / earliestDataPoint) * 100
      ).toFixed(2)
      : 0.00)

    const pastMonthData = data[intervalKey];
    if (pastMonthData) {
      const updatedTimestamp = data["Meta Data"]["3. Last Refreshed"];  
      const options = {
        theme: "light2", // alternatives: "light1", "dark1", "dark2"
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
            return CanvasJS.formatDate(e.value, "DD MMM");
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
            dataPoints: dataPoints
          },
          {
            type: "spline",
            name: "SPY",
            showInLegend: true,
            xValueType: "dateTime",
            xValueFormatString: "DD MMM YYYY",
            yValueFormatString: "$##.00",
            dataPoints: spyDataPoints
          }
        ],
        navigator: {
          slider: {
            minimum: earliestDate,
            maximum: latestDate
          }
        }
      };

      setLastRefresh(new Date(updatedTimestamp).toLocaleString());
      setOptions(options)
    }

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
      {options ?
        <CanvasJSChart
          containerProps={{
            width: "100%",
            height: "440px",
            margin: "auto"
          }}
          options={options}
          onRef={(ref) => (chartRef.current = ref)}
        /> : <div />}
      </>
    </>
  );
};

Comparison.propTypes = {
  data: PropTypes.object,
  spyData: PropTypes.object,
  search: PropTypes.string,
  intervalKey: PropTypes.string,
  metrics: PropTypes.object
};

export default Comparison;