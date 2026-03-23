import { createApp } from 'vue';
import StartScreen from './../components/StartScreen.vue';
import GameInterface from './../components/GameInterface.vue';
import PawnGeometryMaterial from './../components/PawnGeometryMaterial.vue';
import PawnFigure from './../components/PawnFigure.vue';
import DiceFigure from './../components/DiceFigure.vue';

const app = createApp({});

app.component('start-screen', StartScreen);
app.component('game-interface', GameInterface);
app.component('pawn-geometry-material', PawnGeometryMaterial);
app.component('pawn-figure', PawnFigure);
app.component('dice-figure', DiceFigure);

export default app;
