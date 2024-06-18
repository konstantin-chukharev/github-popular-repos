import { useMemo } from 'react';
import { Flex, Skeleton } from '@radix-ui/themes';
import { FilterControls } from '../../components/FilterControls';
import { PaginationControls } from '../../components/PaginationControls';

type RepositoriesSkeletonProps = {
  perPage?: number;
};

export const RepositoriesSkeleton = ({
  perPage = 10,
}: RepositoriesSkeletonProps) => {
  const skeletonItems = useMemo(
    () => Array.from({ length: perPage }, () => crypto.randomUUID()),
    [perPage],
  );

  return (
    <Flex direction="column" gap="4" flexGrow="1" flexShrink="0">
      <FilterControls loading filter={{}} onChange={() => {}} />

      <Flex direction="column" gap="2" flexGrow="1" flexShrink="0">
        {skeletonItems.map((id) => (
          <Skeleton
            key={id}
            minHeight="180px"
            style={{ borderRadius: 'var(--radius-4)' }}
          />
        ))}
      </Flex>

      <PaginationControls loading totalCount={0} perPage={perPage} />
    </Flex>
  );
};
