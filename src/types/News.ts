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

type ArticleData = {
  items: string,
  relevance_score_definition: string,
  sentiment_score_definition: string,
  feed: Feed
}

export type {
  Feed,
  ArticleData
}