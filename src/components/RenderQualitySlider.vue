<template>
  <div class="form-row">
    <app-slider
      :label="label"
      v-model="store.settings.quality"
      :min="min"
      :max="max"
      :step="1"
      :pip-labels="pipLabels"
      :value-formatter="formatValue"
    />
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
      pipLabels: [
        { value: 1, label: 'Low' },
        { value: 2, label: 'Balanced' },
        { value: 3, label: 'High' }
      ]
    };
  },
  methods: {
    formatValue(val) {
      return getRenderQualityPreset(val).label;
    }
  }
};
</script>
