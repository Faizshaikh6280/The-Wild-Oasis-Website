export function validateAlphanumeric(input) {
  const alphanumericPattern = /^[a-zA-Z0-9]{6,12}$/;
  return alphanumericPattern.test(input);
}
