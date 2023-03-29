import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-refresh";
import EnvCompatible from "vite-plugin-env-compatible";
import tsConfigPaths from "vite-tsconfig-paths";
import EnvironmentPlugin from "vite-plugin-environment";

export default defineConfig({
  envPrefix: "REACT_APP_",
  resolve: {
    alias: {
      "./runtimeConfig": "./runtimeConfig.browser",
    },
  },
  plugins: [
    react(),
    EnvCompatible(),
    tsConfigPaths(),
    EnvironmentPlugin("all", { prefix: "REACT_APP_" }),
  ],
});
