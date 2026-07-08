import * as Yup from 'yup';

export interface StoryFormValues {
  title: string;
  text: string;
  category: string;
  coverImage: File | null;
}

export const initialValues: StoryFormValues = {
  title: '',
  text: '',
  category: '',
  coverImage: null,
};

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .required('Введіть заголовок історії')
    .min(2, 'Заголовок має містити щонайменше 2 символи')
    .max(40, 'Заголовок має містити не більше 40 символів'),
  text: Yup.string()
    .trim()
    .required('Введіть текст історії')
    .min(12, 'Текст історії має містити щонайменше 12 символів')
    .max(3000, 'Текст історії має містити не більше 3000 символів'),
  category: Yup.string()
    .required('Вибір категорії є обов’язковим')
    .matches(
      /^[0-9a-fA-F]{24}$/,
      'Категорія має містити валідний унікальний ідентифікатор (UUID)'
    ),
  coverImage: Yup.mixed()
    .required('Завантаження зображення є обов’язковим')
    .test('fileSize', 'Максимальний розмір зображення — 1MB', (value) => {
      if (!value) return false;
      return (value as File).size <= 1024 * 1024;
    }),
});
