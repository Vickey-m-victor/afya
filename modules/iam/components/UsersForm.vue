<script setup>
import BaseButton from "@/components/BaseButton.vue";

const props = defineProps({
  modelValue: { type: Object, required: true },
  submitLabel: { type: String, default: "Save" }
});

const emit = defineEmits(["submit", "update:modelValue"]);

// This function tells the parent View to update formData whenever a user types
const updateField = (name, value) => {
  emit("update:modelValue", { ...props.modelValue, [name]: value });
};
</script>

<template>
  <form @submit.prevent="emit('submit')">
    <div class="row g-3 mb-4">
      <div class="col-4">
        <label class="form-label">First Name</label>
        <input 
          type="text" 
          class="form-control" 
          :value="modelValue.first_name"
          @input="updateField('first_name', $event.target.value)"
        />
      </div>
      <div class="col-4">
        <label class="form-label">Middle Name</label>
        <input 
          type="text" 
          class="form-control" 
          :value="modelValue.middle_name"
          @input="updateField('middle_name', $event.target.value)"
        />
      </div>
      <div class="col-4">
        <label class="form-label">Last Name</label>
        <input 
          type="text" 
          class="form-control" 
          :value="modelValue.last_name"
          @input="updateField('last_name', $event.target.value)"
        />
      </div>
      <div class="col-4">
        <label class="form-label">Mobile Number</label>
        <input 
          type="text" 
          class="form-control" 
          :value="modelValue.mobile_number"
          @input="updateField('mobile_number', $event.target.value)"
        />
      </div>
      <div class="col-8">
        <label class="form-label">Email Address</label>
        <input 
          type="email" 
          class="form-control" 
          :value="modelValue.email_address"
          @input="updateField('email_address', $event.target.value)"
        />
      </div>
      <div class="col-5">
        <label class="form-label">Username</label>
        <input 
          type="text" 
          class="form-control" 
          :value="modelValue.username"
          @input="updateField('username', $event.target.value)"
        />
      </div>
      <div class="col-4">
        <label class="form-label">Password</label>
        <input 
          type="password" 
          class="form-control" 
          :value="modelValue.password"
          @input="updateField('password', $event.target.value)"
        />
      </div>
      <div class="col-3">
        <label class="form-label">Confirm Password</label>
        <input 
          type="password" 
          class="form-control" 
          :value="modelValue.confirm_password"
          @input="updateField('confirm_password', $event.target.value)"
        />
      </div>
    </div>
    
    <div class="text-end">
      <BaseButton :label="submitLabel" variant="primary" type="submit" />
    </div>
  </form>
</template>