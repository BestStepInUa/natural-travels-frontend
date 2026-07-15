import { type Category } from './category';
import { type User } from './user';

export type Story = {
  _id: string;
  title: string;
  article: string;
  img: string;
  category: Category;
  ownerId: User & { _id: string };
  rate?: number;
  date: string;
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

export type StoriesQueryParams = {
  categoryId?: string;
  page?: number;
  perPage?: number;
  type?: 'popular';
};

export interface ProfileStoriesResponse {
  data: Story[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}
