<script setup>
import { computed } from "vue";
import FlatPickr from "vue-flatpickr-component";

const props = defineProps({
  id: { type: String, default: undefined },
  modelValue: { type: [String, Number, Date, Array, Object], default: null },
  config: { type: Object, default: () => ({}) },
  placeholder: { type: String, default: "" },
  inputClass: { type: [String, Array, Object], default: "form-control" },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue"]);

const valueProxy = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>

<template>
  <FlatPickr
    :id="id"
    v-model="valueProxy"
    :config="config"
    :placeholder="placeholder"
    :class="inputClass"
    :disabled="disabled"
    :readonly="readonly"
  />
</template>

