import { Container, Skeleton } from '@radix-ui/themes';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Repositories } from './Repositories';

export const RepositoriesScreen = () => {
  return (
    <Container>
      <Suspense fallback={<Skeleton />}>
        <ErrorBoundary fallback={<span>Error has happened</span>}>
          <Repositories />
        </ErrorBoundary>
      </Suspense>
    </Container>
  );
};
