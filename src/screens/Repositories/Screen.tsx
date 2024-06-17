import { Container, Skeleton } from '@radix-ui/themes';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Repositories } from './Repositories';
import { Error } from './Error';

export const RepositoriesScreen = () => {
  return (
    <Container size="2" minHeight="100vh">
      <Suspense fallback={<Skeleton />}>
        <ErrorBoundary FallbackComponent={Error}>
          <Repositories />
        </ErrorBoundary>
      </Suspense>
    </Container>
  );
};
