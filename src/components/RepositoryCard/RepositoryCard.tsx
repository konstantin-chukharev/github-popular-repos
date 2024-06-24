import './styles.css';

import { forwardRef } from 'react';
import { Card, Flex, Text, Link, Avatar } from '@radix-ui/themes';

import { Topics } from './Topics';
import { StarButton } from './StarButton';
import { InfoBadges } from './InfoBadges';
import type { RepositoryCardProps } from './types';

/**
 * Card displaying information about a GitHub repository.
 * Includes the repository name, owner, description, topics, language and amount of stars.
 * Allows starring and unstarring the repository.
 */
export const RepositoryCard = forwardRef<HTMLDivElement, RepositoryCardProps>(
  ({ repository, isStarringAvailable, toggleStar, hasStarred }, ref) => {
    const { owner, html_url, name, description, topics } = repository;

    return (
      <Card size="2" ref={ref} data-testid="RepositoryCard">
        <Flex gap="1" justify="between">
          <Flex gap="3" direction="column">
            <Flex gap="2" align="center">
              <Avatar
                size="2"
                width={32}
                height={32}
                src={owner.avatar_url}
                fallback={owner.login.charAt(0)}
              />

              <Link
                size="3"
                weight="bold"
                href={html_url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="RepositoryName"
              >
                {name}
              </Link>
            </Flex>

            {description ? (
              <Text
                size="2"
                weight="medium"
                color="gray"
                data-testid="RepositoryDescription"
              >
                {description}
              </Text>
            ) : null}

            <Topics topics={topics} />

            <InfoBadges repository={repository} />
          </Flex>

          <StarButton
            disabled={!isStarringAvailable}
            hasStarred={hasStarred()}
            onToggleStar={toggleStar}
          />
        </Flex>
      </Card>
    );
  },
);

RepositoryCard.displayName = 'RepositoryCard';
