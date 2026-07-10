import { getAllStories } from '@/lib/api/serverApi';
import StoriesList from '@/components/StoriesList/StoriesList';
import Categories from '@/components/Categories/Categories';

export default async function Stories() {
  const res = await getAllStories({
    page: 1,
    perPage: 10,
  });

  return (
    <>
      <Categories />
      <StoriesList stories={res.stories} totalPages={res.totalPages} />
    </>
  );
}
