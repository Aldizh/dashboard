import { Link, Outlet } from "react-router-dom"
import ParticlesBg from "particles-bg"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography
} from "@mui/material"

import chart from "../../images/chart.jpg"
import listImg from "../../images/list_table.png"
import expandImg from "../../images/expand_table.png"
import "./styles.css"

import Hero from "./Hero"
import MainCards from "./Cards"

const Stocks = () => (
  <Card sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column"
  }}>
    <CardMedia
      sx={{
        paddingTop: "56.25%" // 16:9
      }}
      image={chart}
      title="Chart"
    />
    <CardContent
      sx={{
        flexGrow: 1
      }}
    >
      <Typography gutterBottom variant="h5" component="h2">
        Stock Tracker
      </Typography>
      <Typography>
        Compare any ticker symbol against the S&P benchmark to get
        that asset&apos;s performance.
      </Typography>
    </CardContent>
    <CardActions sx={{
        display: "flex",
        justifyContent: "center"
    }}>
      <Button size="small" color="primary">
        <Link to={"/stocks"}>View</Link>
      </Button>
    </CardActions>
  </Card>
)

const FilterTable = ({title}: {title: string}) => (
  <Card sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column"
    }}>
    <CardMedia
      sx={{
        paddingTop: "56.25%" // 16:9
      }}
      image={listImg}
      title={title}
    />
    <CardContent
      sx={{
        flexGrow: 1
      }}
    >
      <Typography gutterBottom variant="h5" component="h2">
        {title}
      </Typography>
      <Typography>
        List page that supports filtering, pagination, modification and easy navigation.
      </Typography>
    </CardContent>
      <CardActions sx={{
          display: "flex",
          justifyContent: "center"
      }}>
      <Button size="small" color="primary">
        <Link to={"/filter_table"}>View</Link>
      </Button>
    </CardActions>
  </Card>
)

const ExpandTable = ({title}: {title: string}) => (
  <Card sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column"
    }}>
    <CardMedia
      sx={{
        paddingTop: "56.25%" // 16:9
      }}
      image={expandImg}
      title={title}
    />
    <CardContent
      sx={{
        flexGrow: 1
      }}
    >
      <Typography gutterBottom variant="h5" component="h2">
        {title}
      </Typography>
      <Typography>
        Nice expandable table to show more row specific info.
      </Typography>
    </CardContent>
    <CardActions sx={{
          display: "flex",
          justifyContent: "center"
      }}>
      <Button size="small" color="primary">
        <Link to={"/expand_table"}>View</Link>
      </Button>
    </CardActions>
  </Card>
)

const Main = () => (
  <>
    <Container>
      <Hero />
      <MainCards>
        <Stocks />
        <FilterTable title="Filterable List" />
        <ExpandTable title="Expandable Table" />
      </MainCards>
    </Container>
    <ParticlesBg type="circle" bg={true} />
    <Outlet />
  </>
)

export default Main
