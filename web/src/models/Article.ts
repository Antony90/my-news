import { Realm } from '@realm/react';
import { Comment } from './Comment';

export class Article {
  id!: string;
  title!: string;
  summary!: string;
  published_date!: string;
  sentiment!: number;
  category_id!: number;
  provider!: string;
  img_url!: string;
  link!: string;
  comments!: Comment[];
  votes_up!: number;
  votes_down!: number;
}