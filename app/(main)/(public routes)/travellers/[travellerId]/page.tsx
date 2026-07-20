import TravellerInfo from '@/components/TravellerInfo';
import { getPublicTravellerProfile } from '@/lib/api/serverApi';
import PageTitle from '@/components/PageTitle';
import TravellerNotFound from '@/components/TravellerNotFound';
import MessageNoStories from '@/components/MessageNoStories';
import TravellerStoriesList from '@/components/TravellerStoriesList';
import css from './TravellerPage.module.css';

type TravellerPageProps = { params: Promise<{ travellerId: string }> };

export default async function TravellerPage({ params }: TravellerPageProps) {
  const { travellerId } = await params;

  let travellerProfile;

  try {
    travellerProfile = await getPublicTravellerProfile(travellerId);
  } catch {
    return <TravellerNotFound />;
  }

  const traveller = travellerProfile.user;
  const stories = travellerProfile.stories?.data ?? [];

  return (
    <section className={css.section}>
      <div className={`container`}>
        <TravellerInfo
          name={traveller.name}
          avatarUrl={traveller.avatarUrl || '/hero.jpg'}
          articlesAmount={traveller.articlesAmount ?? 0}
        />

        <PageTitle variant="traveller" color="scheme1" marginBottom={40}>
          Статті Мандрівника
        </PageTitle>

        {stories.length > 0 ? (
          <TravellerStoriesList travellerId={travellerId} />
        ) : (
          <MessageNoStories
            text="Цей користувач ще не публікував історій"
            buttonText="Назад до історій"
            linkTo="/stories"
          />
        )}
      </div>
    </section>
  );
}
