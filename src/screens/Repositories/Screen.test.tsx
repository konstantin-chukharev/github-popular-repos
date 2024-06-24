import { describe, test, expect } from 'vitest';
import { render, screen, waitFor } from 'tests/react';

import { server } from 'mocks/server';
import { createGetRepositoriesHandler } from 'mocks/api/getRepositories';

import { RepositoriesScreen } from './Screen';

describe('Repositories', () => {
  test('renders successfully', async () => {
    server.use(createGetRepositoriesHandler());

    render(<RepositoriesScreen />);

    await waitFor(() => {
      expect(screen.getByTestId('RepositoriesSkeleton')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId('Repositories')).toBeInTheDocument();
      expect(screen.getByTestId('FilterControls')).toBeInTheDocument();
      expect(screen.getByTestId('PaginationControls')).toBeInTheDocument();

      expect(screen.getAllByTestId('RepositoryCard')).toHaveLength(10);
    });
  });

  test('renders empty collection', async () => {
    server.use(createGetRepositoriesHandler({ emptyCollection: true }));

    render(<RepositoriesScreen />);

    await waitFor(() => {
      expect(screen.getByTestId('RepositoriesSkeleton')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId('Repositories')).toBeInTheDocument();
      expect(screen.getByText('No repositories found')).toBeInTheDocument();
    });
  });

  test('renders error state', async () => {
    server.use(createGetRepositoriesHandler({ hasError: true }));

    render(<RepositoriesScreen />);

    await waitFor(() => {
      expect(screen.getByTestId('RepositoriesSkeleton')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId('RepositoriesError')).toBeInTheDocument();
      expect(screen.getByText('Error has happened:')).toBeInTheDocument();
    });
  });
});
