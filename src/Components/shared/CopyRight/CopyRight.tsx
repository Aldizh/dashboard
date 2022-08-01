import Typography from '@material-ui/core/Typography'
import { ReactElement } from 'react'

const Copyright = (): ReactElement => {
  return (
    <>
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
      >
        {'Copyright © '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://aldizh.github.io/dashboard"
        >
          Dashboard&nbsp;
        </a>
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </>
  )
}

export default Copyright