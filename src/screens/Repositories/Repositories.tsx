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

  const { data, toggleStar, hasStarred } = useRepositories({
    page: filter.page,
    first: pageSize,
    language: filter.language,
    starred: filter.starred,
  });

  return (
    <Flex direction="column" gap="4" flexGrow="1" flexShrink="0">
      <FilterControls
        filter={filter}
        onChange={(newFilter) => {
          setSearchParams(stringifyFilter(newFilter));
        }}
      />

      <Flex direction="column" gap="2" flexGrow="1" flexShrink="0">
        {data.total_count === 0 ? (
          <Callout.Root color="gray" variant="soft">
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
            toggleStar={() => { toggleStar(repository); }}
            hasStarred={() => hasStarred(repository)}
          />
        ))}
      </Flex>

      <PaginationControls totalCount={data.total_count} perPage={pageSize} />
    </Flex>
  );
};
