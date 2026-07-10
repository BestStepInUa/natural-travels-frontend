import { Category } from './category';

export type ArticleOwner = {
  _id: string;
  name: string;
  avatarUrl: string;
};
export type Story = {
  _id: string;
  title: string;
  description: string;
  img: string;
  category: Category;
  ownerId: ArticleOwner;
  rate?: number;
  createdAt: string;
  updatedAt: string;
};

export type StoriesResponse = {
  page: number;
  perPage: number;
  totalStories: number;
  totalPages: number;
  stories: Story[];
};
