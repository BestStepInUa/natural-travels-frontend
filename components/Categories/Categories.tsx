import css from '@/components/Categories/Categories.module.css';
import Link from 'next/link';

const categories = [
  { label: 'Всі статті', slug: 'all' },
  { label: 'Еко-ферми та гастротури', slug: 'eco-farms' },
  { label: 'Традиції та культура', slug: 'traditions' },
  { label: 'Карпати', slug: 'carpathians' },
  { label: 'Національні парки', slug: 'national-parks' },
  { label: 'Поділля', slug: 'podillia' },
  { label: 'Озера та річки', slug: 'lakes' },
  { label: 'Полісся', slug: 'polissia' },
];

export default function Categories() {
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
