import { Realm } from '@realm/react';

export class Article {
  title!: string;
  summary!: string;
  published_date!: string;
  sentiment!: number;
  category_id!: number;
  provider!: string;
  img_url!: string;
  link!: string;
}