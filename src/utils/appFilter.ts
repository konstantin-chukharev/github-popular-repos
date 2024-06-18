import { isParsableNumber } from './number';

export type AppFilter = {
  language?: string;
  page?: number;
  starred?: boolean;
};

export function parseFilter(searchParams: URLSearchParams): AppFilter {
  const filter: AppFilter = {};

  for (const [key, value] of searchParams.entries()) {
    if (key === 'language') {
      filter.language = value;
    }

    if (key === 'page' && isParsableNumber(value)) {
      filter.page = parseInt(value);
    }

    if (key === 'starred') {
      filter.starred = value === 'true';
    }
  }

  return filter;
}

export function stringifyFilter(filter: AppFilter): URLSearchParams {
  const searchParams = new URLSearchParams();

  if (filter.language) {
    searchParams.set('language', filter.language);
  }

  if (filter.page) {
    searchParams.set('page', `${filter.page}`);
  }

  if (filter.starred) {
    searchParams.set('starred', 'true');
  }

  return searchParams;
}
