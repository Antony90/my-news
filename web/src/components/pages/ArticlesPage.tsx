import { Status } from "../../store/constants";
import { useAppSelector } from "../../store/hooks";
import { selectArticles, selectStatus } from "../../store/reducers/articles";
import ArticleGrid from "../ArticleGrid";

export const ArticlesPage = () => {
  const articles = useAppSelector(selectArticles).slice(0, 50);
  const status = useAppSelector(selectStatus);

  switch (status) {
    case Status.Loading:
      return <div>"Loading articles"</div>;
    case Status.Failure:
      return <div>"Could not fetch articles"</div>;
    case Status.Complete:
      return <ArticleGrid articles={articles} />;
    default:
      throw Error(`Unhandled case ${status}`);
  }
};
