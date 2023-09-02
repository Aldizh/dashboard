import React from 'react'
import Typography from '@material-ui/core/Typography'
import Copyright from '../CopyRight'

const Footer = ({ classes }: {
  classes: {
    footer: string
  }
}) => (
  <footer className={classes.footer}>
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
      {' blog'}
    </Typography>
    <Copyright />
  </footer>
)

export default Footer