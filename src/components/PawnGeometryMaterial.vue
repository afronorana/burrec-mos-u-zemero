<template>
      <vgl-group>
          <!-- Geometry -->
          <vgl-cylinder-geometry name="pawnBodyGeometry" radius-top=0 radius-bottom=0.3 height=1 :radial-segments=store.settings.quality
          ></vgl-cylinder-geometry>      
          <vgl-sphere-geometry name="pawnHeadGeometry" radius=0.2
                                :width-segments=store.settings.quality
                                :height-segments=store.settings.quality
          ></vgl-sphere-geometry>

        <!-- Material -->
          <vgl-mesh-phong-material :name="`pawnMaterial-${playerIndex}`"
                                  :color="`${store.fields.home[playerIndex].color}`"
          ></vgl-mesh-phong-material>
          <vgl-mesh-lambert-material :name="`fieldMaterial-${playerIndex}`"
                                  :color="`${store.fields.home[playerIndex].color}`"
          ></vgl-mesh-lambert-material>

      </vgl-group>
</template>
<script>
export default {
  props: ['playerIndex'],
  mounted() {},
  data() {
    return {
      store: window.ApplicationStore,
    };
  },
  events: {},
  methods: {}
};
</script>
