import React, { Fragment } from 'react'
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const News = (props) => {
  const {
    feed,
    articlesLoading,
    articlesError
  } = props
  console.log('feed...', feed && feed[0])
  console.log('feed type...', typeof feed)

  const classes = useStyles();

  return (
    feed ? <Fragment>
      <h1>Top 5 News Articles</h1>
      {feed.splice(0, 5).map(article =>
        <Card className={classes.root}>
          <CardContent>
            <Typography>{article.authors[0]}: {article.summary}</Typography>
          </CardContent>
        </Card>
      )}
    </Fragment> : <div />
  )
}

export default News