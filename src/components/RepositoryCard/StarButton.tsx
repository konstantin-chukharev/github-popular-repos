import { forwardRef } from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@radix-ui/themes';
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';

type StarButtonProps = {
  hasStarred: boolean;
  onToggleStar: () => void;
};

export const StarButton = forwardRef<
  HTMLButtonElement,
  StarButtonProps & IconButtonProps
>(({ hasStarred, disabled, onToggleStar, ...props }, ref) => {
  const content = (
    <IconButton
      {...props}
      ref={ref}
      disabled={disabled}
      variant={hasStarred ? 'solid' : 'soft'}
      onClick={onToggleStar}
      data-testid="StarButton"
    >
      {hasStarred ? <StarFilledIcon /> : <StarIcon />}
    </IconButton>
  );

  if (disabled) {
    return (
      <Tooltip
        content="Unable to start the repository. Most likely there's no access to the storage or it's full"
        data-testid="StarButtonTooltip"
      >
        {content}
      </Tooltip>
    );
  }

  return content;
});

StarButton.displayName = 'StarButton';
