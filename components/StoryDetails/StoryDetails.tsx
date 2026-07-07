import Image from 'next/image';
import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';
import { PageTitle } from '../PageTitle/PageTitle';
import styles from './StoryDetails.module.css';

interface Category {
  _id: string;
  category: string;
}

interface User {
  _id: string;
  name: string;
  avatarUrl: string;
  articlesAmount: number;
}

interface StoryDetailsProps {
  img: string;
  title: string;
  article: string;
  category: Category;
  date: string;
  user: User;
}

export const StoryDetails = ({
  img,
  title,
  article,
  category,
  date,
  user,
}: StoryDetailsProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topSection}>
        <div className={styles.leftColumn}>
          <Link href="/stories" className={styles.backLink}>
            <MdArrowBack />
            Всі статті
          </Link>

          <PageTitle variant="title">{title}</PageTitle>

          <div className={styles.meta}>
            <p className={styles.metaItem}>
              <span className={styles.label}>Автор статті</span>
              {user.name}
            </p>
            <p className={styles.metaItem}>
              <span className={styles.label}>Опубліковано</span>
              {date}
            </p>
            <p className={styles.metaItem}>
              <span className={styles.category}>{category.category}</span>
            </p>
          </div>
        </div>

        <Image
          src={img}
          alt={title}
          width={755}
          height={502}
          className={styles.image}
        />
      </div>

      <p className={styles.article}>{article}</p>
    </div>
  );
};
