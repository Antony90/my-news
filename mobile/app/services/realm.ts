import Realm, { Services } from "realm"
import { Article } from "../models/Article";
type Collection = Services.MongoDB.MongoDBCollection<Article>;
const config = {
    id: 'my-news-beeaa'
}

export const getArticlesRef = (app: Realm.App) => {
    const mongodb = app.currentUser?.mongoClient("mongodb-atlas");
    const db = mongodb?.db("test");
    const articles = db?.collection("articles");
    return articles;
}

/**
 * Fetch articles sorted by most recent published first
 * @param articlesRef Reference to articles collection
 * @returns Promise of array of Article docs
 */
export const getArticles = async (articlesRef: Collection): Promise<Article[]> => {
    return await articlesRef.aggregate([
        { $sort: { published_data: -1 }} // most recent first
    ]);
}
export const app = new Realm.App(config);