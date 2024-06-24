import { afterEach, describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor } from 'tests/react';

import { RepositoryCard } from './RepositoryCard';
import type { RepositoryCardData, RepositoryCardProps } from './types';

describe('RepositoryCard', () => {
  const repository = {
    name: 'example-repo',
    description: 'This is an example repository',
    stargazers_count: 100,
    owner: {
      type: 'User',
      login: 'example-owner',
      avatar_url: 'https://avatars.githubusercontent.com/u/9892522?v=4',
      html_url: 'https://github.com/example-owner',
    },
    topics: ['react', 'typescript'],
    language: 'typescript',
    created_at: '2020-01-01T00:00:00',
    updated_at: '2021-01-01T00:00:00',
    html_url: 'https://github.com/example-owner/example-repo',
  } satisfies RepositoryCardData;

  const toggleStar = vi.fn(() => {});

  const renderCard = (overrideProps?: Partial<RepositoryCardProps>) =>
    render(
      <RepositoryCard
        repository={repository}
        toggleStar={toggleStar}
        hasStarred={() => false}
        isStarringAvailable
        {...overrideProps}
      />,
    );

  afterEach(() => {
    toggleStar.mockClear();
  });

  test('renders card', () => {
    renderCard();

    expect(screen.getByTestId('RepositoryCard')).toBeInTheDocument();
  });

  test('renders name', () => {
    renderCard();

    const nameLink = screen.getByTestId('RepositoryName');
    expect(nameLink).toBeInTheDocument();
    expect(nameLink).toHaveAttribute('href', repository.html_url);
  });

  test('renders description', () => {
    renderCard();

    expect(screen.getByTestId('RepositoryDescription')).toHaveTextContent(
      repository.description,
    );
  });

  test('renders stars count', () => {
    renderCard();

    expect(screen.getByTestId('StarsBadge')).toHaveTextContent(
      `${repository.stargazers_count}`,
    );
  });

  test('renders language', () => {
    renderCard();

    expect(screen.getByTestId('LanguageBadge')).toBeInTheDocument();
    expect(screen.getByTestId('LanguageLink')).toHaveTextContent(
      repository.language,
    );
    expect(screen.getByTestId('LanguageLink')).toHaveAttribute(
      'href',
      'https://github.com/topics/typescript',
    );
  });

  test('renders owner username', () => {
    renderCard();

    expect(screen.getByTestId('StarsBadge')).toHaveTextContent(
      `${repository.stargazers_count}`,
    );
  });

  test('renders topics', () => {
    renderCard();

    expect(screen.getByTestId('Topics')).toBeInTheDocument();
    expect(screen.getAllByTestId('TopicBadge')).toHaveLength(2);

    screen.getAllByTestId('TopicLink').forEach((link) => {
      expect(link).toHaveTextContent(/react|typescript/);
      expect(link).toHaveAttribute(
        'href',
        expect.stringMatching(/https:\/\/github.com\/topics\/react|typescript/),
      );
    });
  });

  test('renders star button and toggles it', async () => {
    const { rerender } = renderCard();

    const starButton = screen.getByTestId('StarButton');

    expect(starButton).toBeInTheDocument();
    expect(starButton).toHaveClass('rt-variant-soft');

    starButton.click();

    expect(toggleStar).toHaveBeenCalled();

    rerender(
      <RepositoryCard
        repository={repository}
        toggleStar={toggleStar}
        hasStarred={() => true}
        isStarringAvailable
      />,
    );

    await waitFor(() => {
      expect(starButton).toHaveClass('rt-variant-solid');
    });
  });

  test('renders disabled star button', () => {
    renderCard({ isStarringAvailable: false });

    const starButton = screen.getByTestId('StarButton');

    expect(starButton).toBeInTheDocument();
    expect(starButton).toBeDisabled();
  });

  test('matches snapshot', () => {
    renderCard();
    expect(screen.getByTestId('RepositoryCard')).toMatchSnapshot();
  });
});
