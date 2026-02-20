<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: null,
  },
  options: {
    type: Array,
    default: () => [], 
    // Each option: { label: '', value: '', disabled: false }
  },
  inline: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const select = (value) => {
  emit("update:modelValue", value);
};
</script>

<template>
  <div :class="inline ? 'd-flex gap-3' : 'd-flex flex-column gap-2'">
    <div
      v-for="(option, idx) in options"
      :key="idx"
      :class="['form-check', inline ? 'form-check-inline' : '']"
    >
      <input
        class="form-check-input"
        type="radio"
        :id="'radio-' + idx"
        :name="'radio-group-' + idx"
        :value="option.value"
        :disabled="option.disabled"
        :checked="props.modelValue === option.value"
        @change="select(option.value)"
      />
      <label class="form-check-label" :for="'radio-' + idx">
        {{ option.label }}
      </label>
    </div>
  </div>
</template>