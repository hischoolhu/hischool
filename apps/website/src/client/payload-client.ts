import type { Page, PaginatedDocs, WhereField } from '@hischoolhu/cms';
import qs from 'qs';

const url = import.meta.env.DEV
  ? 'http://127.0.0.1:3000'
  : `${import.meta.env.PAYLOAD_URL}`;

type WhereCollection<T> = {
  [key in keyof T]?: WhereCollection<T>[] | WhereField;
} & {
  and?: WhereCollection<T>[];
  or?: WhereCollection<T>[];
};

const where = <T>(query: WhereCollection<T>): string =>
  qs.stringify({ where: query }, { addQueryPrefix: true });

const getCollection = <T>(
  slug: string,
  query?: WhereCollection<T>,
): Promise<PaginatedDocs<T>> => {
  const stringifiedQuery = query ? where(query) : '';
  return fetch(`${url}/api/${slug}${stringifiedQuery}`)
    .then((res) => res.json())
    .catch((err) => console.error('Failed to fetch collection:', err));
};

export const getPages = () =>
  getCollection<Page>('pages').then((res) => res.docs);

export const getImageSrc = (src: string) => `${url}/media/${src}`;
