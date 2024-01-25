import React, { Fragment, useEffect } from "react"
import { Card, Link } from "@material-ui/core"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"

import useDataApi from "../../../hooks/useData"
import { NEWS_SENTIMENT } from "../../../utils/consts"
import { Feed, ArticleData } from "../../../types/News"

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
})

const News = (props: {
  search: string,
  getApiUrl: (ticker: string, seriesType: string) => string
}) => {
  const {
    search,
    getApiUrl
  } = props

  // News articles related to the search term
  const {
    data: articleData,
    isLoading: articlesLoading,
    isError: articlesError,
    updateUrl: updateArticlesUrl
  }: {
    data: ArticleData,
    isLoading: boolean,
    isError: boolean,
    updateUrl: (url: string) => void
  } = useDataApi(
    search,
    getApiUrl(search, NEWS_SENTIMENT)
  )
  const feed: Feed = articleData?.feed

  useEffect(() => {
   if (search && !articlesLoading) {
      updateArticlesUrl(getApiUrl(search, NEWS_SENTIMENT))
    }
  }, [search])

  const classes = useStyles()

  return (
    <Fragment>
      <h1>Top 5 News Articles</h1>
      {articlesLoading && <div style={{ textAlign: "center" }}>Loading...</div>}
      {feed && !articlesError &&
        feed.splice(0, 5).map(article =>
          <Card key={article.title} className={classes.root}>
            <CardContent>
              <Typography>
                <span>{article.authors[0]} : </span>
                <Link
                  color="primary"
                  href={article.url}
                  variant="inherit"
                >
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
