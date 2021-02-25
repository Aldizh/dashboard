/* App.js */
import React from 'react'
import { CanvasJS, CanvasJSChart } from 'canvasjs-react-charts'

const defaultApiData = {
  'Time Series (Daily)': {}
}

// price calculation rebased to $100 for comparison
const getBaseWeightedPrice = (price, startingPrice) => Number((100 / startingPrice) * price)

// Get x axis data (simple date or datetime)
const getXData = (res) => {
  if (!res['Time Series (Daily)']) return ['2021-01-01']
  return Object.keys(res['Time Series (Daily)'])
}

// Get y axis data (price corresponding to it)
const getYData = (res) => {
  if (!res['Time Series (Daily)']) return [{"4.close": 0.00}]
  return Object.values(res['Time Series (Daily)'])
}

class Canvas extends React.Component {
  state = {
    dataPoints: [],
    spyDataPoints: []
  }

  componentDidMount() {
    const { data = defaultApiData, spyData } = this.props
    const dataPoints = []
    const timeIntervalKeys = getXData(data)
    const timeIntervalValues = getYData(data)
    const lastIndex = timeIntervalKeys.length - 1
    const earliestDataPoint = timeIntervalValues[lastIndex] ? timeIntervalValues[lastIndex]["4. close"] : 0
    for ( var i = lastIndex; i > 0; i--) {
      dataPoints.push({
        x: new Date(timeIntervalKeys[i]),
        y: getBaseWeightedPrice(timeIntervalValues[i]["4. close"], earliestDataPoint)
      });
    }

    const spyDataPoints = []
    const spyTimeIntervalKeys = getXData(spyData)
    const spyTimeIntervalValues = getYData(spyData)
    const earliestSPYDataPoint =  spyTimeIntervalValues[lastIndex] ? spyTimeIntervalValues[lastIndex]["4. close"] : 0
    for ( var i = lastIndex; i > 0; i--) {
      spyDataPoints.push({
        x: new Date(spyTimeIntervalKeys[i]),
        y: getBaseWeightedPrice(spyTimeIntervalValues[i]["4. close"], earliestSPYDataPoint)
      });
    }
    this.setState({dataPoints, spyDataPoints})

    this.chart.render();
  }

  componentWillUnmount(){
    this.chart = null
  }

	render() {
    const { data, search } = this.props
    const times = getXData(data)
		const options = {
      theme: "light2",
      animationEnabled: true,
			title: {
				text: `Daily stock Price of ${search} vs SPY`
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
          name: 'SPY',
					showInLegend: true,
          xValueType: "dateTime",
          xValueFormatString: "DD MMM YYYY",
          yValueFormatString: "$##.00",
          dataPoints: this.state.spyDataPoints,
        }
      ],
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
