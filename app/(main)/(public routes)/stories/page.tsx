import { getAllStories } from '@/lib/api/serverApi';
import Categories from '@/components/Categories/Categories';
import StoriesList from '@/components/StoriesList/StoriesList';

export default async function StoriesPage() {
  const res = await getAllStories({
    page: 1,
    perPage: 9,
  });

  return (
    <>
      <Categories />
      <StoriesList stories={res.stories} totalPages={res.totalPages} />
    </>
  );
}
