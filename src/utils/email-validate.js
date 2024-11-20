export const validate = (inputEmail) => {
  const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  if (!email_regex.test(inputEmail)) {
    return false;
  }
  return true;
};
