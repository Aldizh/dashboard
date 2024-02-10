import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Paper from "@mui/material/Paper"
import BottomNavigation from "@mui/material/BottomNavigation"
import { Theme } from "@mui/material"

import Copyright from "../CopyRight"

const Footer = () => (
  <Container>
    <BottomNavigation sx={{ height: "auto", backgroundColor: "transparent" }}>
      <Container
        sx={(theme: Theme) => ({
          padding: theme.spacing(2),
        })}
      >
        <Typography variant="h6" align="center" gutterBottom>
          Thank you for visiting
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textPrimary"
          component="p"
        >
          Feel free to check out my&nbsp;
          <a
            target="_blank"
            rel="noreferrer"
            href="https://aldizhupani.medium.com/"
          >
            medium
          </a>
          {" blog"}
        </Typography>
        <center><Copyright /></center>
      </Container>
    </BottomNavigation>
  </Container>
)

export default Footer