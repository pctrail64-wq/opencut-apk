import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.opencut.classic",
  appName: "OpenCut",
  webDir: "out",
  server: { androidScheme: "https" },
  android: {
    buildOptions: {
      releaseType: "APK",
    },
  },
};

export default config;
