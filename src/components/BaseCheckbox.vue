<script setup>
const props = defineProps({
  modelValue: {
    type: [Array, Boolean],
    default: () => [],
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
  switchStyle: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const toggle = (optionValue) => {
  if (Array.isArray(props.modelValue)) {
    const newValue = [...props.modelValue];
    const index = newValue.indexOf(optionValue);
    if (index > -1) newValue.splice(index, 1);
    else newValue.push(optionValue);
    emit("update:modelValue", newValue);
  } else {
    emit("update:modelValue", !props.modelValue);
  }
};

const isChecked = (optionValue) => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(optionValue);
  } else {
    return props.modelValue;
  }
};
</script>

<template>
  <div :class="inline ? 'd-flex gap-3' : 'd-flex flex-column gap-2'">
    <div
      v-for="(option, idx) in options"
      :key="idx"
      :class="['form-check', switchStyle ? 'form-switch' : '', inline ? 'form-check-inline' : '']"
    >
      <input
        class="form-check "
        type="checkbox"
        :id="'checkbox-' + idx"
        :disabled="option.disabled"
        :checked="isChecked(option.value)"
        @change="toggle(option.value)"
      />
      <label class="form-check-label" :for="'checkbox-' + idx">
        {{ option.label }}
      </label>
    </div>
  </div>
</template>