import React from "react";

import { Article } from "../models/Article";

type ArticleItemProps = {
  article: Article;
};

export const ArticleItem = React.memo<ArticleItemProps>(
  ({ article }) => {
    return (
      <li>{article.provider} | {article.category_id} | {article.sentiment.toFixed(2)} | {article.title}</li>
    );
  }
);