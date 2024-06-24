import { Badge, Flex, Link } from '@radix-ui/themes';

export const Topics = ({ topics }: { topics: readonly string[] }) => {
  if (!topics.length) return null;

  return (
    <Flex gap="1" wrap="wrap">
      {topics.slice(0, 10).map((topic) => (
        <Badge key={topic}>
          <Link
            color="indigo"
            underline="hover"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://github.com/topics/${topic}`}
          >
            {topic}
          </Link>
        </Badge>
      ))}
    </Flex>
  );
};
