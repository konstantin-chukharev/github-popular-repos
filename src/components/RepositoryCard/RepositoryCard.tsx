import { forwardRef } from 'react';
import { Repository } from '../../api/types';
import {
  Card,
  Flex,
  Text,
  Link,
  Avatar,
  IconButton,
  Badge,
} from '@radix-ui/themes';
import {
  StarIcon,
  StarFilledIcon,
  CodeIcon,
  PersonIcon,
  BackpackIcon,
} from '@radix-ui/react-icons';
import { Topics } from './Topics';

export type RepositoryCardProps = {
  repository?: Repository;
  toggleStar: () => void;
  hasStarred: () => boolean;
};

export const RepositoryCard = forwardRef<HTMLDivElement, RepositoryCardProps>(
  ({ repository, toggleStar, hasStarred }, ref) => {
    if (!repository) {
      return null;
    }

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
      <Card size="2" ref={ref}>
        <Flex gap="1" justify="between">
          <Flex direction="column" gap="3">
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

            <Flex gap="1">
              <Badge size="2" color="gold">
                <StarIcon />
                {stargazers_count}
              </Badge>

              {language ? (
                <Badge size="2" color="gray">
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

              <Badge size="2" color="gray">
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
            </Flex>
          </Flex>

          <IconButton
            variant={hasStarred() ? 'solid' : 'soft'}
            onClick={toggleStar}
          >
            {hasStarred() ? <StarFilledIcon /> : <StarIcon />}
          </IconButton>
        </Flex>
      </Card>
    );
  },
);

RepositoryCard.displayName = 'RepositoryCard';
