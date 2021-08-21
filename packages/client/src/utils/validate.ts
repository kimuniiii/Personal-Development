export const validations = {
  email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  firstName: /^[ァ-ヴ]+$/,
  lastName: /^[ァ-ヴ]+$/,
  telephone: /^0(\d-\d{4}|\d{2}-\d{3}|\d{3}-\d{2}|\d{4}-\d)-\d{4}$/,
  postcode: /^\d{3}\d{4}$/,
  ageNumber: /^([1-9]?[0-9]|100)$/, // 0から100までの数字に一致させる
  minPhoneNumberLength: 10,
  maxPhoneNumberLength: 20,
  minPasswordLength: 6,
} as const;
