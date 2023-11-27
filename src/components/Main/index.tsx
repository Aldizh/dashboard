import React from "react"
import { Link } from "react-router-dom"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography
} from "@material-ui/core"

import chart from "../../images/chart.jpg"
import listImg from "../../images/list_table.png"
import expandImg from "../../images/expand_table.png"

import Hero from "./Hero"
import MainCards from "./Cards"

const Stocks = ({classes, key}: {classes: ClassesType, key: number}) => (
  <Grid item key={key} xs={12} sm={6} md={4}>
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={chart}
        title="Chart"
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          Stock Tracker
        </Typography>
        <Typography>
          Compare any ticker symbol against the S&P benchmark to get
          stock&apos performance.
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary">
          <Link to={"/stocks"}>View</Link>
        </Button>
      </CardActions>
    </Card>
  </Grid>
)

const FilterTable = ({classes, key, title}: {classes: ClassesType, key: number, title: string}) => (
  <Grid item key={key} xs={12} sm={6} md={4}>
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={listImg}
        title={title}
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography>
          List page that supports filtering, pagination, modification and easy navigation.
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary">
          <Link to={"/filter_table"}>View</Link>
        </Button>
      </CardActions>
    </Card>
  </Grid>
)

const ExpandTable = ({classes, key, title}: {classes: ClassesType, key: number, title: string}) => (
  <Grid item key={key} xs={12} sm={6} md={4}>
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={expandImg}
        title={title}
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography>
          Nice expandable table to show more row specific info.
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary">
          <Link to={"/expand_table"}>View</Link>
        </Button>
      </CardActions>
    </Card>
  </Grid>
)

const Main = ({ classes }: { classes: ClassesType}) => (
  <Container className={classes.cardGrid} maxWidth="md">
    <Hero heroClass={classes.heroContent} />
    <MainCards>
      <Stocks classes={classes} key={1} />
      <FilterTable classes={classes} key={2} title="Filterable List" />
      <ExpandTable classes={classes} key={3} title="Expandable Table" />
    </MainCards>
  </Container>
)

export default Main
