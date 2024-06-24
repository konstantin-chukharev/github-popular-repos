import { describe, expect, test } from 'vitest';
import { act, render, screen, waitFor } from 'tests/react';

import { PaginationControls } from './PaginationControls';

describe('PaginationControls', () => {
  test('renders the single page', () => {
    const totalCount = 10;
    const perPage = 10;

    render(<PaginationControls totalCount={totalCount} perPage={perPage} />);

    expect(screen.getByTestId('PaginationControls')).toBeInTheDocument();
    expect(screen.getByText(`${perPage} of ${totalCount}`)).toBeInTheDocument();
    expect(screen.getByTestId('PreviousPageButton')).toBeDisabled();
    expect(screen.getByTestId('NextPageButton')).toBeDisabled();
  });

  test('renders skeleton', () => {
    render(<PaginationControls loading={true} totalCount={0} perPage={0} />);

    expect(screen.getByTestId('CounterSkeleton')).toBeInTheDocument();
    expect(screen.getByTestId('PreviousPageButton')).toBeDisabled();
    expect(screen.getByTestId('NextPageButton')).toBeDisabled();
  });

  test('pagination works correctly', async () => {
    const totalCount = 20;
    const perPage = 10;

    render(<PaginationControls totalCount={totalCount} perPage={perPage} />);

    const nextPageButton = screen.getByTestId('NextPageButton');
    const previousPageButton = screen.getByTestId('PreviousPageButton');

    expect(screen.getByText(`${perPage} of ${totalCount}`)).toBeInTheDocument();
    expect(nextPageButton).not.toBeDisabled();
    expect(previousPageButton).toBeDisabled();

    act(() => {
      nextPageButton.click();
    });

    await waitFor(() => {
      expect(
        screen.getByText(`${perPage * 2} of ${totalCount}`),
      ).toBeInTheDocument();
      expect(nextPageButton).toBeDisabled();
      expect(previousPageButton).not.toBeDisabled();
    });

    act(() => {
      previousPageButton.click();
    });

    await waitFor(() => {
      expect(
        screen.getByText(`${perPage} of ${totalCount}`),
      ).toBeInTheDocument();
      expect(nextPageButton).not.toBeDisabled();
      expect(previousPageButton).toBeDisabled();
    });
  });
});
