import React from "react";
import { Comment } from "../models/Comment";
import { Divider, Text } from "@mantine/core";
import ReactTimeAgo from "react-time-ago";
import { IconMoodSad } from "@tabler/icons";

function ArticleCommentList({ comments }: { comments: Comment[] }) {
  if (!comments.length) {
    return (
      <span style={{ display: "flex", alignSelf: "center" }}>
        <IconMoodSad style={{ paddingRight: 5 }} />
        <Text color="dimmed">No comments</Text>
      </span>
    );
  }

  return (
    <>
      {comments.map(({ content, date }, i) => {
        return (
          <>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text italic size="sm" mr={20}>
                  {content}
                </Text>
                <Text color="dimmed">
                  <ReactTimeAgo date={date} timeStyle="twitter" />
                </Text>
              </div>
            </div>
            {i != comments.length - 1 && <Divider mr={100} ml={20} variant="dotted"/>}
          </>
        );
      })}
    </>
  );
}

export default ArticleCommentList;
