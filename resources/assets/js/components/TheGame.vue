<template>
    <div>
    </div>
</template>
<script>
  export default {
    components: {},
    mounted() {
      this.$nextTick(function() {
        this.createPlayers();
        this.startGame();

        EventBus.listen(EventKeys.turns.endTurn, function() {
          this.changePlayersTurn();
        }.bind(this));
        EventBus.listen(EventKeys.turns.repeatTurn, function() {
          this.repeatPlayersTurn();
        }.bind(this));

      }.bind(this));
    },
    data() {
      return {
        store: window.ApplicationStore,
      };
    },
    events: {},

    methods: {
      createPlayers() {
        this.store.players.push(new Player('Player 1', '#CE0000', 1, false));
        this.store.players.push(new Player('Player 2', '#F7D708', 2, false));
        this.store.players.push(new Player('Player 3', '#009ECE', 3, false));
        this.store.players.push(new Player('Player 4', '#9CCF31', 4, false));
        // this.store.players.push(new Player('Player 1', '#CE0000', 1, true));
        // this.store.players.push(new Player('Player 2', '#F7D708', 2, true));
        // this.store.players.push(new Player('Player 3', '#009ECE', 3, true));
        // this.store.players.push(new Player('Player 4', '#9CCF31', 4, true));
      },

      startGame() {
        this.store.currentRound = 1;
        this.changePlayersTurn();
        EventBus.fire('game.start');
      },

      changePlayersTurn() {

        ApplicationStore.gamePlayStatus.isMoving = false;

        /** Check if its first round **/
        let currentPlayer = this.store.players[this.store.currentPlayerId];
        if (currentPlayer)
          currentPlayer.endTurn();

        /** Set next player **/
        if (this.store.currentPlayerId === this.store.players.length - 1) {
          this.store.currentPlayerId = 0;
          this.store.currentRound++;
        } else {
          this.store.currentPlayerId++;
        }

        this.store.players[this.store.currentPlayerId].startTurn();
      },

      repeatPlayersTurn() {
        ApplicationStore.gamePlayStatus.isMoving = false;
        let currentPlayer = this.store.players[this.store.currentPlayerId];
        currentPlayer.endTurn();
        currentPlayer.startTurn();
      },

    },
  };
</script>
