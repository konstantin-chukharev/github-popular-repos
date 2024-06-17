import { Badge, Flex } from '@radix-ui/themes';

export const Topics = ({ topics }: { topics: string[] }) => {
  if (!topics.length) return null;

  return (
    <Flex gap="1" wrap="wrap">
      {topics.map((topic) => (
        <Badge key={topic}>{topic}</Badge>
      ))}
    </Flex>
  );
};
