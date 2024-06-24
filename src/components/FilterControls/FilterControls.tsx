import { useState } from 'react';
import {
  Button,
  Flex,
  Popover,
  Switch,
  Text,
  TextField,
} from '@radix-ui/themes';
import { CodeIcon, MixerHorizontalIcon } from '@radix-ui/react-icons';

import { AppFilter } from 'src/utils/appFilter';

type FilterControlsProps = {
  loading?: boolean;
  filter: AppFilter;
  onChange: (filter: AppFilter) => void;
};

/**
 * Button to open a popover with filter controls.
 * Controls include toggling starred repositories and filtering by language.
 * onChange callback is called with the new filter when the apply button is clicked.
 */
export const FilterControls = ({
  loading = false,
  filter,
  onChange,
}: FilterControlsProps) => {
  const [starred, setStarred] = useState(filter.starred);
  const [language, setLanguage] = useState(filter.language);

  return (
    <Flex justify="end" data-testid="FilterControls">
      <Popover.Root>
        <Popover.Trigger>
          <Button disabled={loading} data-testid="FilterButton">
            Filter
            <MixerHorizontalIcon />
          </Button>
        </Popover.Trigger>

        <Popover.Content size="2">
          <Flex direction="column" gap="4" data-testid="FilterPopover">
            <Flex gap="2" align="center" justify="between">
              <Text size="2" weight="medium">
                Starred repositories
              </Text>

              <Switch
                disabled={!!language}
                defaultChecked={starred}
                onCheckedChange={setStarred}
                data-testid="StarredSwitch"
              />
            </Flex>

            <TextField.Root
              placeholder="Language"
              disabled={starred}
              value={language}
              onInput={(event) => {
                setLanguage(event.currentTarget.value);
              }}
              data-testid="LanguageTextField"
            >
              <TextField.Slot>
                <CodeIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>

            <Button
              onClick={() => {
                onChange({ ...filter, starred, language });
              }}
              data-testid="ApplyButton"
            >
              Apply
            </Button>
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </Flex>
  );
};
