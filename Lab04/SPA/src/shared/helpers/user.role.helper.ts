const opRegex = /@optimumpareto.com/;
const mjnRegex = /@mysljaknaukowiec.pl/;

export const filterExternalUser = (userMail: string): boolean => {
  return (!opRegex.test(userMail) && !mjnRegex.test(userMail));
};

export const filterInternalUser = (userMail: string): boolean => {
  return userMail === 'adrianmaznio@gmail.com' || (opRegex.test(userMail) || mjnRegex.test(userMail));
};