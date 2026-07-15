import StoryDetails from '@/components/StoryDetails';
import StoryPageClient from './StoryPage.client';
import { getStoryById } from '@/lib/api/serverApi';
import RecomendedStories from '@/components/RecomendedStories';

interface StoryPageProps {
  params: Promise<{ storyId: string }>;
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { storyId } = await params;
  const story = await getStoryById(storyId);

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
        user={story.ownerId}
      />

      <StoryPageClient storyId={story._id} />

      <RecomendedStories
        categoryId={story.category._id}
        currentStoryId={story._id}
      />
    </main>
  );
}
