// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const fNameEmptyText = 'First name is empty.';
const lNameEmptyText = 'Last name is empty.';
const nameSpaceText = 'The name can not contain a space.';

const emailErrorText = 'Please enter a valid email.';

const passwordEmptyText = 'Please enter your password.';
const confirmEmptyText = 'Please confirm your password.';
const diffPasswordText = 'The two passwords that you entered do not match!';
const passwordLengthErrorText = 'Your password must be between 8 and 30 characters.';

export {
  validateEmail,
  emailErrorText,
  passwordEmptyText,
  fNameEmptyText,
  lNameEmptyText,
  nameSpaceText,
  confirmEmptyText,
  diffPasswordText,
  passwordLengthErrorText,
};
