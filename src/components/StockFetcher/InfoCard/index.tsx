import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"

import { formatToDecimal, formatDate } from "../../../utils/string"
import type { Metrics } from  "../../../types/Stocks"

const InfoCard = (props: { metrics: Metrics }) => {
  const {
    Name,
    QuarterlyRevenueGrowthYOY,
    QuarterlyEarningsGrowthYOY,
    DividendYield,
    DividendDate,
    Sector,
  } = props.metrics

  const lastUpdate = new Date().toDateString()

  return (
    <Card
      variant="outlined"
      style={{
        margin: "10px auto",
        width: "70%",
        backgroundColor: "white"
    }}
    >
      <CardContent>
        <Typography color="primary" variant="subtitle1" gutterBottom>
          Company Name: {Name}
        </Typography>
        <Typography color="primary" variant="subtitle1" gutterBottom>
          Sector: {Sector}
        </Typography>
        <Typography color="primary" variant="subtitle1" gutterBottom>
          Dividend Yield: {formatToDecimal(DividendYield)}%, Paid On: {formatDate(DividendDate)}
        </Typography>
        <Typography color="primary" variant="subtitle1" gutterBottom>
          Quarterly Revenue Growth: {formatToDecimal(QuarterlyRevenueGrowthYOY)}%
        </Typography>
        <Typography color="primary" variant="subtitle1" gutterBottom>
          Quarterly Earnings Growth: {formatToDecimal(QuarterlyEarningsGrowthYOY)}%
        </Typography>
        <Typography color="primary" variant="subtitle1" gutterBottom>
          Last Updated: <b>{lastUpdate}</b>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default InfoCard