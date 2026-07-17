import { ReactNode } from 'react';
import { ProfilePage}  from '@/components/ProfilePage/ProfilePage';


interface ProfileLayoutProps {
  children: ReactNode;
}

export default async function ProfileLayout({
  children,
}: ProfileLayoutProps) {

  return (
    <>
      <ProfilePage >
        {children}
      </ProfilePage >
    </>
  );
}