<script setup>
const props = defineProps({
  modelValue: { type: Object, required: true },
  fields: { type: Array, default: () => [] },
  showSubmit: { type: Boolean, default: true },
  submitLabel: { type: String, default: "Submit" },
});
const emit = defineEmits(["submit", "update:modelValue"]);

// 💡 Solves Issue 7: Reads and writes nested paths like 'service_payload.to' perfectly!
const getNestedValue = (obj, path) => path.split('.').reduce((o, p) => (o ? o[p] : null), obj);
const setNestedValue = (obj, path, value) => {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) current[keys[i]] = {};
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
  return obj;
};

const updateField = (name, value) => {
  const updatedData = { ...props.modelValue };
  setNestedValue(updatedData, name, value);
  emit("update:modelValue", updatedData);
};
</script>

<template>
  <form @submit.prevent="emit('submit')">
    <div v-for="field in fields" :key="field.name" class="mb-4">
      <label class="form-label" :for="field.name">{{ field.label }}</label>
      
      <select 
        v-if="field.type === 'select'"
        class="form-select"
        :id="field.name"
        :value="getNestedValue(modelValue, field.name)"
        @change="updateField(field.name, $event.target.value)"
      >
        <option v-for="opt in field.options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
      </select>

      <div v-else-if="field.type === 'switch'" class="form-check form-switch">
        <input 
          class="form-check-input" 
          type="checkbox" 
          :id="field.name"
          :checked="getNestedValue(modelValue, field.name) == 1"
          @change="updateField(field.name, $event.target.checked ? 1 : 0)"
        />
        <label class="form-check-label" :for="field.name">Enable / Disable</label>
      </div>

      <input
        v-else
        :type="field.type"
        class="form-control"
        :id="field.name"
        :value="getNestedValue(modelValue, field.name)"
        @input="updateField(field.name, $event.target.value)"
        :placeholder="field.placeholder"
      />
    </div>
    
    <div class="mb-4" v-if="showSubmit">
      <button type="submit" class="btn btn-primary">{{ submitLabel }}</button>
    </div>
  </form>
</template>