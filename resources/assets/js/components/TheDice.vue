<template>
<!--    <vgl-group>-->
<!--        <vgl-box-geometry name="diceGeometry" width=0.8 height=0.8 depth=0.8></vgl-box-geometry>-->
<!--        <vgl-mesh-lambert-material name="diceMaterial" color="#ffffff"></vgl-mesh-lambert-material>-->
<!--        <vgl-cylinder-geometry name="diceDotGeometry"-->
<!--                               radius-top=0.08-->
<!--                               radius-bottom=0.08-->
<!--                               height=0.05-->
<!--                               :radial-segments=6-->
<!--        ></vgl-cylinder-geometry>-->
<!--        <vgl-mesh-lambert-material name="diceDotMaterial" color="#000000"></vgl-mesh-lambert-material>-->


<!--        <vgl-group :rotation="`${x} ${y} ${z}`" position="5 0.7 5">-->
<!--            &lt;!&ndash;I&ndash;&gt;-->
<!--            <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" position="0 -0.4 0"></vgl-mesh>-->
<!--            &lt;!&ndash;II&ndash;&gt;-->
<!--            <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" position="0.15 0.4 0.15"></vgl-mesh>-->
<!--            <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" position="-0.15 0.4 -0.15"></vgl-mesh>-->

<!--            &lt;!&ndash;III&ndash;&gt;-->
<!--            <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="1.57 0 0"-->
<!--                      position="0.175 0.175 0.4"></vgl-mesh>-->
<!--            <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="1.57 0 0"-->
<!--                      position="0 0 0.4"></vgl-mesh>-->
<!--            <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="1.57 0 0"-->
<!--                      position="-0.175 -0.175 0.4"></vgl-mesh>-->

<!--            &lt;!&ndash;IV&ndash;&gt;-->
<!--            <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="1.57 0 0"-->
<!--                      position="0.15 0.15 -0.4"></vgl-mesh>-->
<!--            <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="1.57 0 0"-->
<!--                      position="0.15 -0.15 -0.4"></vgl-mesh>-->
<!--            <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="1.57 0 0"-->
<!--                      position="-0.15 -0.15 -0.4"></vgl-mesh>-->
<!--            <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="1.57 0 0"-->
<!--                      position="-0.15 0.15 -0.4"></vgl-mesh>-->

<!--            &lt;!&ndash;V&ndash;&gt;-->
<!--            <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="0 0 1.57"-->
<!--                      position="0.4 0.175 0.175"></vgl-mesh>-->
<!--            <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="0 0 1.57"-->
<!--                      position="0.4 0.175 -0.175"></vgl-mesh>-->
<!--            <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="0 0 1.57"-->
<!--                      position="0.4 -0.175 -0.175"></vgl-mesh>-->
<!--            <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="0 0 1.57"-->
<!--                      position="0.4 -0.175 0.175"></vgl-mesh>-->
<!--            <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="0 0 1.57"-->
<!--                      position="0.4 0 0"></vgl-mesh>-->
<!--            &lt;!&ndash;V&ndash;&gt;-->
<!--            <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="0 0 1.57"-->
<!--                      position="-0.4 0.175 0.15"></vgl-mesh>-->
<!--            <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="0 0 1.57"-->
<!--                      position="-0.4 0.175 -0.15"></vgl-mesh>-->
<!--            <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="0 0 1.57"-->
<!--                      position="-0.4 0 -0.15"></vgl-mesh>-->
<!--            <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="0 0 1.57"-->
<!--                      position="-0.4 0 0.15"></vgl-mesh>-->
<!--            <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="0 0 1.57"-->
<!--                      position="-0.4 -0.175 0.15"></vgl-mesh>-->
<!--            <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="0 0 1.57"-->
<!--                      position="-0.4 -0.175 -0.15"></vgl-mesh>-->

<!--            <vgl-mesh geometry="diceGeometry" material="diceMaterial"></vgl-mesh>-->
<!--        </vgl-group>-->
    </vgl-group>
</template>
<script>
  export default {
    mounted() {
      this.$nextTick(function() {
        window.addEventListener('keypress', function(e) {
          if (e.keyCode === 32) {
            this.rollDice();
          }
        }.bind(this));
      });
    },
    data() {
      return {
        store: window.ApplicationStore,
        interval: [null, null, null],
        allDone: [false, false, false],
        diceCalc: {
          x: 0,
          y: 0,
          z: 0,
        },
        time: 300,
        x: 0,
        y: 0,
        z: 0,
      };
    },
    methods: {
      rollDice() {
        if (!this.store.gamePlayStatus.isRolling) return;

        let diceResult = 1 + Math.floor(Math.random() * 6);

        this.store.players[this.store.currentPlayerId].rollDice(diceResult);

        switch (diceResult) {
          case 1:
            this.x = Math.PI / 2;
            this.y = Math.PI / 2;
            this.z = Math.PI / 2;
            break;
          case 2:
            this.x = Math.PI * 2;
            this.y = Math.PI * 2;
            this.z = Math.PI * 2;
            break;
          case 3:
            this.x = Math.PI / 2;
            this.y = Math.PI;
            this.z = Math.PI / 2 * (Math.floor(Math.random() * 6) + 1);
            break;
          case 4:
            this.x = Math.PI / 2 * 3;
            this.y = Math.PI * 2;
            this.z = Math.PI / 2 * (Math.floor(Math.random() * 6) + 1);
            break;
          case 5:
            this.x = Math.PI / 2 * 5;
            this.y = Math.PI / 2;
            this.z = Math.PI * 2;
            break;
          case 6:
            this.x = Math.PI / 2 * 6;
            this.y = Math.PI / 2 * (Math.floor(Math.random() * 6) + 1);
            this.z = Math.PI / 2;
            break;
        }
        //
        // this.interval[0] = window.setInterval(function() {
        //
        //   if (parseFloat(this.diceCalc.x).toFixed(1) >
        //       parseFloat(this.x).toFixed(1)) {
        //     let diff = (this.diceCalc.x - this.x) / 10;
        //     this.x += diff;
        //   } else if (parseFloat(this.diceCalc.x).toFixed(1) <
        //       parseFloat(this.x).toFixed(1)) {
        //     let diff = (this.x - this.diceCalc.x) / 10;
        //     this.x -= diff;
        //   } else {
        //     this.x = this.diceCalc.x;
        //     this.allDone[0] = true;
        //     console.log('done x');
        //     if (this.allDone[0] && this.allDone[1] && this.allDone[2]) {
        //       clearInterval(this.interval[0]);
        //       this.allDone = [false, false, false];
        //       return;
        //     }
        //   }
        //   if (parseFloat(this.diceCalc.y).toFixed(1) >
        //       parseFloat(this.y).toFixed(1)) {
        //     let diff = (this.diceCalc.y - this.y) / 10;
        //     this.y += diff;
        //   } else if (parseFloat(this.diceCalc.y).toFixed(1) <
        //       parseFloat(this.y).toFixed(1)) {
        //     let diff = (this.y - this.diceCalc.y) / 10;
        //     this.y -= diff;
        //   } else {
        //     this.y = this.diceCalc.y;
        //     this.allDone[1] = true;
        //     console.log('done y');
        //     if (this.allDone[0] && this.allDone[1] && this.allDone[2]) {
        //       clearInterval(this.interval[0]);
        //       this.allDone = [false, false, false];
        //       return;
        //     }
        //   }
        //
        //   if (parseFloat(this.diceCalc.z).toFixed(1) >
        //       parseFloat(this.z).toFixed(1)) {
        //     let diff = (this.diceCalc.z - this.z) / 10;
        //     this.z += diff;
        //   } else if (parseFloat(this.diceCalc.z).toFixed(1) <
        //       parseFloat(this.z).toFixed(1)) {
        //     let diff = (this.z - this.diceCalc.z) / 10;
        //     this.z -= diff;
        //   } else {
        //     this.z = this.diceCalc.z;
        //     this.allDone[2] = true;
        //     console.log('done z');
        //     if (this.allDone[0] && this.allDone[1] && this.allDone[2]) {
        //       clearInterval(this.interval[0]);
        //       this.allDone = [false, false, false];
        //       return;
        //     }
        //   }
        //
        // }.bind(this), 40);

      },
    },
  };
</script>
