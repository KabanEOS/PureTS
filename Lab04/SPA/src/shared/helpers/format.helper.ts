export const formatInputValues = ( values: string[]): string[] => {
  return values.map((value: string) => value.trim().replace('\n', ''));
};

export const formatInputValue = (value: string | undefined): string => {
  if (!value) return '';
  return value.trim().replace('\n', '');
};