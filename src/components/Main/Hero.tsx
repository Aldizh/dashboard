import {
  Container,
  Typography
} from "@mui/material"

import ReactLogo from "./logo192.png"

const HeroContainer = () => {
  return (
    <Container sx={(theme) => ({
      color: "#5b070a",
      padding: theme.spacing(2, 0, 2),
    })}>
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
      {/* <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button variant="outlined">
            <Link to={'/'}>Profile</Link>
          </Button>
        </Grid>
      </Grid> */}
    </Container>
  )
}

export default HeroContainer