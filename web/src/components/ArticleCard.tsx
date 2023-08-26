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
  Avatar,
  Button,
  Tooltip,
  Text,
  TextInput,
} from "@mantine/core";
import { IconBallpen, IconCaretDown, IconCaretUp, IconChevronDown, IconChevronUp, IconCircleCaretUp, IconCross, IconInfoCircle, IconMaximize, IconMessage2, IconMessagePlus, IconSend, IconX } from "@tabler/icons";
import React, { useState } from "react";
import ReactTimeAgo from "react-time-ago";

import { Article } from "../models/Article";
import ArticleCommentList from "./ArticleCommentList";
import { postComment } from "../services/client";

type ArticleItemProps = {
  article: Article;
  key: number;
};

const mapProvider = (provider: string) => {
  switch (provider.toLowerCase()) {
    case "bbc":
      return [
        "red",
        "https://seeklogo.com/images/B/bbc-news-logo-E3DECDA65A-seeklogo.com.png",
      ];
    case "sky news":
      return [
        "yellow",
        "https://the-motherlode.com/wp-content/uploads/2020/11/o2IGXWqj_400x400.jpg",
      ];
    case "daily mail":
      return [
        "blue",
        "https://i.dailymail.co.uk/i/pix/2016/04/06/02/0BFCB585000005DC-3525479-image-m-25_1459906645394.jpg",
      ];
    default:
      return ["gray", ""];
  }
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

const mapCategoryId = (categoryId: number) => {
  return [
    ["Top stories", "red"],
    ["Technology", "orange"],
    ["World", "yellow"],
    ["Politics", "green"],
    ["Business", "blue"],
    ["Entertainment", "purple"],
  ][categoryId];
};

const mapSentimentToColor = (sentiment: number) => {
  if (sentiment > 0.8) return "green";
  if (sentiment >= -0.6) return "yellow";
  return "red";
};

const hoverStyle = {
  transition: "transform .5s",
  "&:hover": {
    transform: "scale(1.03)",
  },
};

function submitRating(rating: number) {

}


enum Extra {
  Comment, Desc
}

export const ArticleCard: React.FC<ArticleItemProps> = ({ article }) => {
  const [expanded, setExpanded] = useState(false);
  const [extraContent, setExtraContent] = useState(Extra.Desc); // expanded section below card

  const [comment, setComment] = useState(""); // controlled text input
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
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

  const [providerColor, img] = mapProvider(provider);
  const [categoryName, badgeColor] = mapCategoryId(category_id);


  return (
    <Card shadow="lg" radius="lg" p="lg" m="sm" withBorder sx={hoverStyle}>
      <Card.Section>
        <Image
          src={img_url}
          height={120}
          alt="article preview image"
          sx={{ boxShadow: "inset 0 0 20px #000000" }}
        />
      </Card.Section>

      <Group position="left" mt="md" mb="xs">
        <Badge
          pl={0}
          color={providerColor}
          variant="light"
          leftSection={
            <Avatar alt="news provider icon" size={16} mr={5} src={img} />
          }
        >
          {provider}
        </Badge>

        <Badge color={badgeColor} variant="light">
          {categoryName}
        </Badge>
      </Group>
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        style={{ color: dark ? "white" : "black", textDecoration: "none" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.textDecoration = "underline")
        }
        onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
      >
        <Title order={6}>{title}</Title>
      </a>
      <Group position="apart" pt="sm">
        <Group position="left">
          <Stack spacing={0} align="center" mb={-8}>
            <Tooltip label={article.votes_up} withinPortal position="right">
              <Button
                compact
                variant="subtle"
                px={0}
                onClick={() => submitRating(1)}
              >
                <IconCaretUp />
              </Button>
            </Tooltip>
            <Badge
              color={mapSentimentToColor(sentiment)}
              radius="xs"
              variant="filled"
            >
              {sentiment.toFixed(2)}
            </Badge>
            <Tooltip label={article.votes_down} withinPortal position="right">
              <Button
                compact
                variant="subtle"
                px={0}
                onClick={() => submitRating(-1)}
              >
                <IconCaretDown />
              </Button>
            </Tooltip>
          </Stack>
        </Group>
        <Group position="left">
          <Badge
            color="gray"
            radius="xl"
            variant="outline"
            sx={{ paddingLeft: 0 }}
            leftSection={
              <IconBallpen size={15} style={{ marginTop: 4, marginLeft: 4 }} />
            }
            styles={{
              inner: {
                textTransform: "none",
              },
            }}
          >
            <ReactTimeAgo
              date={new Date(published_date)}
              tooltip={true}
              timeStyle="twitter"
              locale="en-GB"
            />{" "}
          </Badge>
          <Button.Group>
            <Tooltip label="Comment" withinPortal>
              <Button
                variant="default"
                p={8}
                onClick={() => {
                  setExtraContent(Extra.Comment);
                  setExpanded((e) => !e);
                }}
              >
                {expanded && extraContent == Extra.Comment ? (
                  <IconX size="20px" />
                ) : (
                  <>
                    <IconMessage2 />
                    {article.comments.length}
                  </>
                )}
              </Button>
            </Tooltip>
            <Tooltip label="Description" withinPortal>
              <Button
                variant="default"
                onClick={() => {
                  setExtraContent(Extra.Desc);
                  setExpanded((e) => !e);
                }}
                p={8}
              >
                {expanded && extraContent == Extra.Desc ? (
                  <IconChevronUp />
                ) : (
                  <IconChevronDown />
                )}
              </Button>
            </Tooltip>
          </Button.Group>
        </Group>

        <Collapse in={expanded} style={{ width: "100%" }}>
          <Stack>
            <Divider />
            <Stack>
              {(extraContent == Extra.Comment && (
                <>
                  <TextInput
                    placeholder="Add comment"
                    icon={<IconMessagePlus size="0.8rem" />}
                    rightSectionWidth={68}
                    value={comment}
                    onChange={(e) => setComment(e.currentTarget.value)}
                    rightSection={
                      <Button
                        variant="subtle"
                        px={20}
                        onClick={(e:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                          postComment(e.currentTarget.value).then(() => setComment(""))
                        }}
                      >
                        <IconSend />
                      </Button>
                    }
                  />
                  <ArticleCommentList comments={article.comments} />
                </>
              )) ||
                (extraContent == Extra.Desc && article.summary)}
            </Stack>
          </Stack>
        </Collapse>
      </Group>
    </Card>
  );
};
