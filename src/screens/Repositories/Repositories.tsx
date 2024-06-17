import { useRepositories } from '../../hooks/useRepositories';
import { RepositoryCard } from '../../components/RepositoryCard/RepositoryCard';
import { Flex } from '@radix-ui/themes';

export const Repositories = () => {
  const { data } = useRepositories();

  return (
    <Flex direction="column" gap="2">
      {data.items.map((repository) => (
        <RepositoryCard key={repository.id} repository={repository} />
      ))}
    </Flex>
  );
};
