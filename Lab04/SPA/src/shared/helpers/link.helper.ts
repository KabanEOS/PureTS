// eslint-disable-next-line max-len
export const urlRegExp = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig;
  

export const validateUrl = (url: string): boolean => {
  const match = url.match(urlRegExp);

  return !!(match && match.length > 0 && match[0].length === url.length);
};

export const containsUrl = (url: string): boolean => {
  const match = url.match(urlRegExp);

  return !!(match && match.length > 0);
};
