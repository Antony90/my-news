import React, {useEffect, useMemo, useState} from 'react';
import { Services } from 'realm';
type Collection = Services.MongoDB.MongoDBCollection<any>;
import {Task} from './models/Article';
import {TaskRealmContext} from './models';
import {TaskManager} from './components/ArticleManager';
import { app, getArticles, getArticlesRef } from './services/realm';
import { AsyncStorage } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { set } from '../store/reducers/articles';

const {useQuery} = TaskRealmContext;

const authenticate = async (app: Realm.App) => {
  const credentials = Realm.Credentials.anonymous();
  try {
    await app.logIn(credentials);
  } catch(err) {
    console.error("Failed to log in", err);
  }
}

const articlesRef = getArticlesRef(app);

export const AppNonSync = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    authenticate(app);
    fetchArticles(articlesRef);
  }, []);

   // TODO: create model for schema
  async function fetchArticles (articlesRef: Collection) {
    const lastFetchStr = await AsyncStorage.getItem("last_fetch");

    if (lastFetchStr) {
      const lastFetchDate = Number(lastFetchStr);
      const now = new Date().getTime();
      const diff = now - lastFetchDate;

      if (diff > 1000 * 3600) {
        const articles = await getArticles(articlesRef);
        await AsyncStorage.setItem("articles", JSON.stringify(articles));
        await AsyncStorage.setItem("last_fetch", String(now))
        dispatch(set(articles));
      }
    }
  }

  return <></>;
  // return <TaskManager tasks={articles} />;
};
