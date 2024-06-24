import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Callout, Code, Flex, Text } from '@radix-ui/themes';

export const Error = ({ error }: { error: Error }) => (
  <Flex direction="column" flexGrow="1" flexShrink="1" justify="center" data-testid="RepositoriesError">
    <Callout.Root color="red" role="alert">
      <Callout.Icon>
        <ExclamationTriangleIcon />
      </Callout.Icon>

      <Callout.Text weight="medium">
        <Text>Error has happened:</Text>
        <br />
        {error.stack ? (
          <Code style={{ wordBreak: 'break-word' }}>{error.stack}</Code>
        ) : (
          <Text weight="bold">{error.message}</Text>
        )}
      </Callout.Text>
    </Callout.Root>
  </Flex>
);
