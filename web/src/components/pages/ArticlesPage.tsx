import {
  ActionIcon,
  Badge,
  Breadcrumbs,
  Button,
  Stack,
  Text,
} from "@mantine/core";
import { Status } from "../../store/constants";
import { useAppSelector } from "../../store/hooks";
import { selectArticles, selectStatus } from "../../store/reducers/articles";
import ArticleGrid from "../ArticleGrid";
import { useEffect, useState } from "react";
import { IconHome, IconWand, IconX } from "@tabler/icons";
import { Article } from "../../models/Article";
import { fetchRecommended } from "../../services/client";
const { Loading, Failure } = Status;

export const ArticlesPage = () => {
  const articles = useAppSelector(selectArticles);
  const status = useAppSelector(selectStatus);
  const [recommendedArticles, setRecommendedArticles] = useState<Article[]>([]);

  const [recommendArticleID, setRecommendArticleID] = useState<string | null>(
    null
  );
  const [rArticleTitle, setRArticleTitle] = useState("");

  const onRecommendArticleID = (id: string) => {
    //@ts-ignore - possibly null but we only show existing IDs
    setRArticleTitle(articles.find((a) => a.id === id).title);
    setRecommendArticleID(id);
    fetchRecommended(id).then((similarArticles) => {
      similarArticles && setRecommendedArticles(similarArticles);
    });
  }


  switch (status) {
    case Loading:
      return <div>Loading</div>;
    case Failure:
      return <div>Failure</div>;
    default:
      return (
        <Stack>
          <Breadcrumbs separator="/" mt="xs">
            <Badge
              variant="gradient"
              leftSection={
                <ActionIcon
                  style={{ color: "white", backgroundColor: "transparent" }}
                  size="xs"
                >
                  <IconHome />
                </ActionIcon>
              }
            >
              Articles
            </Badge>
            {recommendArticleID && (
              <Badge
                variant="gradient"
                gradient={{ from: "red", to: "orange" }}
                leftSection={<IconWand size={15} />}
                rightSection={
                  <ActionIcon
                    style={{ color: "white", backgroundColor: "transparent" }}
                    size="xs"
                    onClick={() => {
                      setRecommendArticleID(null);
                      setRArticleTitle("");
                    }}
                  >
                    <IconX />
                  </ActionIcon>
                }
              >
                Similar to "{rArticleTitle}"
              </Badge>
            )}
          </Breadcrumbs>
          <ArticleGrid
            articles={recommendedArticles.length && recommendedArticles || articles}
            status={status}
            onRecommendArticleID={onRecommendArticleID}
          />
        </Stack>
      );
  }
};
