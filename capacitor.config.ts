import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'edu.galileo.eventosapp',
  appName: 'AppEventos',
  webDir: 'www',
  /*cordova: {
    accessOrigins: ["*"]
  },
  server: {
    hostname: "localhost",
    allowNavigation: ["*"]
  },*/
  plugins: {
    GoogleAuth: {
      clientId: '213739652036-mihsbsqs8h3jrdam3ujkk3ufcbt66rrf.apps.googleusercontent.com',
      androidClientId: '213739652036-mihsbsqs8h3jrdam3ujkk3ufcbt66rrf',
      scopes: ['profile', 'email'],
      serverClientId: '213739652036-mihsbsqs8h3jrdam3ujkk3ufcbt66rrf.apps.googleusercontent.com',
      //serverClientId: '338657833350-0nh8s5v40ra1pkgq5hhd37vn76f3pfed.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
