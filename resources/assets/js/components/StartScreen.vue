<template>
    <div class="container-fluid" style="pointer-events:none; position: absolute; z-index: 99;top: 0;left: 0; right: 0;bottom: 0;">

        <div class="col-md-6 col-md-offset-3 mt-30" v-if="store.currentScreen == 'main-menu'" style="pointer-events:all; ">
            <div class="nes-container is-dark with-title is-rounded">
                <p class="title">Main menu</p>
                <p>Welcome to Burrec mos u zemero</p>

                <button @click="switchScreen('add-players')" class="nes-btn is-success is-full-width">Start new game</button>
                <button @click="rollDice(6)" class="nes-btn is-primary is-full-width">Join game</button>
                <button @click="rollDice(6)" class="nes-btn is-primary is-full-width">Settings</button>
            </div>
        </div>

        <div class="col-md-6 col-md-offset-3 mt-30" v-if="store.currentScreen == 'add-players'" style="pointer-events:all; ">
            <div class="nes-container is-dark with-title is-rounded">
                <p class="title">Add players</p>
                <p>Enter player names</p>
                <p>Blank fields will be added as computers</p>

                <div v-for="(n, index) in playerNames" style="background-color:#212529; padding: 1rem;" class="nes-field">
                    <input type="text" v-model="playerNames[index]" class="nes-input is-dark" :placeholder="`Player ${index + 1}`">
                </div>

                <button @click="startGame()" class="nes-btn is-success is-full-width is-rounded">Ready!</button>
            </div>
        </div>

        <game-interface v-if="store.currentScreen == 'game-screen'"></game-interface>
    </div>
</template>
<script>
  export default {
    props: {},
    components: {},
    mounted() {
      this.$nextTick(function() {

      }.bind(this));
    },
    data() {
      return {
        store: window.ApplicationStore,
        // playerNames: ['Player one','Player two','Player three','Player four']
        playerNames: ['','','','']
      };
    },
    events: {},
    methods: {
      startGame(){
        EventBus.fire('EventKeys.game.start', this.playerNames);
      }
    },
  };
</script>
