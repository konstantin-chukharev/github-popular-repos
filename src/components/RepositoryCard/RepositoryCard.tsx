import './styles.css';

import { forwardRef } from 'react';
import { Card, Flex, Text, Link, Avatar, Badge } from '@radix-ui/themes';
import {
  StarIcon,
  CodeIcon,
  PersonIcon,
  BackpackIcon,
} from '@radix-ui/react-icons';

import { Repository } from '../../api/types';
import { formatDate } from '../../utils/formatDate';
import { Topics } from './Topics';
import { StarButton } from './StarButton';

export type RepositoryCardProps = {
  repository: Repository;
  toggleStar: () => void;
  hasStarred: () => boolean;
  isStarringAvailable: boolean;
};

export const RepositoryCard = forwardRef<HTMLDivElement, RepositoryCardProps>(
  ({ repository, isStarringAvailable, toggleStar, hasStarred }, ref) => {
    const {
      owner,
      html_url,
      name,
      description,
      topics,
      stargazers_count,
      language,
    } = repository;

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
              >
                {name}
              </Link>
            </Flex>

            {description ? (
              <Text size="2" weight="medium" color="gray">
                {description}
              </Text>
            ) : null}

            <Topics topics={topics} />

            <Flex gap="1" wrap="wrap">
              <Badge size="2" color="gold" className="CardContentBadge">
                <StarIcon />
                {stargazers_count}
              </Badge>

              {language ? (
                <Badge size="2" color="gray" className="CardContentBadge">
                  <CodeIcon />
                  <Link
                    href={`https://github.com/topics/${language}`}
                    color="gray"
                    underline="none"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {language}
                  </Link>
                </Badge>
              ) : null}

              <Badge size="2" color="gray" className="CardContentBadge">
                {owner.type === 'Organization' ? (
                  <BackpackIcon />
                ) : (
                  <PersonIcon />
                )}
                <Link
                  href={owner.html_url}
                  color="gray"
                  underline="none"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {owner.login}
                </Link>
              </Badge>

              <Badge size="2" color="gray" className="CardContentBadge">
                Created {formatDate(repository.created_at)}
              </Badge>

              <Badge size="2" color="gray" className="CardContentBadge">
                Updated {formatDate(repository.pushed_at)}
              </Badge>
            </Flex>
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
