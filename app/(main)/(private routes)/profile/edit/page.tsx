import { Metadata } from 'next';
import ProfileEditForm from '@/components/ProfileEditForm/ProfileEditForm';
import css from './page.module.css';

export const metadata: Metadata = {
  title: 'Персональна інформація | Природні Мандри',
};

export default function ProfileEditPage() {
  return (
    <main>
      <div className={`container ${css.wrapper}`}>
        <h1 className={css.title}>Персональна інформація</h1>
        <ProfileEditForm />
      </div>
    </main>
  );
}
