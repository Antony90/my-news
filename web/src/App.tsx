import React, { useEffect } from "react";
import * as Realm from "realm-web";
import { app } from "./services/realm";

import { useAppDispatch, useAppSelector } from "./store/hooks";
import { fetchArticles, selectArticles } from "./store/reducers/articles";
import { ArticleManager } from "./components/ArticleManager";
import { AppShell, Group, Header, TextInput, ThemeIcon, Title,  } from "@mantine/core";
import { IconMoodHappy } from "@tabler/icons";
import NavBar from "./components/NavBar";
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

  return (
        <AppShell 
          padding="md" 
          navbar={<NavBar />}
          header={
            <Header height={100} >
              <Group position="left" sx={{ height: '100%' }} mx="xl">
                <ThemeIcon variant="filled" radius="md" size="xl" color="green">
                  <IconMoodHappy />
                </ThemeIcon>
                <Title>My News</Title>
                <TextInput
                  placeholder="Search news"
                  radius="xl"
                  size="md"
                />
              </Group>
            </Header>
          }  
        >
          <ArticleManager articles={articles} />
        </AppShell>
  );
};

export default App;
