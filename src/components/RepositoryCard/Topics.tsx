import { Badge, Flex, Link } from '@radix-ui/themes';

export const Topics = ({ topics }: { topics: readonly string[] }) => {
  if (!topics.length) return null;

  return (
    <Flex gap="1" wrap="wrap" data-testid="Topics">
      {topics.slice(0, 10).map((topic) => (
        <Badge key={topic} data-testid="TopicBadge">
          <Link
            color="indigo"
            underline="hover"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://github.com/topics/${topic}`}
            data-testid="TopicLink"
          >
            {topic}
          </Link>
        </Badge>
      ))}
    </Flex>
  );
};
