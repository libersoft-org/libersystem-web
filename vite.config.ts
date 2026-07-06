import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type Plugin } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve country flag SVGs from node_modules in dev, copy to build output in production.
function countryFlags(): Plugin {
	const flagsDir = path.resolve(__dirname, 'node_modules/country-flags/svg');
	return {
		name: 'country-flags',
		configureServer(server): void {
			server.middlewares.use('/flags', (req, res, next) => {
				const file = path.join(flagsDir, req.url || '');
				if (fs.existsSync(file)) {
					res.setHeader('Content-Type', 'image/svg+xml');
					fs.createReadStream(file).pipe(res);
				} else next();
			});
		},
		closeBundle(): void {
			const outDir = path.resolve(__dirname, 'build', 'flags');
			if (!fs.existsSync(flagsDir)) return;
			if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
			for (const file of fs.readdirSync(flagsDir)) if (file.endsWith('.svg')) fs.copyFileSync(path.join(flagsDir, file), path.join(outDir, file));
		},
	};
}

export default defineConfig({
	plugins: [sveltekit(), countryFlags()],
	server: {
		port: 6007,
		host: true,
		allowedHosts: true,
		watch: {
			usePolling: true
		}
	}
});
