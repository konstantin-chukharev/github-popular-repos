import { Blockquote, Code, Flex, Text } from '@radix-ui/themes';

export const Error = ({ error }: { error: Error }) => (
  <Blockquote color="red">
    <Flex direction="column" gap="1">
      <Text weight="bold">Error has happened:</Text>
      {error.stack ? (
        <Code>{error.stack}</Code>
      ) : (
        <Text weight="bold">{error.message}</Text>
      )}
    </Flex>
  </Blockquote>
);
