import { useEffect } from 'react';
import { Callout, Flex } from '@radix-ui/themes';
import { useSearchParams } from 'react-router-dom';
import { InfoCircledIcon } from '@radix-ui/react-icons';

import { useRepositories } from '../../hooks/useRepositories';
import { RepositoryCard } from '../../components/RepositoryCard/RepositoryCard';
import { parseFilter, stringifyFilter } from '../../utils/appFilter';
import { PaginationControls } from '../../components/PaginationControls';
import { FilterControls } from '../../components/FilterControls';

const pageSize = 10;

export const Repositories = () => {
  const [searchParams, setSearchParams] = useSearchParams({ page: '1' });
  const filter = parseFilter(searchParams);

  const {
    data,
    isStarringAvailable,
    toggleStar,
    hasStarred,
    refetchStarredRepositories,
  } = useRepositories({
    page: filter.page,
    first: pageSize,
    language: filter.language,
    starred: filter.starred,
  });

  useEffect(() => {
    if (filter.starred) {
      refetchStarredRepositories();
    }
  }, [filter.starred, refetchStarredRepositories]);

  return (
    <Flex
      direction="column"
      gap="4"
      flexGrow="1"
      flexShrink="0"
      data-testid="Repositories"
    >
      <FilterControls
        filter={filter}
        onChange={(newFilter) => {
          setSearchParams(stringifyFilter(newFilter));
        }}
      />

      <Flex direction="column" gap="2" flexGrow="1" flexShrink="0">
        {data.total_count === 0 ? (
          <Callout.Root
            color="gray"
            variant="soft"
            data-testid="NoRepositories"
          >
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>No repositories found</Callout.Text>
          </Callout.Root>
        ) : null}

        {data.items.map((repository) => (
          <RepositoryCard
            key={repository.id}
            repository={repository}
            isStarringAvailable={isStarringAvailable}
            toggleStar={() => {
              toggleStar(repository);
            }}
            hasStarred={() => hasStarred(repository)}
          />
        ))}
      </Flex>

      <PaginationControls totalCount={data.total_count} perPage={pageSize} />
    </Flex>
  );
};
