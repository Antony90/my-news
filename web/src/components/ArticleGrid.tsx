import React from "react";

import { ArticleItem } from "./ArticleItem";
import { Article } from "../models/Article";
import Masonry from 'react-responsive-masonry';
import { useViewportSize } from "@mantine/hooks";


type ArticleListProps = {
  articles: Article[];
};

export const ArticleGrid: React.FC<ArticleListProps> = ({ articles }) => {
  const { width } = useViewportSize();
  return articles.length > 0 ? (
    <Masonry columnsCount={width > 1800 ? 5 : width > 1200 ? 4 : 3} >
      {articles.map((article) => {
        return <ArticleItem article={article} />;
      })}
    </Masonry>
  ) : (
    <div>No articles</div>
  ); // TODO: show large centered badge
};

export default ArticleGrid;

