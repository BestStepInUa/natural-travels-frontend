import Categories from '@/components/Categories/Categories';
import StoriesList from '@/components/StoriesList/StoriesList';
import { getAllStories } from '@/lib/api/serverApi';

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

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Stories({ params }: Props) {
  const { slug } = await params;

  const categoryId = categories.find((c) => c.slug === slug[0])?.id;

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
    <>
      <Categories />
      <StoriesList stories={res.stories} totalPages={res.totalPages} />
    </>
  );
}
