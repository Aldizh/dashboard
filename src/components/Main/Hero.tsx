import React, {
  Container,
  Typography
} from "@material-ui/core"

import ReactLogo from "./logo192.png"

const HeroContainer = ({ heroClass }: { heroClass: string }) => {
  return (
    <div className={heroClass}>
      <Container maxWidth="sm">
        <img width={80} height={80} src={ReactLogo} alt="Logo" />
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          component="h4"
        >
          Mini Projects
        </Typography>
        <Typography
          variant="h5"
          align="center"
          paragraph
        >
          A few projects to showcase the versatility of react in building UI apps.
        </Typography>
        {/* <div className={classes.heroButtons}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button variant="outlined">
                <Link to={'/'}>Profile</Link>
              </Button>
            </Grid>
          </Grid>
        </div> */}
      </Container>
    </div>
  )
}

export default HeroContainer