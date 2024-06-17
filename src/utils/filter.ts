import { ReposFilter, ReposQueryParams } from '../api/types';
import { isArrayValue } from './array';
import { isParsableNumber } from './number';
import { isObjectKey } from './object';

type FilterKey = keyof ReposFilter;

const supportedFilterKeys = [
  'q',
  'order',
  'page',
  'per_page',
  'sort',
] as const satisfies FilterKey[];
const supportedSorts = [
  'stars',
  'forks',
  'help-wanted-issues',
  'updated',
] as const satisfies ReposFilter['sort'][];
const supportedOrders = [
  'asc',
  'desc',
] as const satisfies ReposFilter['order'][];
const supportedVisibilities = [
  'public',
  'private',
] as const satisfies ReposFilter['q']['visibility'][];

const validators = {
  q: (value) => typeof value === 'string',
  order: (value) => isArrayValue(supportedOrders, value),
  sort: (value) => isArrayValue(supportedSorts, value),
  page: (value) => typeof value === 'string' && isParsableNumber(value),
  per_page: (value) => typeof value === 'string' && isParsableNumber(value),
} satisfies {
  [key in FilterKey]: (value: unknown) => boolean;
};

function parseQueryParams(paramsString: string): ReposQueryParams {
  const params: ReposQueryParams = {};
  const encodedString = decodeURI(paramsString);

  for (const param of encodedString.split('+')) {
    const [key, value] = param.split(':');

    if (key && !value) {
      params.searchToken = key;
    }

    if (key === 'created') {
      params.created = value;
    }

    if (key === 'language') {
      params.language = value;
    }

    if (key === 'visibility' && isArrayValue(supportedVisibilities, value)) {
      params.visibility = value;
    }
  }

  return params;
}

function stringifyQueryParams(params: ReposQueryParams): string {
  const stringifiedParams = [];

  for (const key in params) {
    if (!isObjectKey(params, key) || !params[key]) {
      continue;
    }

    if (key === 'searchToken') {
      stringifiedParams.push(params[key]);
    } else if (key in params && params[key]) {
      stringifiedParams.push(`${key}:${params[key]}`);
    }
  }

  return stringifiedParams.join(' ');
}

export function parseFilter(searchParams: URLSearchParams): ReposFilter {
  const filter: ReposFilter = { q: {} };

  for (const key of searchParams.keys()) {
    if (!isArrayValue(supportedFilterKeys, key)) {
      throw Error(`[parseFilter]: Unexpected query parameter "${key}"`);
    }

    const value = searchParams.get(key);

    if (!value || !validators[key](value)) {
      continue;
    }

    if (key === 'q') {
      filter.q = parseQueryParams(value);
      continue;
    }

    if (key === 'page' || key === 'per_page') {
      filter[key] = parseInt(value);
      continue;
    }

    if (key === 'sort') {
      filter[key] = isArrayValue(supportedSorts, value) ? value : undefined;
      continue;
    }

    filter[key] = isArrayValue(supportedOrders, value) ? value : undefined;
  }

  return filter;
}

export function stringifyFilter(filter: ReposFilter): string {
  const stringifiedFilter = new URLSearchParams();

  for (const key in filter) {
    if (!isObjectKey(filter, key) || !filter[key]) {
      continue;
    }

    if (key === 'q') {
      stringifiedFilter.set(key, stringifyQueryParams(filter[key]));
      continue;
    }

    const value = filter[key];

    if (!value) {
      continue;
    }

    stringifiedFilter.set(key, `${value}`);
  }

  return stringifiedFilter.toString();
}
