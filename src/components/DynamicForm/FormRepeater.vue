<script setup>
const props = defineProps({
  // This is the array we are looping over (e.g., patient.allergies)
  modelValue: { type: Array, required: true },
  
  // What a blank row looks like when they click "Add"
  emptyRow: { type: Object, required: true },
  
  // UI Labels
  title: { type: String, default: "Items" },
  addButtonText: { type: String, default: "Add Item" },
  emptyMessage: { type: String, default: "No records added." }
});

const emit = defineEmits(['update:modelValue']);

// Logic to add a new row
function addRow() {
  // Make a copy of the array, add the empty row to the end, and emit it
  const newArray = [...props.modelValue, { ...props.emptyRow }];
  emit('update:modelValue', newArray);
}

// Logic to remove a row
function removeRow(index) {
  // Make a copy of the array, remove the specific item, and emit it
  const newArray = [...props.modelValue];
  newArray.splice(index, 1);
  emit('update:modelValue', newArray);
}
</script>

<template>
  <div class="form-repeater">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="mb-0">{{ title }}</h5>
      <button type="button" class="btn btn-sm btn-alt-success" @click="addRow">
        <i class="fa fa-plus me-1"></i> {{ addButtonText }}
      </button>
    </div>

    <div v-if="modelValue.length === 0" class="alert alert-info py-2">
      {{ emptyMessage }}
    </div>

    <div v-for="(item, index) in modelValue" :key="index" class="card mb-3 border shadow-sm">
      <div class="card-header bg-light py-2 d-flex justify-content-between align-items-center">
        <span class="fs-sm fw-semibold">Item #{{ index + 1 }}</span>
        
        <button type="button" class="btn btn-sm btn-danger px-2 py-1" @click="removeRow(index)">
          <i class="fa fa-trash"></i>
        </button>
      </div>
      
      <div class="card-body">
        <slot :item="item" :index="index"></slot>
      </div>
    </div>
  </div>
</template>