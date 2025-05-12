<template>
  <vgl-group 
        :position="getPawnPosition(pawn)"
        :name="`cube-${pawn.id}`">

    <vgl-mesh :material="`pawnMaterial-${playerIndex}`"
            position="0 0.6 0"
            geometry="pawnBodyGeometry"
    ></vgl-mesh>
    
    <vgl-mesh :material="`pawnMaterial-${playerIndex}`"
            position="0 1 0"
            geometry="pawnHeadGeometry"
    ></vgl-mesh>

    <vgl-group position="0 0 0" :rotation="`0 ${indicator.rotation} 0`" v-if="pawn.isActive"
            :name="`cube-${pawn.id}`">

    <!-- Todo: Create arrow indicator -->
    <vgl-spot-light
            :name="`spotlight-${pawn.id}`"
            distance="4" angle=".1" penumbra="1.5" color="#ffffff" target="0 0 0" position="0 0.8 0"
    ></vgl-spot-light>


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
      indicator: {
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
      },
    };
  },
  events: {},
  methods: {

    getPawnPosition(pawn) {
      return pawn.getPosition();
    },
  }
};
</script>
