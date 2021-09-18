export const validations = {
  email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  firstName: /^[ァ-ヴ]+$/,
  lastName: /^[ァ-ヴ]+$/,
  telephone: /^0(\d-\d{4}|\d{2}-\d{3}|\d{3}-\d{2}|\d{4}-\d)-\d{4}$/,
  postcode: /^\d{3}\d{4}$/,
  // 0から100までの数字に一致させる
  ageNumber: /^([1-9]?[0-9]|100)$/,
  minPhoneNumberLength: 10,
  maxPhoneNumberLength: 20,
  minPasswordLength: 6,
  // 10485760バイト = 10,240KB = 10MB
  maxImageSize: 10485760,
} as const;
