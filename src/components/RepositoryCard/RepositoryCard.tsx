import { forwardRef } from 'react';
import { Repository } from '../../api/types';
import {
  Card,
  Flex,
  Text,
  Link,
  Avatar,
  IconButton,
  Skeleton,
} from '@radix-ui/themes';
import { StarIcon } from '@radix-ui/react-icons';
import { Topics } from './Topics';
import { useStarRepository } from '../../hooks/useStarRepository';

export type RepositoryCardProps = {
  repository?: Repository;
  loading?: boolean;
};

export const RepositoryCard = forwardRef<HTMLDivElement, RepositoryCardProps>(
  ({ repository, loading = false }, ref) => {
    const { isStarred, toggleStar } = useStarRepository(repository?.full_name);

    if (!repository) {
      return null;
    }

    const { owner, html_url, full_name, description, topics } = repository;

    return (
      <Skeleton loading={loading} minHeight="120px">
        <Card size="2" ref={ref}>
          <Flex gap="1" justify="between">
            <Flex direction="column" gap="3">
              <Flex gap="2">
                <Avatar
                  size="1"
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
                  {full_name}
                </Link>
              </Flex>

              {description ? <Text size="2">{description}</Text> : null}

              <Topics topics={topics} />
            </Flex>

            <IconButton
              variant={isStarred ? 'solid' : 'soft'}
              onClick={toggleStar}
            >
              <StarIcon />
            </IconButton>
          </Flex>
        </Card>
      </Skeleton>
    );
  },
);

RepositoryCard.displayName = 'RepositoryCard';
