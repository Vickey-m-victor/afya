<script setup>
import { computed } from 'vue';
import { useLazySearchOptions } from '@/composables/useLazySearchOptions';

const props = defineProps({
  modelValue: { type: [String, Number, null], default: null },
  endpoint: { type: String, required: true },
  params: { type: Object, default: null },
  valueKey: { type: String, default: null },
  labelKey: { type: String, default: null },
  valueFn: { type: Function, default: null },
  labelFn: { type: Function, default: null },
  placeholder: { type: String, default: 'Select...' },
  disabled: { type: Boolean, default: false },
  invalid: { type: Boolean, default: false },
});

const emit = defineEmits(['update:modelValue', 'loaded']);

const { options, loading, error, load } = useLazySearchOptions(props.endpoint, {
  params: props.params,
  valueKey: props.valueKey,
  labelKey: props.labelKey,
  valueFn: props.valueFn,
  labelFn: props.labelFn,
});

const localValue = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v === '' ? null : v),
});

const ensureLoaded = async () => {
  await load(false);
  emit('loaded', { options: options.value, error: error.value });
};
</script>

<template>
  <select
    v-model="localValue"
    class="form-select"
    :class="{ 'is-invalid': invalid }"
    :disabled="disabled"
    @focus="ensureLoaded"
    @pointerdown="ensureLoaded"
  >
    <option :value="null">{{ loading ? 'Loading…' : placeholder }}</option>
    <option v-for="opt in options" :key="String(opt.value)" :value="opt.value">
      {{ opt.label }}
    </option>
  </select>
</template>

