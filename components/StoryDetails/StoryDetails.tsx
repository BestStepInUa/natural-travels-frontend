import Image from 'next/image';
import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';
import PageTitle from '../PageTitle';
import css from './StoryDetails.module.css';
import { User } from '@/types/user';
import { Category } from '@/types/category';

interface StoryDetailsProps {
  img: string;
  title: string;
  article: string;
  category: Category;
  date: string;
  user: User;
}

export default function StoryDetails({
  img,
  title,
  article,
  category,
  date,
  user,
}: StoryDetailsProps) {
  return (
    <section className={css.section}>
      <div className={css.topSection}>
        <div className={css.leftColumn}>
          <Link href="/stories" className={css.backLink}>
            <MdArrowBack />
            Всі статті
          </Link>

          <PageTitle variant="title" marginBottom={24}>
            {title}
          </PageTitle>

          <div className={css.meta}>
            <p className={css.metaItem}>
              <span className={css.label}>Автор статті</span>
              {user.name}
            </p>
            <p className={css.metaItem}>
              <span className={css.label}>Опубліковано</span>
              {date}
            </p>
            <p className={css.metaItem}>
              <span className={css.category}>{category.category}</span>
            </p>
          </div>
        </div>

        <Image
          src={img}
          alt={title}
          width={755}
          height={502}
          className={css.image}
        />
      </div>

      <p className={css.article}>{article}</p>
    </section>
  );
}
