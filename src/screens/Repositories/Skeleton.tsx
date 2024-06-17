import { useMemo } from 'react';
import { RepositoryCard } from '../../components/RepositoryCard/RepositoryCard';
import { Flex } from '@radix-ui/themes';

type SkeletonProps = {
  perPage?: number;
};

export const Skeleton = ({ perPage = 30 }: SkeletonProps) => {
  const skeletonItems = useMemo(
    () => Array.from({ length: perPage }, () => crypto.randomUUID()),
    [perPage],
  );

  return (
    <Flex direction="column" gap="2">
      {skeletonItems.map((id) => (
        <RepositoryCard key={id} loading />
      ))}
    </Flex>
  );
};
