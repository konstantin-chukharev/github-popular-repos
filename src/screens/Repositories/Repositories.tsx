import { Card, Flex, Text } from '@radix-ui/themes';

import { useRepositories } from '../../hooks/useRepositories';
import { RepositoryCard } from '../../components/RepositoryCard/RepositoryCard';

export const Repositories = () => {
  const { data } = useRepositories();

  if (!data.items.length) {
    return (
      <Flex justify="center">
        <Card>
          <Text align="center">No repositories found</Text>
        </Card>
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap="2">
      {data.items.map((repository) => (
        <RepositoryCard key={repository.id} repository={repository} />
      ))}
    </Flex>
  );
};
