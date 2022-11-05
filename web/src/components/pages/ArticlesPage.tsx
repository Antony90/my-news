import { Status } from "../../store/constants";
import { useAppSelector } from "../../store/hooks";
import { selectArticles, selectStatus } from "../../store/reducers/articles";
import ArticleGrid from "../ArticleGrid";
const {
  Loading,
  Failure
} = Status;

export const ArticlesPage = () => {
  const articles = useAppSelector(selectArticles)
  const status = useAppSelector(selectStatus);
  switch (status) {
    case Loading:
      return <div>Loading</div>
    case Failure:
      return <div>Failure</div>
    default:
      return (
      <ArticleGrid articles={articles} status={status} />
    );
  }
};
