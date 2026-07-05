
// import TravellerInfo from '@/components/TravellerInfo/TravellerInfo';
// import TravellersStories from '@/components/TravellersStories/TravellersStories';
import { PageTitle } from '@/components/PageTitle/PageTitle';
import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';

type TravellerPageProps = {
  params: Promise<{
    travellerId: string;
  }>;
};

export default async function TravellerPage({ params }: TravellerPageProps) {
  const { travellerId } = await params;


  const stories = [];

  return (
    <main>
      <div className="container">
        {/* <TravellerInfo /> */}

        <PageTitle variant="traveller" color="scheme1" marginBottom={40}>
          Статті Мандрівника
        </PageTitle>

        {stories.length > 0 ? (
          <p>TravellersStories</p>
        ) : (
          <MessageNoStories
            text="Цей користувач ще не публікував історій"
            buttonText="Назад до історій"
            linkTo={`/stories`}
          />
        )}
      </div>
    </main>
  );
}
