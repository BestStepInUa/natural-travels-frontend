import { type Category } from './category';

export type Story = {
  _id: string;
  title: string;
  description: string;
  img: string;
  category: Category;
  ownerId: {
    _id: string;
    name: string;
  };
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

export type StoriesQueryParams = {
  category?: string;
  page?: number;
  perPage?: number;
  type?: 'popular';
};
