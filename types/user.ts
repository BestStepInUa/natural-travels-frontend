export type User = {
  email: string;
  userName: string;
  password?: string;
  avatar?: string;
  articlesAmount?: number;
  savedArticles?: string[];
  createAt: Date;
  updateAt: Date;
};
