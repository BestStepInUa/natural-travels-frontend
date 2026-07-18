import { getAllStories, getCategories } from '@/lib/api/serverApi';
import StoriesPage from '@/components/StoriesPage/StoriesPage';

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

export default async function Stories({ params }: Props) {
  const { slug } = await params;

  const categories = await getCategories();

  const categoryId = categories.find((c) => c.slug === slug[0])?._id;

  console.log({ slug, categoryId });

  const res = await getAllStories({
    page: 1,
    perPage: 9,
    categoryId,
  });

  res.stories.forEach((story) => {
    if (!story.ownerId) {
      console.log('❌ Немає ownerId:', story);
    }
  });

  return (
     <StoriesPage params={params} />
  );
}
