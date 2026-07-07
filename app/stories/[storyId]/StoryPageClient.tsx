// 'use client';

// import { useState } from 'react';
// import SaveStory from '@/components/SaveStory';
// import ErrorWhileSavingModal from '@/components/ErrorWhileSavingModal';

// interface StoryPageClientProps {
//   storyId: string;
// }

// export default function StoryPageClient({ storyId }: StoryPageClientProps) {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <>
//       <SaveStory storyId={storyId} onOpenModal={() => setIsModalOpen(true)} />

//       <ErrorWhileSavingModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//       />
//     </>
//   );
// }
