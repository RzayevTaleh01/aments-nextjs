export const registerConstraints = {
  email: {
    presence: { allowEmpty: false, message: "^Email is required" },
    email: { message: "^Invalid email format" },
  },
  username: {
    presence: { allowEmpty: false, message: "^Username is required" },
    length: { minimum: 3, maximum: 32, tooShort: "^Username must be at least 3 characters", tooLong: "^Username must be at most 32 characters" },
    format: { pattern: "^[a-zA-Z0-9_]+$", message: "^Username can contain only letters, numbers, and _" },
  },
  password: {
    presence: { allowEmpty: false, message: "^Password is required" },
    length: { minimum: 6, tooShort: "^Password must be at least 6 characters" },
  },
  passwordConfirm: {
    presence: { allowEmpty: false, message: "^Please confirm your password" },
    equality: { attribute: "password", message: "^Passwords do not match" },
  },
  first_name: {
    presence: { allowEmpty: false, message: "^First name is required" },
  },
  last_name: {
    presence: { allowEmpty: false, message: "^Last name is required" },
  },
  phoneNumber: {
    presence: { allowEmpty: false, message: "^Phone number is required" },
    format: { pattern: "^\\d{7,15}$", message: "^Phone number must contain only digits (7-15 digits)" },
  },
  post_index: {
    presence: { allowEmpty: false, message: "^Postal code is required" },
    format: { pattern: "^\\d{3,10}$", message: "^Postal code must contain only digits" },
  },
  country: {
    presence: { allowEmpty: false, message: "^Country is required" },
  },
  region: {
    presence: { allowEmpty: false, message: "^Region/State is required" },
  },
  city: {
    presence: { allowEmpty: false, message: "^City is required" },
  },
  street: {
    presence: { allowEmpty: false, message: "^Street is required" },
  },
  home_number: {
    presence: { allowEmpty: false, message: "^House number is required" },
  },
  home_office: {
    presence: { allowEmpty: false, message: "^Apartment/Office is required" },
  },
  acceptTerms: {
    inclusion: { within: [true], message: "^You must accept the Terms and Conditions" },
  },
  acceptPrivacy: {
    inclusion: { within: [true], message: "^You must consent to personal data processing" },
  },
};

export function validationConstraints(_, type) {
  if (type === "register") return registerConstraints;
  return {};
}
