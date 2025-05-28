const apiBaseUrl = 'http://192.168.1.2';
// const apiPort = 81;

export const environment = {
  production: false,
  // apiUrl: `${apiBaseUrl}:${apiPort}`,
  apiUrl: `${apiBaseUrl}`,
  // این قسمت برای من هست که دسترسی به api ندارم
  // اکه فعال کنی از api استفاده نمی کنه
  disableApi: false,
};
