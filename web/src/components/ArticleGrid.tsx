import React from "react";

import { ArticleItem } from "./ArticleItem";
import { Article } from "../models/Article";
import { Grid } from "@mantine/core";
import Masonry, { MasonryProps } from 'react-responsive-masonry';
type ArticleListProps = {
  articles: Article[];
};

const mapTitleLenColSize = (len: number) => {
  if (len > 70) return 6;
  if (len > 40) return 4;
  if (len > 30) return 3;
}

const shortenArticleTitle = (title: string) => {
  return title.length > 80 ? title.substring(0, 50) + '...' : title;
}

export const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  return (
    <Masonry columnsCount={5}>
      {articles.map(article => {
        // Cap length of title before determining Grid Item columns
        const title = shortenArticleTitle(article.title);
        const _article = {... article, title }
        return <ArticleItem article={article}/>
      })}
    </Masonry>
    // <Grid columns={24}>
    //   {articles.map(article => {
    //     // Cap length of title before determining Grid Item columns
    //     const title = shortenArticleTitle(article.title);
    //     const _article = {... article, title }
    //     return (
    //       <Grid.Col span={mapTitleLenColSize(title.length)}>
    //         <ArticleItem article={_article}/>
    //       </Grid.Col>
    //     );
    //   })}
    // </Grid>
  )
};

const styles = {
  listContainer: {
    flex: 1,
    justifyContent: "center",
  },
};

export default ArticleList;
