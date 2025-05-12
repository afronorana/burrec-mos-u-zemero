<template>
    <div class="game-interface-wrapper">

            <div v-for="player in store.players" style="pointer-events: all"
                 class="player-name nes-container is-dark is-rounded"
                :style="{color: player.color}">
                <p>{{player.name}}</p>
            </div>


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
        playerNames: ['Player one','Player two','Player three','Player four']
        // playerNames: ['','','','']
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
