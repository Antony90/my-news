import * as Realm from "realm-web"
import { Article } from "../models/Article";
const config = {
    id: 'my-news-beeaa'
}
export const getDatabase = (app: Realm.App) => {
    const mongodb = app.currentUser?.mongoClient("mongodb-atlas");
    if (mongodb === undefined) {
        throw Error("Could not load MongoDB client");
    } 
    const db = mongodb.db("test");
    return db;

}

/**
 * Fetch articles sorted by most recent published first
 * @param articlesRef Reference to articles collection
 * @returns Promise of array of Article docs
 */
export const getArticles = async (articlesRef: any): Promise<Article[]> => {
    return await articlesRef.aggregate([
        { $sort: { published_data: -1 }} // most recent first
    ]);
}


export const authenticate = async (app: Realm.App) => {
    const credentials = Realm.Credentials.anonymous();
    try {
      await app.logIn(credentials);
    } catch (err) {
      console.error("Failed to log in", err);
    }
  };

export const app = new Realm.App(config);