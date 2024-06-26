import { Button, Flex, Skeleton, Text } from '@radix-ui/themes';
import { useSearchParams } from 'react-router-dom';
import { parseFilter, stringifyFilter } from '../../utils/appFilter';

type PaginationControlsProps = {
  loading?: boolean;
  totalCount: number;
  perPage: number;
};

/**
 * Controls to navigate between pages of a paginated list.
 * Shows the current count of items and buttons to go to the previous and next pages.
 */
export const PaginationControls = ({
  loading = false,
  totalCount,
  perPage,
}: PaginationControlsProps) => {
  const [searchParams, setSearchParams] = useSearchParams({ page: '1' });
  const filter = parseFilter(searchParams);

  const currentCount = filter.page
    ? Math.min(filter.page * perPage, totalCount)
    : 0;

  const hasPreviousPage = totalCount > 0 && filter.page && filter.page > 1;
  const hasNextPage =
    totalCount > 0 &&
    filter.page &&
    filter.page < Math.ceil(totalCount / perPage);

  const goToPreviousPage = () => {
    if (filter.page && hasPreviousPage) {
      setSearchParams(stringifyFilter({ ...filter, page: filter.page - 1 }));
    }
  };

  const goToNextPage = () => {
    if (filter.page && hasNextPage) {
      setSearchParams(stringifyFilter({ ...filter, page: filter.page + 1 }));
    }
  };

  return (
    <Flex gap="2" justify="between" data-testid="PaginationControls">
      <Button
        disabled={!hasPreviousPage}
        onClick={goToPreviousPage}
        data-testid="PreviousPageButton"
      >
        Previous
      </Button>

      <Skeleton loading={loading} width="100px" data-testid="CounterSkeleton">
        <Text weight="medium">{`${currentCount} of ${totalCount}`}</Text>
      </Skeleton>

      <Button
        disabled={!hasNextPage}
        onClick={goToNextPage}
        data-testid="NextPageButton"
      >
        Next
      </Button>
    </Flex>
  );
};
