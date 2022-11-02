import {
  Badge,
  Card,
  Image,
  Group,
  ActionIcon,
  Collapse,
  Title,
  Divider,
  Stack,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconLayoutNavbarExpand,
} from "@tabler/icons";
import React, { useState } from "react";
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
};

const hoverStyle = {
  transition: 'transform .5s',
  '&:hover': {
    transform: 'scale(1.03)'
  }
};

export const ArticleItem: React.FC<ArticleItemProps> = ({ article }) => {
  const [expanded, setExpanded] = useState(false);
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme == 'dark';
  const {
    title,
    img_url,
    sentiment,
    provider,
    summary,
    link,
    category_id,
    published_date,
  } = article;

  return (
    <Card shadow="lg" radius="lg" p="lg" m="sm" withBorder sx={hoverStyle}>
      <Card.Section>
        <Image
          src={img_url}
          height={100}
          alt="article preview image"
          sx={{ boxShadow: "inset 0 0 20px #000000" }}
        />
      </Card.Section>

      <Group position="left" mt="md" mb="xs">
        <Badge color={mapProviderToColour(provider)} variant="light">
          {provider}
        </Badge>

        <Badge color="gray" variant="filled">
          {mapCategoryIdToName(category_id)}
        </Badge>
      </Group>
      <a href={link} target='_blank' 
        style={{ color: dark ? 'white' : 'black', textDecoration: 'none' }}
        onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
        onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
>
        <Title order={4}>{title}</Title>
      </a>
      <Group position="apart" pt="sm">
        <Group position="left">
          <Badge
            color={mapSentimentToColor(sentiment)}
            radius="xs"
            variant="filled"
          >
            {sentiment.toFixed(2)}
          </Badge>
        </Group>
        <Group position="left">
          <Badge color="gray" radius="xs" variant="filled">
            <ReactTimeAgo
              date={published_date}
              tooltip={true}
              timeStyle="twitter"
              locale="en-GB"
            />
          </Badge>
          <ActionIcon onClick={() => setExpanded((e) => !e)}>
            {expanded ? <IconChevronUp /> : <IconChevronDown />}
          </ActionIcon>
        </Group>

        <Collapse in={expanded}>
          <Stack>
            <Divider />
            {summary}
          </Stack>
        </Collapse>
      </Group>
    </Card>
  );
};
