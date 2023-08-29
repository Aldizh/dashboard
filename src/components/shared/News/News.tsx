import React, { Fragment } from 'react'
import { Card, Link } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
})

const News = (props: {
  feed: Array<any>
  symbol: string
  articlesLoading: boolean
  articlesError: object | null
}) => {
  const {
    feed,
    symbol,
    articlesLoading,
    articlesError
  } = props

  const classes = useStyles()

  return (
    <Fragment>
      <h1>Top 5 News Articles</h1>
      {articlesLoading && <div style={{ textAlign: 'center' }}>Loading...</div>}
      {feed && symbol && !articlesError &&
        feed.splice(0, 5).map(article =>
          <Card key={article.title} className={classes.root}>
            <CardContent>
              <Typography>{article.authors[0]}
                <Link
                  style={{
                    padding: 5
                  }}
                  href={article.url}
                  variant="inherit">
                  {article.title}
                </Link>
              </Typography>
            </CardContent>
          </Card>
        )
      }
    </Fragment>
  )
}

export default News
