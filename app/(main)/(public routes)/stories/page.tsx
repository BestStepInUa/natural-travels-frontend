import StoriesPage from '@/components/StoriesPage';


type Props = {
  params: Promise<{
    slug?: string[];
  }>;
};

export default function Stories({ params }: Props) {
  return (
      <StoriesPage params={params} />
  );
}
