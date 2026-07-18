import { PageTitle } from '@/components/PageTitle/PageTitle';
import CategoriesFilter from '@/components/CategoriesFilter/CategoriesFilter';
import StoriesList from '@/components/StoriesList/StoriesList';
import css from './StoriesPage.module.css';

// 1. Оголошуємо тип пропсів
interface StoriesPageProps {
  params: Promise<{ slug?: string[] }>;
}

export default function StoriesPage({ params }: StoriesPageProps) {
  return (
    <div className="container">
      <section className={css.section}>
        <PageTitle
          variant="title"
          color="scheme1"
          marginBottom={40}
          align="center"
        >
          Статті
        </PageTitle>

        <CategoriesFilter params={params} />

        <StoriesList />
      </section>
    </div>
  );
}
