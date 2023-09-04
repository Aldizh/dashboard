import {
  Container,
  Typography
} from '@material-ui/core'

import { createTheme, ThemeProvider } from '@material-ui/core/styles'

// override the default color for primary variant
const theme = createTheme({
  palette: {
    primary: {
      main: '#440eaf'
    }
  }
})

const HeroContainer = ({ heroClass }: { heroClass: string }) => {
  return (
    <div className={heroClass}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            align="center"
            color="primary"
            gutterBottom
          >
            Sample React Projects
          </Typography>
          <Typography variant="h5" align="center" color="primary" paragraph>
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
          </div> */}
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default HeroContainer