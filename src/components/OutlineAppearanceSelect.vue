<template>
  <div class="form-row">
    <label class="select-label">{{ label }}</label>
    <app-tabs v-model="store.settings.outlineAppearance" :options="outlineAppearanceOptions" />
  </div>
</template>

<script>
import ApplicationStore from '../utils/ApplicationStore';
import { OUTLINE_APPEARANCE_OPTIONS } from '../utils/outlineAppearance';

export default {
  name: 'OutlineAppearanceSelect',
  props: {
    label: {
      type: String,
      default: 'Outline Style',
    },
    selectId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      store: ApplicationStore,
      outlineAppearanceOptions: OUTLINE_APPEARANCE_OPTIONS,
    };
  },
};
</script>
