import React from "react";

import { ArticleItem } from "./ArticleItem";
import { Article } from "../models/Article";
import Masonry from "react-responsive-masonry";

type ArticleListProps = {
  articles: Article[];
};

export const ArticleGrid: React.FC<ArticleListProps> = ({ articles }) => {
  return articles.length > 0 ? (
    <Masonry columnsCount={5}>
      {articles.map((article) => {
        return <ArticleItem article={article} />;
      })}
    </Masonry>
  ) : (
    <div>No articles</div>
  ); // TODO: show large centered badge
};

const styles = {
  listContainer: {
    flex: 1,
    justifyContent: "center",
  },
};

export default ArticleGrid;
