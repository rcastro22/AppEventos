import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'AppEventos',
  webDir: 'www',
  cordova: {
    accessOrigins: ["*"]
  },
  server: {
    hostname: "hostname",
    allowNavigation: ["*"]
  }
};

export default config;
