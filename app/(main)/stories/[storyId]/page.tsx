import StoryDetails from '@/components/StoryDetails';
import StoryPageClient from './StoryPageClient';
import { getStoryById } from '@/lib/api/storiesApi';

interface StoryPageProps {
  params: { storyId: string };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const story = await getStoryById(params.storyId);

  if (!story) {
    return <p>Така історія відсутня</p>;
  }

  return (
    <main>
      <StoryDetails
        img={story.img}
        title={story.title}
        article={story.article}
        category={story.category}
        date={story.date}
        user={story.user}
      />

      <StoryPageClient storyId={story._id} />
    </main>
  );
}
