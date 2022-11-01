import { Badge, Card, Image, Group, UnstyledButton,  } from "@mantine/core";
import React from "react";
import ReactTimeAgo from "react-time-ago";

import { Article } from "../models/Article";

type ArticleItemProps = {
  article: Article;
};

const mapProviderToColour = (provider: string) => {
  switch (provider.toLowerCase()) {
    case "bbc":
      return "red";
    case "sky news":
      return "yellow";
    case "daily mail":
      return "blue";
    default:
      return "gray";
  }
};

const mapCategoryIdToName = (categoryId: number) => {
  return [
    "Top stories",
    "Technology",
    "World",
    "Politics",
    "Business",
    "Entertainment",
  ][categoryId];
};

const mapSentimentToColor = (sentiment: number) => {
  if (sentiment > 0.8) return "green";
  if (sentiment >= -0.6) return "yellow";
  return "red";
}

export const ArticleItem: React.FC<ArticleItemProps> = ({ article }) => {
  const { title, img_url, sentiment, provider, summary, link, category_id, published_date } =
    article;
  return (
    <UnstyledButton>
      <Card shadow="lg" radius="lg" p="lg" withBorder>
        <Card.Section>
          <Image src={article.img_url} height={100} alt="article preview image" sx={{ boxShadow: 'inset 0 0 20px #000000'}}/>
        </Card.Section>
        
        <Group position="left" mt="md" mb="xs">
          <Badge color={mapProviderToColour(provider)} variant="light">
            {provider}
          </Badge>

          <Badge color="gray" variant="light">
            {mapCategoryIdToName(category_id)}
          </Badge>
        </Group>
        {title}
        <Group position="apart" pt="sm">
          <Badge color={mapSentimentToColor(sentiment)} radius="xs" variant="filled">{sentiment.toFixed(2)}</Badge>
          <Badge color="gray" radius="xs" variant="filled">
            <ReactTimeAgo date={published_date} tooltip={true} timeStyle="twitter" locale="en-GB"/>
          </Badge>
        </Group>
      </Card>
    </UnstyledButton>
  );
};
