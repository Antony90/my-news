import React from "react";

import { ArticleItem } from "./ArticleItem";
import { Article } from "../models/Article";
import Masonry from 'react-responsive-masonry';
import { useViewportSize } from "@mantine/hooks";
import { matchSorter } from "match-sorter";
import { filterArticles, selectFilter } from "../store/reducers/filter";
import { useAppSelector } from "../store/hooks";
import { Status } from "../store/constants";

type ArticleListProps = {
  articles: Article[];
  status: Status;
};

export const ArticleGrid: React.FC<ArticleListProps> = ({ articles }) => {
  const { width } = useViewportSize();
  const filter = useAppSelector(selectFilter);
  const filtered = filterArticles(articles, filter);

  return filtered.length > 0 ? (
    <Masonry columnsCount={width > 1800 ? 5 : width > 1200 ? 4 : 3} >
      {filtered.map((article, key) => {
        return (
          <ArticleItem article={article} key={key} />
        );
      })}
    </Masonry>
  ) : (
    <div>No articles</div>
  ); // TODO: show large centered badge
};

export default ArticleGrid;

