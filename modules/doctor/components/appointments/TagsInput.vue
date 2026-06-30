<template>
  <div class="tags-input-container d-flex flex-wrap align-items-center gap-1 p-2 border rounded bg-white w-100">
    <span v-for="(tag, index) in modelValue" :key="index" class="badge bg-primary d-inline-flex align-items-center gap-1 py-1 px-2 rounded-pill" style="font-size: 12px; font-weight: 500;">
      {{ tag }}
      <i class="fa fa-times cursor-pointer ms-1 text-white" style="font-size: 10px; cursor: pointer;" @click="removeTag(index)"></i>
    </span>
    <input
      v-model="newTag"
      type="text"
      :placeholder="placeholder"
      class="border-0 flex-grow-1 outline-none py-1 px-2 bg-transparent"
      style="min-width: 150px; font-size: 14px; box-shadow: none !important; border: 0 !important; outline: 0 !important;"
      @keydown.enter.prevent="addTag"
      @keydown.comma.prevent="addTag"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: 'Type new and press Enter'
  }
});

const emit = defineEmits(['update:modelValue']);

const newTag = ref('');

function addTag() {
  const tag = newTag.value.trim().replace(/^,|,$/g, '');
  if (tag && !props.modelValue.includes(tag)) {
    const updated = [...props.modelValue, tag];
    emit('update:modelValue', updated);
  }
  newTag.value = '';
}

function removeTag(index) {
  const updated = [...props.modelValue];
  updated.splice(index, 1);
  emit('update:modelValue', updated);
}
</script>

<style scoped>
.tags-input-container {
  border-color: #cbd5e1 !important;
  min-height: 42px;
}
.tags-input-container:focus-within {
  border-color: #0665d0 !important;
  box-shadow: 0 0 0 1px #0665d0;
}
.tags-input-container input::placeholder {
  color: #94a3b8;
}
</style>
