import React, { useEffect, useState } from "react";

import { ArticleCard } from "./ArticleCard";
import { Article } from "../models/Article";
import Masonry from "react-responsive-masonry";
import { useViewportSize, useWindowScroll } from "@mantine/hooks";
import { filterArticles, selectFilter } from "../store/reducers/filter";
import { useAppSelector } from "../store/hooks";
import { Status } from "../store/constants";
import { Affix, Button, Divider, LoadingOverlay, Pagination, Skeleton, Transition } from "@mantine/core";
import { IconArrowUp } from "@tabler/icons";

type ArticleListProps = {
  articles: Article[];
  status: Status;
};

const articlesPerPage = 48;

export const ArticleGrid: React.FC<ArticleListProps> = ({ articles }) => {
  const { width } = useViewportSize();
  const [scroll, scrollTo] = useWindowScroll();
  const { loading, params } = useAppSelector(selectFilter);

  const filtered = filterArticles(articles, params);
  const [pageNum, setPage] = useState(1);

  const currPageStart = (pageNum - 1) * articlesPerPage;
  const pageSlice = filtered.slice(currPageStart, currPageStart + articlesPerPage);

  const numPages = Math.ceil(filtered.length / articlesPerPage);

  const articlesComp = pageSlice.map((article, key) => (
    <ArticleCard article={article} key={key} />
  ));

  return filtered.length > 0 ? (
    <>
      <Masonry
        columnsCount={width > 1800 ? 6 : width > 1200 ? 4 : 3}
        style={{ position: "relative" }}
      >
        <LoadingOverlay
          visible={loading}
          transitionDuration={300}
          overlayBlur={3}
        />
        {articlesComp}
      </Masonry>
      <Divider my="md" mb="xl" />
      <Pagination
        total={numPages}
        siblings={2}
        initialPage={pageNum}
        position="center"
        color="red"
        onChange={(page) => {
          setPage(page);
          scrollTo({ y: 0 });
        }}
      />
      <Affix position={{ bottom: 20, left: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 200}>
          {(transitionStyles) => (
            <Button
              leftIcon={<IconArrowUp size={16} />}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              Scroll to top
            </Button>
          )}
        </Transition>
      </Affix>
    </>
  ) : (
    <div>No articles</div>
  ); // TODO: show large centered badge
};

export default ArticleGrid;
