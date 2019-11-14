<template>
  <vgl-group>
    <vgl-box-geometry name="diceGeometry" width=0.8 height=0.8 depth=0.8></vgl-box-geometry>
    <vgl-mesh-phong-material name="diceMaterial" color="#ffffff"></vgl-mesh-phong-material>
    <vgl-cylinder-geometry name="diceDotGeometry"
                            radius-top=0.08
                            radius-bottom=0.08
                            height=0.05
                            :radial-segments=6
    ></vgl-cylinder-geometry>
    <vgl-mesh-basic-material name="diceDotMaterial" color="#000000"></vgl-mesh-basic-material>


    <vgl-group :rotation="`${store.diceData.x} ${store.diceData.y} ${store.diceData.z}`"
                position="5 0.7 5" name="dice">
        <!--I-->
        <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" position="0 -0.4 0"></vgl-mesh>
        <!--II-->
        <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial"
                  position="0.15 0.4 0.15"></vgl-mesh>
        <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial"
                  position="-0.15 0.4 -0.15"></vgl-mesh>

        <!--III-->
        <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="1.57 0 0"
                  position="0.175 0.175 0.4"></vgl-mesh>
        <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="1.57 0 0"
                  position="0 0 0.4"></vgl-mesh>
        <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="1.57 0 0"
                  position="-0.175 -0.175 0.4"></vgl-mesh>

        <!--IV-->
        <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="1.57 0 0"
                  position="0.15 0.15 -0.4"></vgl-mesh>
        <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="1.57 0 0"
                  position="0.15 -0.15 -0.4"></vgl-mesh>
        <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="1.57 0 0"
                  position="-0.15 -0.15 -0.4"></vgl-mesh>
        <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="1.57 0 0"
                  position="-0.15 0.15 -0.4"></vgl-mesh>

        <!--V-->
        <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="0 0 1.57"
                  position="0.4 0.175 0.175"></vgl-mesh>
        <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="0 0 1.57"
                  position="0.4 0.175 -0.175"></vgl-mesh>
        <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="0 0 1.57"
                  position="0.4 -0.175 -0.175"></vgl-mesh>
        <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="0 0 1.57"
                  position="0.4 -0.175 0.175"></vgl-mesh>
        <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="0 0 1.57"
                  position="0.4 0 0"></vgl-mesh>
        <!--V-->
        <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="0 0 1.57"
                  position="-0.4 0.175 0.15"></vgl-mesh>
        <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="0 0 1.57"
                  position="-0.4 0.175 -0.15"></vgl-mesh>
        <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="0 0 1.57"
                  position="-0.4 0 -0.15"></vgl-mesh>
        <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="0 0 1.57"
                  position="-0.4 0 0.15"></vgl-mesh>
        <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="0 0 1.57"
                  position="-0.4 -0.175 0.15"></vgl-mesh>
        <vgl-mesh geometry="diceDotGeometry" material="diceDotMaterial" rotation="0 0 1.57"
                  position="-0.4 -0.175 -0.15"></vgl-mesh>

        <vgl-mesh geometry="diceGeometry" material="diceMaterial"></vgl-mesh>
    </vgl-group>
</vgl-group>
</template>
<script>
export default {
  props: ['pawn', 'index', 'playerIndex'],
  components: {},
  mounted() {
    this.$nextTick(() => {

    });
  },
  data() {
    return {
      store: window.ApplicationStore,
    };
  },
  events: {},
  methods: {

  }
};
</script>
