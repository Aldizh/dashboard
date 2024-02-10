import { useEffect } from "react"
import { Card, Grid, Link } from "@mui/material"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"

import useDataApi from "../../../hooks/useData"
import { NEWS_SENTIMENT } from "../../../utils/consts"
import { Feed, ArticleData } from "../../../types/News"

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

  return (
    <Grid sx={{ backgroundColor: "white" }}>
      <h1>Top 5 News Articles</h1>
      {articlesLoading && <div style={{ textAlign: "center" }}>Loading...</div>}
      {feed && !articlesError &&
        feed.splice(0, 5).map(article =>
          <Card key={article.title} sx={{
            minWidth: 275,
            backgroundColor: "white"
          }}>
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
    </Grid>
  )
}

export default News
