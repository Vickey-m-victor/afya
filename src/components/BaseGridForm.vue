<template>
  <form @submit.prevent="$emit('submit')">
    <div class="row g-4">
      <div 
        v-for="(field, index) in fields" 
        :key="index" 
        :class="field.col || 'col-12'"
      >
        <label v-if="field.label" class="form-label mb-1" :for="field.name">
          {{ field.label }}
        </label>

        <input
          v-if="['text', 'number', 'email', 'password'].includes(field.type)"
          :type="field.type"
          class="form-control"
          :class="field.alt ? 'form-control-alt' : ''"
          :id="field.name"
          :placeholder="field.placeholder || `Enter ${field.label}`"
          v-model="modelValue[field.name]"
        />

        <select
          v-else-if="field.type === 'select'"
          class="form-select"
          :class="field.alt ? 'form-select-alt' : ''"
          :id="field.name"
          v-model="modelValue[field.name]"
        >
          <option value="" disabled>Select {{ field.label }}</option>
          <option v-for="opt in field.options" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>

        <div v-else-if="field.type === 'badge'" class="pt-2">
          <span 
            class="badge fs-sm px-3 py-2" 
            :class="`bg-${modelValue[field.name]?.theme || 'primary'}`"
          >
            {{ modelValue[field.name]?.label || modelValue[field.name] || 'N/A' }}
          </span>
        </div>

        <textarea
          v-else-if="field.type === 'textarea'"
          class="form-control"
          :class="field.alt ? 'form-control-alt' : ''"
          :id="field.name"
          :placeholder="field.placeholder || `Enter ${field.label}`"
          v-model="modelValue[field.name]"
          rows="3"
        ></textarea>
      </div>
    </div>

    <div class="mt-4" v-if="showSubmit">
      <button type="submit" class="btn btn-primary">{{ submitLabel }}</button>
    </div>
  </form>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Object, required: true },
  fields: { type: Array, required: true },
  showSubmit: { type: Boolean, default: false },
  submitLabel: { type: String, default: "Save" },
});
const emit = defineEmits(["update:modelValue", "submit"]);
</script>