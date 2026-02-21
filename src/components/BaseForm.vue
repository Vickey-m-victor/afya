<script setup>
const props = defineProps({
  modelValue: { type: Object, required: true }, // Add this
  fields: { type: Array, default: () => [] },
  showSubmit: { type: Boolean, default: true },
  submitLabel: { type: String, default: "Submit" },
});
const emit = defineEmits(["submit", "update:modelValue"]);

const updateField = (name, value) => {
  emit("update:modelValue", { ...props.modelValue, [name]: value });
};
</script>

<template>
  <form @submit.prevent="emit('submit')">
    <div v-for="field in fields" :key="field.name" class="mb-4">
      <label class="form-label" :for="field.name">{{ field.label }}</label>
      <input
        :type="field.type"
        class="form-control form-control-alt"
        :id="field.name"
        :value="modelValue[field.name]"
        @input="updateField(field.name, $event.target.value)"
        :placeholder="field.placeholder"
      />
    </div>
    <div class="mb-4" v-if="showSubmit">
      <BaseButton :label="submitLabel" type="submit" />
    </div>
  </form>
</template>
