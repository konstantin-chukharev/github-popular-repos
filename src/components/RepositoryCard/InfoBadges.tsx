import { Badge, Flex, Link } from '@radix-ui/themes';
import {
  BackpackIcon,
  CodeIcon,
  PersonIcon,
  StarIcon,
} from '@radix-ui/react-icons';
import { formatDate } from 'src/utils/formatDate';

import { RepositoryCardData } from './types';

export const InfoBadges = ({
  repository,
}: {
  repository: RepositoryCardData;
}) => {
  const { owner, stargazers_count, language, created_at, updated_at } =
    repository;

  return (
    <Flex gap="1" wrap="wrap" data-testid="InfoBadges">
      <Badge
        size="2"
        color="gold"
        className="CardContentBadge"
        data-testid="StarsBadge"
      >
        <StarIcon />
        {stargazers_count}
      </Badge>

      {language ? (
        <Badge
          size="2"
          color="gray"
          className="CardContentBadge"
          data-testid="LanguageBadge"
        >
          <CodeIcon />
          <Link
            href={`https://github.com/topics/${language}`}
            color="gray"
            underline="none"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="LanguageLink"
          >
            {language}
          </Link>
        </Badge>
      ) : null}

      <Badge
        size="2"
        color="gray"
        className="CardContentBadge"
        data-testid="OwnerTypeBadge"
      >
        {owner.type === 'Organization' ? <BackpackIcon /> : <PersonIcon />}
        <Link
          href={owner.html_url}
          color="gray"
          underline="none"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="OwnerLink"
        >
          {owner.login}
        </Link>
      </Badge>

      <Badge
        size="2"
        color="gray"
        className="CardContentBadge"
        data-testid="CreatedAtBadge"
      >
        Created {formatDate(created_at)}
      </Badge>

      <Badge
        size="2"
        color="gray"
        className="CardContentBadge"
        data-testid="UpdatedAtBadge"
      >
        Updated {formatDate(updated_at)}
      </Badge>
    </Flex>
  );
};
