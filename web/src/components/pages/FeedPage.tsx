import React from 'react'
import { useParams } from 'react-router-dom'
import ArticleGrid from '../ArticleGrid';
import { Params, } from 'react-router-dom'

interface RouteParams extends Readonly<Params<string>> {
  id: string
}

const FeedPage = () => {
  const params = useParams<RouteParams>();
  if (params.id === null) {
    throw new Error("Unreachable page - if routed here, id must be already set");
  }
  const id = Number(params.id);
  const feedsStr = localStorage.getItem('feeds') || '[]';
  const feeds = JSON.parse(feedsStr);

  let feedParams: number;
  try {
    feedParams = feeds[id];
  } catch (err) {
    if (err instanceof RangeError) {
      throw new Response(`Feed with ID=${params.id} not found`, { status: 404 });
    } 
    feedParams = 0;
  }
  return (
    <div>{feedParams}</div>
    // <ArticleGrid articles={articles} />
  )
}

export default FeedPage