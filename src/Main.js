import { Link } from 'react-router-dom'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@material-ui/core'

import chart from './images/chart.jpg'
import listImg from './images/list_table.png'
import expandImg from './images/expand_table.png'

const Main = ({ classes }) => (
  <main className={classes.main}>
    {/* Hero unit */}
    <Container className={classes.cardGrid} maxWidth="md">
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Sample React Projects
          </Typography>
          <Typography variant="h5" align="center" color="textPrimary" paragraph>
            These are just a few projects to showcase the versatility of react
            when it comes to building slick and efficient UI components.
          </Typography>
          {/* <div className={classes.heroButtons}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button variant="outlined" color="primary">
                  <Link to={'/'}>Profile</Link>
                </Button>
              </Grid>
            </Grid>
          </div>*/}
        </Container>
      </div>
      {/* End hero unit */}
      <Grid container spacing={4}>
        <Grid item key={1} xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={expandImg}
              title="Expandable Table"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                Expandable Table
              </Typography>
              <Typography>
                Nice expandable table to show more row specific info.
              </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <Button size="small" color="primary">
                <Link to={'/expand_table'}>View</Link>
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item key={2} xs={12} sm={6} md={4}>
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
                <Link to={'/stocks'}>View</Link>
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item key={3} xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={listImg}
              title="Filterable Table"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                Filterable List
              </Typography>
              <Typography>
                List page that supports filtering, pagination, modification and easy navigation.
              </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <Button size="small" color="primary">
                <Link to={'/filter_table'}>View</Link>
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  </main>
)

export default Main
