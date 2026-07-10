import { createApp } from 'vue';
import 'normalize.css';
import AfronsGameUi from 'afrons-game-ui';
import 'afrons-game-ui/style.css';
import App from './App.vue';
import './styles/app.scss';

const app = createApp(App);
app.use(AfronsGameUi);
app.mount('#app');
