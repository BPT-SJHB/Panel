const apiBaseUrl = "https://example.com";
const apiPort = 443;

export const environment = {
  production: true,
  apiUrl: `${apiBaseUrl}:${apiPort}`,
  disableApi: false, // این قسمت برای من هست که دسترسی به api ندارم
};
