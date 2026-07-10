import { TravellerInfo } from '@/components/TravellerInfo/TravellerInfo';
import { getPublicTravellerProfile } from '@/lib/api/serverApi';
import { PageTitle } from '@/components/PageTitle/PageTitle';
import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';

type TravellerPageProps = { params: Promise<{ travellerId: string }> };

export default async function TravellerPage({ params }: TravellerPageProps) {
  const { travellerId } = await params;

  let travellerProfile;

  try {
    travellerProfile = await getPublicTravellerProfile(travellerId);
  } catch {
    return (
      <main>
        <div className="container">
          <p>Такий користувач відсутній</p>
        </div>
      </main>
    );
  }

  const traveller = travellerProfile.user;
  const stories = travellerProfile.stories?.data ?? [];
  console.log('travellerProfile:', travellerProfile);
  return (
    <main>
      <div className="container">
        <TravellerInfo
          name={traveller.name}
          avatarUrl={traveller.avatarUrl || '/hero.jpg'}
          articlesAmount={traveller.articlesAmount ?? 0}
        />

        <PageTitle variant="traveller" color="scheme1" marginBottom={40}>
          Статті Мандрівника
        </PageTitle>

        {stories.length > 0 ? (
          <p>TravellersStories</p>
        ) : (
          <MessageNoStories
            text="Цей користувач ще не публікував історій"
            buttonText="Назад до історій"
            linkTo="/stories"
          />
        )}
      </div>
    </main>
  );
}
