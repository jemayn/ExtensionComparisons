
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: "src/my-dashboard.ts", // your web component source file
            formats: ["es"],
        },
        outDir: "../wwwroot/Dashboard", // all compiled files will be placed here
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            external: [/^@umbraco/], // ignore the Umbraco Backoffice package in the build
        },
    }
});