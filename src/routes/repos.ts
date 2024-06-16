import type { LoaderFunctionArgs } from 'react-router-dom';

export function reposLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  
}
