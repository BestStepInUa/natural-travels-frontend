import Categories from '@/components/Categories/Categories';
import StoriesList from '@/components/StoriesList/StoriesList';

type Props = {
  params: Promise<{
    slug?: string[];
  }>;
};

export default function Stories({ params }: Props) {
  return (
    <>
      <Categories params={params} />

      <StoriesList />
    </>
  );
}
