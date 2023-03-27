import { defineConfig } from 'vite';
import pugPlugin from 'vite-plugin-pug';

const options = { pretty: true }; // FIXME: pug pretty is deprecated!
const locals = { title: 'Dictionary' };

export default defineConfig({
  plugins: [pugPlugin(options, locals)],
});
