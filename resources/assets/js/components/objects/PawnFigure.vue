<template>
    <span>

        <vgl-cylinder-geometry name="pawnBodyGeometry"
                               radius-top=0
                               radius-bottom=0.3
                               height=1
                               :radial-segments=store.settings.quality
        ></vgl-cylinder-geometry>
        <vgl-sphere-geometry name="pawnHeadGeometry"
                             radius=0.2
                             :width-segments=store.settings.quality
                             :height-segments=store.settings.quality
        ></vgl-sphere-geometry>


                    <vgl-mesh-lambert-material :name="`fieldMaterial-${playerIndex}`"
                                               :color="`${store.homeFields[playerIndex ].color}`"
                    ></vgl-mesh-lambert-material>

                    <vgl-mesh
                            :material="`fieldMaterial-${playerIndex}`"
                            :position="`${field.x} 0.6 ${field.z}`"
                            geometry="pawnBodyGeometry"
                    ></vgl-mesh>

                    <vgl-mesh v-for="(field, index) in store.homeFields[playerIndex ].fields"
                              :key="`home-field-1-${index}`"
                              :material="`fieldMaterial-${playerIndex}`"
                              :position="`${field.x} 1 ${field.z}`"
                              geometry="pawnHeadGeometry"
                    >

                    </vgl-mesh>


    </span>
</template>
<script>
  export default {
    props: {
      color: String,
      playerIndex: Number,

    },
    components: {},
    mounted() {
      this.$nextTick(function() {

      }.bind(this));
    },
    data() {
      return {
        store: window.ApplicationStore,
      };
    },
    events: {},

    methods: {},
  };
</script>
