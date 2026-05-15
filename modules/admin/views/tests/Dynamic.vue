<script setup>
import { ref } from 'vue';
import FormRepeater from '@/components/DynamicForm/FormRepeater.vue';

// 1. This is the data you will send to the backend when you click Save!
const addresses = ref([
  { street: '', city: '' } // Starts with 1 blank row
]);

// 2. We tell the repeater what a blank row looks like
const blankAddressTemplate = { street: '', city: '' };

function submitToBackend() {
  console.log("Saving this array to database:", addresses.value);
}
</script>

<template>
  <div class="p-4">
    <h3>Patient Addresses</h3>

    <FormRepeater 
      v-model="addresses" 
      :empty-row="blankAddressTemplate"
    >
      
      <template #default="{ item, index }">
        <div class="row">
          
          <div class="col-6">
            <label>Street {{ index + 1 }}</label>
            <input type="text" class="form-control" v-model="item.street">
          </div>
          
          <div class="col-6">
            <label>City {{ index + 1 }}</label>
            <input type="text" class="form-control" v-model="item.city">
          </div>
          
        </div>
      </template>

    </FormRepeater>

    <button class="btn btn-primary mt-4" @click="submitToBackend">Save All Addresses</button>
  </div>
</template>