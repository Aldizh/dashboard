/* App.js */
import React from 'react'
import { CanvasJS, CanvasJSChart } from 'canvasjs-react-charts'

const defaultApiData = {
  'Time Series (Daily)': {}
}

const parseApiKeys = (res) => {
  if (!res['Time Series (Daily)']) return []
  return Object.keys(res['Time Series (Daily)'])
}

const parseApiValues = (res) => {
  if (!res['Time Series (Daily)']) return []
  return Object.values(res['Time Series (Daily)'])
}

class Canvas extends React.Component {
  state = {
    dataPoints: []
  }

  componentDidMount() {
    const { data = defaultApiData } = this.props
    const dataPoints = []
    const timeIntervalKeys = parseApiKeys(data)
    const timeIntervalValues = parseApiValues(data)
    for ( var i = timeIntervalKeys.length - 1; i > 0; i--) {
      dataPoints.push({
        x: new Date(timeIntervalKeys[i]),
        y: Number(timeIntervalValues[i]["4. close"])
      });
    }
    this.setState({dataPoints})
    this.chart.render();
  }

  componentWillReceiveProps() {
    const { data  = defaultApiData } = this.props
    const dataPoints = []
    const timeIntervalKeys = parseApiKeys(data)
    const timeIntervalValues = parseApiValues(data)
    for ( var i = timeIntervalKeys.length - 1; i > 0; i--) {
      dataPoints.push({
        x: new Date(timeIntervalKeys[i]),
        y: Number(timeIntervalValues[i]["4. close"])
      });
    }
    this.setState({dataPoints})
    this.chart.render();
  }

  componentWillUnmount(){
    this.chart = null
  }

	render() {
    const { data, symbol } = this.props
    const times = parseApiKeys(data)
		const options = {
      theme: "light2",
			title: {
				text: `Daily stock Price of ${symbol}`
			},
			axisY: {
				title: "Price in USD",
				prefix: "$"
      },
      axisX: {
        title: "Day",
        interVal: 1,
        interValType: "day",
        labelFormatter: function (e) {
          return CanvasJS.formatDate( e.value, "DD MMM");
        },
      },
			data: [{
        type: "spline",
        xValueType: "dateTime",
				xValueFormatString: "DD MMM YYYY",
				yValueFormatString: "$##.00",
				dataPoints: this.state.dataPoints,
      }],
      navigator: {
        slider: {
          minimum: new Date(times[0]),
          maximum: new Date(times[times.length - 1])
        }
      }
    }

    const containerProps = {
      width: "100%",
      height: "450px",
      margin: "auto"
    };

		return (
      <div>
        <CanvasJSChart containerProps={containerProps}  options={options}
          onRef={ref => this.chart = ref}
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
		);
	}
}

export default Canvas;
