import { describe, expect, test, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from 'tests/react';
import type { AppFilter } from 'src/utils/appFilter';

import { FilterControls } from './FilterControls';

describe('FilterControls', () => {
  const onChange = vi.fn(() => {});

  test('renders filter button', () => {
    render(<FilterControls filter={{}} onChange={onChange} />);

    expect(screen.getByTestId('FilterControls')).toBeInTheDocument();
    expect(screen.getByTestId('FilterButton')).not.toBeDisabled();
  });

  test('renders filter popover', async () => {
    render(<FilterControls filter={{}} onChange={onChange} />);

    act(() => {
      screen.getByTestId('FilterButton').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('FilterPopover')).toBeInTheDocument();
      expect(screen.getByTestId('StarredSwitch')).toBeInTheDocument();
      expect(screen.getByTestId('LanguageTextField')).toBeInTheDocument();
      expect(screen.getByTestId('ApplyButton')).toBeInTheDocument();
    });
  });

  test('disables button on loading', () => {
    render(<FilterControls loading={true} filter={{}} onChange={onChange} />);

    expect(screen.getByTestId('FilterButton')).toBeDisabled();
  });

  test('starred toggle is disabled if language is applied', async () => {
    render(
      <FilterControls
        filter={{ language: 'typescript' }}
        onChange={onChange}
      />,
    );

    act(() => {
      screen.getByTestId('FilterButton').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('StarredSwitch')).toBeDisabled();
    });
  });

  test('language input is disabled if starred toggle is active', async () => {
    render(<FilterControls filter={{ starred: true }} onChange={onChange} />);

    act(() => {
      screen.getByTestId('FilterButton').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('LanguageTextField')).toBeDisabled();
    });
  });

  test('calls onChange callback when filter is changed', async () => {
    render(<FilterControls filter={{}} onChange={onChange} />);

    act(() => {
      screen.getByTestId('FilterButton').click();
    });

    const languageInput = await screen.findByTestId('LanguageTextField');
    const applyButton = await screen.findByTestId('ApplyButton');
    const starredSwitch = await screen.findByTestId('StarredSwitch');

    fireEvent.input(languageInput, { target: { value: 'typescript' } });

    act(() => {
      applyButton.click();
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({
        language: 'typescript',
        starred: undefined,
      } satisfies AppFilter);
    });

    expect(starredSwitch).toBeDisabled();

    act(() => {
      fireEvent.input(languageInput, { target: { value: null } });
    });

    await waitFor(() => {
      expect(starredSwitch).not.toBeDisabled();
    });

    act(() => {
      starredSwitch.click();
    });

    await waitFor(() => {
      expect(starredSwitch).toBeChecked();
    });

    act(() => {
      applyButton.click();
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({
        language: '',
        starred: true,
      } satisfies AppFilter);
    });

    expect(languageInput).toBeDisabled();
  });
});
