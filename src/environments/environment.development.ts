const apiBaseUrl = "http://192.168.1.3";
const apiPort = 81;

export const environment = {
  production: false,
  apiUrl: `${apiBaseUrl}:${apiPort}`,
  // این قسمت برای من هست که دسترسی به api ندارم
  // اکه فعال کنی از api استفاده نمی کنه
  mockTest: false,
};
