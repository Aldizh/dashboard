import { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { CanvasJSChart } from "canvasjs-react-charts"
import { calculateDataPoints } from "../../../utils/charts"
import InfoCard from "../InfoCard"

const RecentHistory = (props) => {
  const { search, metrics } = props;

  let earliestDate = new Date();
  earliestDate.setDate(earliestDate.getDate() - 30);

  const chartRef = useRef(null);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    const { data = {}, intervalKey } = props;
    const monthlyData = data[intervalKey];
    if (monthlyData) {
      const [
        calculatedDataPoints,
        calculatedEarliestDataPoint,
        calculatedLatestDataPoint,
      ] = calculateDataPoints(data, intervalKey, "standard");

      const newOptions = {
        theme: "light2",
        title: {
          text: `Historical monthly price data for ${search}`,
        },
        data: [
          {
            type: "area", // Change it to "spline", "area", "column"
            dataPoints: calculatedDataPoints,
          },
        ],
        navigator: {
          slider: {
            minimum: calculatedEarliestDataPoint,
            maximum: calculatedLatestDataPoint,
          },
        },
      };

      setOptions(newOptions);
    }
  }, [JSON.stringify(props)]); // Why stringify? read: https://github.com/facebook/react/issues/14476


  useEffect(() => {
    chartRef.current && chartRef.current.render();
  }, [])

  return options ? (
    <>
      <InfoCard metrics={metrics} />
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
  ) : (
    <div />
  );
};

RecentHistory.propTypes = {
  data: PropTypes.object,
  search: PropTypes.string,
  intervalKey: PropTypes.string,
  metrics: PropTypes.object
};

export default RecentHistory;