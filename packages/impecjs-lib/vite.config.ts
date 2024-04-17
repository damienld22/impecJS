import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { fileURLToPath, URL } from "node:url";
import { resolve } from "node:path";

export default defineConfig({
	plugins: [
		nodePolyfills(),
		dts({
			rollupTypes: true,
		}),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	build: {
		lib: {
			entry: resolve(__dirname, "src/index.ts"),
			name: "impecjs",
			formats: ["es", "cjs"],
		},
		rollupOptions: {
			output: {
				chunkFileNames: "[name].js",
				inlineDynamicImports: false,
				manualChunks: {
					"create-impecjs": ["src/create-impecjs.ts"],
				},
			},
		},
	},
});
