import { createApp } from 'vue';
import 'normalize.css';
import AfronsGameUi from 'afrons-game-ui';
import 'afrons-game-ui/style.css';
import App from './App.vue';
import './styles/app.scss';

// Called by src/boot.js once the landing page is out of the way.
export function mountGame() {
  const app = createApp(App);
  app.use(AfronsGameUi);
  app.mount('#app');
}
