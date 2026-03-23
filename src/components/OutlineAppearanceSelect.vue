<template>
  <div class="form-row">
    <label :for="selectId" class="select-label">{{ label }}</label>
    <div class="nes-select is-dark is-full-width">
      <select :id="selectId" v-model="store.settings.outlineAppearance">
        <option
          v-for="option in outlineAppearanceOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
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
