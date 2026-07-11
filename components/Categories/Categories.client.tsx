'use client';

import css from '@/components/Categories/Categories.module.css';
import Link from 'next/link';

const categories = [
  { label: 'Всі статті', slug: 'all' },
  {
    label: 'Еко-ферми та гастротури',
    slug: 'eco-farms',
    id: '6966a5cdbc1b90f344c2e0bb',
  },
  {
    label: 'Традиції та культура',
    slug: 'traditions',
    id: '6966a5cdbc1b90f344c2e0bc',
  },
  { label: 'Карпати', slug: 'carpathians', id: '6966a5cdbc1b90f344c2e0bd' },
  {
    label: 'Національні парки',
    slug: 'national-parks',
    id: '6966a5cdbc1b90f344c2e0be',
  },
  { label: 'Поділля', slug: 'podillia', id: '6966a5cdbc1b90f344c2e0bf' },
  { label: 'Озера та річки', slug: 'lakes', id: '6966a5cdbc1b90f344c2e0c0' },
  { label: 'Полісся', slug: 'polissia', id: '6966a5cdbc1b90f344c2e0c1' },
];

export default function CategoriesClient() {
  return (
    <div className={css.stories}>
      <h2 className={css.storiesListTitle}>Статті</h2>
      <select className={css.categoryListSelect}>
        {categories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.label}
          </option>
        ))}
      </select>

      <ul className={css.categoryList}>
        {categories.map((category) => (
          <li className={css.categoryItem} key={category.slug}>
            <Link
              href={`/stories/filter/${category.slug}`}
              className={css.categoryItemLink}
            >
              {category.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
