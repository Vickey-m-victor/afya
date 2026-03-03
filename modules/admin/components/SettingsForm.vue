<script setup>
const props = defineProps({
  modelValue: { type: Object, required: true },
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
  <BaseBlock  content-full>
    <div class="row">
      <div class="col-lg-12 space-y-5">
        
        <form class="space-y-4" @submit.prevent="emit('submit')">
          
          <div v-for="field in fields" :key="field.name" class="row">
            <label class="col-sm-4 col-form-label" :for="field.name">
              {{ field.label }}
            </label>
            <div class="col-sm-8">
              <input
                :type="field.type || 'text'"
                class="form-control"
                :id="field.name"
                :name="field.name"
                :placeholder="field.placeholder || `Enter ${field.label}...`"
                :value="modelValue[field.name]"
                @input="updateField(field.name, $event.target.value)"
              />
            </div>
          </div>
        
          <div class="row" v-if="showSubmit">
            <div class="col-sm-8 ms-auto">
              <button type="submit" class="btn btn-primary">
                {{ submitLabel }}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  </BaseBlock>
</template>