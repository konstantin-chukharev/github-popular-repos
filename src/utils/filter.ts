import { ReposFilter, ReposQueryParams } from "../api/types";
import { isArrayValue } from "./array";
import { isParsableNumber } from "./number";
import { isObjectKey } from "./object";

type FilterKey = keyof ReposFilter;

const supportedFilterKeys = ['q', 'order', 'page', 'per_page', 'sort'] satisfies ReadonlyArray<FilterKey>;
const supportedSorts = ['stars', 'forks', 'help-wanted-issues', 'updated'] satisfies ReposFilter['sort'][];
const supportedOrders = ['asc', 'desc'] satisfies ReposFilter['order'][];
const supportedVisibilities = ['public', 'private'] satisfies ReposFilter['q']['visibility'][];

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

  for (const param of paramsString.split("+")) {
    const [key, value] = param.split(":");

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

  return encodeURI(stringifiedParams.join("+"));
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
    } else if (key === 'page' || key === 'per_page') {
      filter[key] = parseInt(value);
    } else if (key === 'sort') {
      filter[key] = isArrayValue(supportedSorts, value) ? value : undefined;
    } else if (key === 'order') {
      filter[key] = isArrayValue(supportedOrders, value) ? value : undefined;
    }
  }

  return filter;
}

export function stringifyFilter(filter: ReposFilter): string {
  const stringifiedFilter = new URLSearchParams();

  for (const key in filter) {
    if (!isObjectKey(filter, key) || !filter[key]) {
      continue;
    }

    const value = filter[key];

    if (key === 'q') {
      stringifiedFilter.set(key, stringifyQueryParams(filter[key]));
    } else if (value) {
      stringifiedFilter.set(key, filter[key]);
    }
  }

  return stringifiedFilter.toString();
}
