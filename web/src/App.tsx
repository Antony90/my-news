import { useEffect } from "react";
import * as Realm from "realm-web";
import { app } from "./services/realm";

import { useAppDispatch, useAppSelector } from "./store/hooks";
import { fetchArticles, selectArticles } from "./store/reducers/articles";
import { ArticleManager } from "./components/ArticleManager";
import { AppShell } from "@mantine/core";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import { useHotkeys } from "@mantine/hooks";
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
  const articles = useAppSelector(selectArticles).slice(0, 50);

  useEffect(() => {
    authenticate(app);
    dispatch(fetchArticles());
  }, [dispatch]); 

  return (
        <AppShell 
          padding="md" 
          navbar={<NavBar />}
          header={<Header />}  
        >
          <ArticleManager articles={articles} />
        </AppShell>
  );
};

export default App;
