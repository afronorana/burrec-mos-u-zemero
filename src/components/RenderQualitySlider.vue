<template>
  <div class="form-row">
    <label :for="sliderId" class="select-label slider-label">
      <span>{{ label }}</span>
      <span class="slider-value">{{ currentPreset.label }}</span>
    </label>

    <input
      :id="sliderId"
      v-model.number="store.settings.quality"
      class="quality-slider"
      type="range"
      :min="min"
      :max="max"
      step="1"
    >

    <div class="quality-scale">
      <span>Low</span>
      <span>Balanced</span>
      <span>High</span>
    </div>
  </div>
</template>

<script>
import ApplicationStore from '../utils/ApplicationStore';
import {
  getRenderQualityPreset,
  RENDER_QUALITY_MAX,
  RENDER_QUALITY_MIN,
} from '../utils/renderQuality';

export default {
  name: 'RenderQualitySlider',
  props: {
    label: {
      type: String,
      default: 'Render Quality',
    },
    sliderId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      store: ApplicationStore,
      min: RENDER_QUALITY_MIN,
      max: RENDER_QUALITY_MAX,
    };
  },
  computed: {
    currentPreset() {
      return getRenderQualityPreset(this.store.settings.quality);
    },
  },
};
</script>
