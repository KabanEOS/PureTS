export const formatDate = (date: Date): string => {
  const dateObject = new Date(date);
  return `${dateObject.getUTCDate()}/${dateObject.getUTCMonth()}/${dateObject.getUTCFullYear()}, ${dateObject.getHours()}:${dateObject.getMinutes() > 9 ? dateObject.getMinutes() : '0' + dateObject.getMinutes()}`;
};

export const formatShortCurrentDate = (): string => {
  const dateObject = new Date();
  return `${dateObject.getUTCDate() < 10 ? '0' + dateObject.getUTCDate() : dateObject.getUTCDate()}/${(dateObject.getUTCMonth() + 1) < 10 ? '0' + (dateObject.getUTCMonth() + 1) : dateObject.getMonth()}/${dateObject.getUTCFullYear()}`;
};