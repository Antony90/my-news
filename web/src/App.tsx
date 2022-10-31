import React, { useEffect } from "react";
import * as Realm from "realm-web";
import { app } from "./services/realm";

import { useAppDispatch, useAppSelector } from "./store/hooks";
import { fetchArticles, selectArticles } from "./store/reducers/articles";
import { ArticleManager } from "./components/ArticleManager";

export const authenticate = async (app: Realm.App) => {
  const credentials = Realm.Credentials.anonymous();
  try {
    await app.logIn(credentials);
  } catch (err) {
    console.error("Failed to log in", err);
  }
};

const App = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector(selectArticles);

  useEffect(() => {
    authenticate(app);
    dispatch(fetchArticles());
  }, [dispatch]);

  return <ArticleManager articles={articles} />;
};

export default App;