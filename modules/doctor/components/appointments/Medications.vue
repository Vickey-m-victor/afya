<template>
  <div class="col-md-12">
    <!-- Medication Row -->
    <div v-for="(med, index) in modelValue" :key="index" class="d-flex flex-wrap medication-wrap align-items-center mb-3 p-3 border rounded bg-light">
      <div class="input-block input-block-new me-3 mb-2 flex-grow-1">
        <label class="form-label fw-semibold text-dark fs-xs mb-1">Name</label>
        <input type="text" v-model="med.name" class="form-control" placeholder="Medicine Name" />
      </div>
      <div class="input-block input-block-new me-3 mb-2" style="width: 150px;">
        <label class="form-label fw-semibold text-dark fs-xs mb-1">Type</label>
        <VueSelect :options="Direct" v-model="med.type" placeholder="Select" />
      </div>
      <div class="input-block input-block-new me-3 mb-2" style="width: 120px;">
        <label class="form-label fw-semibold text-dark fs-xs mb-1">Dosage</label>
        <input type="text" v-model="med.dosage" class="form-control" placeholder="Eg: 75 mg" />
      </div>
      <div class="input-block input-block-new me-3 mb-2" style="width: 120px;">
        <label class="form-label fw-semibold text-dark fs-xs mb-1">Frequency</label>
        <input type="text" v-model="med.frequency" class="form-control" placeholder="1-0-0-1" />
      </div>
      <div class="input-block input-block-new me-3 mb-2" style="width: 150px;">
        <label class="form-label fw-semibold text-dark fs-xs mb-1">Duration</label>
        <VueSelect :options="Duration" v-model="med.duration" placeholder="Select" />
      </div>
      <div class="input-block input-block-new me-3 mb-2 flex-grow-1">
        <label class="form-label fw-semibold text-dark fs-xs mb-1">Instruction</label>
        <input type="text" v-model="med.instruction" class="form-control" placeholder="Instructions" />
      </div>
      <div class="delete-row mb-2">
        <a href="javascript:void(0);" @click="deleteMedication(index)" class="btn btn-outline-danger border-0 rounded-circle d-flex align-items-center justify-content-center" style="width: 38px; height: 38px;">
          <i class="fa fa-trash-alt"></i>
        </a>
      </div>
    </div>

    <div class="add-new-med text-end mb-4">
      <a href="javascript:void(0);" class="btn btn-outline-primary px-3 py-1 fw-bold fs-sm" @click="addMedication">
        <i class="fa fa-plus me-1"></i> Add New Medication
      </a>
    </div>
  </div>
</template>

<script setup>
import VueSelect from "vue-select";
import "vue-select/dist/vue-select.css";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:modelValue']);

const Duration = ["1 Week", "2 Weeks", "1 Month", "3 Months", "6 Months"];
const Direct = ["Oral Tab", "Oral Syrup", "Injection", "Cream", "Drops"];

function addMedication() {
  const updated = [...props.modelValue, {
    name: "",
    type: "Oral Tab",
    dosage: "",
    frequency: "1-0-0-1",
    duration: "1 Month",
    instruction: "Take after meal"
  }];
  emit('update:modelValue', updated);
}

function deleteMedication(index) {
  const updated = [...props.modelValue];
  updated.splice(index, 1);
  emit('update:modelValue', updated);
}
</script>

<style scoped>
.medication-wrap {
  border-color: #e2e8f0 !important;
  background-color: #f8fafc !important;
}
.form-control {
  height: 38px;
  border-color: #cbd5e1;
}
.form-control:focus {
  border-color: #0665d0;
  box-shadow: 0 0 0 1px #0665d0;
}
:deep(.vs__dropdown-toggle) {
  height: 38px;
  border-color: #cbd5e1;
  background: #fff;
}
:deep(.vs__dropdown-toggle:focus-within) {
  border-color: #0665d0;
}
</style>
