export type User = {
  email: string;
  name: string;
  password: string;
  avatarUrl: string;
  articlesAmount?: number;
  savedArticles?: string[];
  createAt: Date;
  updateAt: Date;
};
