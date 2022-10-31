import React from "react";

import { Article } from "../models/Article";
import ArticleList from "./ArticleList";


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

const styles = {
  content: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
};
