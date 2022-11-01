import React from "react";

import { Article } from "../models/Article";
import ArticleList from "./ArticleGrid";


export const ArticleManager: React.FC<{
  articles: Article[];
  userId?: string;
}> = ({ articles }) => {
  return (
    <div>
      {articles.length === 0 ? (
        "No articles"
      ) : (
        <ArticleList articles={articles} />
      )}
    </div>
  );
};