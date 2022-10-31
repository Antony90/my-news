import React from "react";

import { ArticleItem } from "./ArticleItem";
import { Article } from "../models/Article";

type ArticleListProps = {
  articles: Article[];
};

export const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  return (
    <div>
      {articles.map((article: Article) => <ArticleItem article={article} />)}
    </div>
  )
};

const styles = {
  listContainer: {
    flex: 1,
    justifyContent: "center",
  },
};

export default ArticleList;
