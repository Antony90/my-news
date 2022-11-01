// import { Realm } from '@realm/react';

export class Article {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  summary!: string;
  published_date!: Date;
  sentiment!: number;
  category_id!: number;
  provider!: string;
  img_url!: string;
  link!: string;
}