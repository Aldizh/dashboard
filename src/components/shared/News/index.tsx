import React, { Fragment, useEffect } from 'react'
import { Card, Link } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import useDataApi from '../../../hooks/useData'
import { NEWS_SENTIMENT } from '../../../utils/consts'

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

type Feed = [{
  authors: [string],
  banner_image: string,
  category_within_source: string,
  overall_sentiment_label: string,
  overall_sentiment_score: number,
  source: string,
  source_domain: string,
  summary: string,
  ticker_sentiment: [{
    relevance_score: string,
    ticker: string,
    ticker_sentiment_label: string,
    ticker_sentiment_score: string
  }],
  time_published: string,
  topics: [{
    topic: string,
    relevance_score: string
  }],
  title: string,
  url: string
}]

const News = (props: {
  symbol: string
  search: string,
  getApiUrl: (symbol: string, seriesType: string) => string
}) => {
  const {
    search,
    symbol,
    getApiUrl
  } = props

  // News articles related to the search term
  const {
    data: articleData,
    isLoading: articlesLoading,
    isError: articlesError,
    updateUrl: updateArticlesUrl
  } = useDataApi(
    search,
    getApiUrl(search, NEWS_SENTIMENT)
  )
  const feed: Feed = articleData?.data?.feed

  useEffect(() => {
   if (search && !articlesLoading) {
      updateArticlesUrl(getApiUrl(search, NEWS_SENTIMENT))
    }
  }, [search])

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
