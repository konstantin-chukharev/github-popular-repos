import { Flex, Heading } from '@radix-ui/themes';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Error } from './Error';
import { Repositories } from './Repositories';
import { RepositoriesSkeleton } from './Skeleton';

export const RepositoriesScreen = () => {
  return (
    <Flex justify="center" minHeight="100dvh" overflow="hidden">
      <Flex
        gap="3"
        direction="column"
        width="560px"
        px={{ initial: '2', sm: '4' }}
        py={{ initial: '4', sm: '6' }}
      >
        <Heading align="center">
          GitHub trending repositories of the last week
        </Heading>
        <Suspense fallback={<RepositoriesSkeleton />}>
          <ErrorBoundary FallbackComponent={Error}>
            <Repositories />
          </ErrorBoundary>
        </Suspense>
      </Flex>
    </Flex>
  );
};
