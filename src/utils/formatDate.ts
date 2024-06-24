export function formatDate(date: string | number | Date): string {
  return new Date(date).toLocaleDateString(window.navigator.language, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
