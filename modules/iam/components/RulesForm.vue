<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  formData: {
    type: Object,
    default: () => ({}),
  },
  error: {
    type: Object,
    default: () => ({}),
  },
  fieldErrors: {
    type: Object,
    default: () => ({}),
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  hideSubmit: {
    type: Boolean,
    default: false,
  },
  compact: {
    type: Boolean,
    default: false,
  },
  onSubmit: Function,
});

const emit = defineEmits(["submit"]);
const loading = ref(false);

const onSubmit = async () => {
  if (props.onSubmit) {
    loading.value = true;
    try {
      await props.onSubmit(props.formData);
    } catch (err) {
      console.error("Form submission error:", err);
    } finally {
      loading.value = false;
    }
  } else {
    emit("submit", props.formData);
  }
};

const isSubmitting = computed(() => props.isLoading || loading.value);
</script>

<template>
  <form @submit.prevent="onSubmit">
    <!-- Error banner -->
    <div
      v-if="error?.message || (typeof error === 'string' && error)"
      :class="compact ? 'alert alert-danger mb-3' : 'alert alert-danger alert-dismissible mb-4'"
    >
      <h5 v-if="!compact" class="alert-heading mb-2">
        <i class="fa fa-fw fa-times-circle"></i> Error
      </h5>
      <p class="mb-0">{{ typeof error === "string" ? error : error.message }}</p>
    </div>

    <!-- Compact layout for modals -->
    <div v-if="compact" class="compact-form">
      <div class="mb-3">
        <label class="form-label" for="rule-name-input">
          Rule Name <span class="text-danger">*</span>
        </label>
        <input
          type="text"
          class="form-control form-control-sm"
          :class="{ 'is-invalid': fieldErrors?.rule_name }"
          id="rule-name-input"
          v-model="formData.rule_name"
          placeholder="Enter rule name"
          :disabled="readonly || isSubmitting"
        />
        <div v-if="fieldErrors?.rule_name" class="invalid-feedback">
          {{ fieldErrors.rule_name }}
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label" for="description-input">Description</label>
        <textarea
          class="form-control form-control-sm"
          :class="{ 'is-invalid': fieldErrors?.description }"
          id="description-input"
          v-model="formData.description"
          rows="3"
          placeholder="Enter description"
          :disabled="readonly || isSubmitting"
        ></textarea>
        <div v-if="fieldErrors?.description" class="invalid-feedback">
          {{ fieldErrors.description }}
        </div>
      </div>
    </div>

    <!-- Full layout for standalone pages -->
    <div v-else class="row">
      <div class="col-lg-12 mb-4">
        <label class="form-label" for="rule-name-input-full">
          Rule Name <span class="text-danger">*</span>
        </label>
        <input
          type="text"
          class="form-control"
          :class="{ 'is-invalid': fieldErrors?.rule_name }"
          id="rule-name-input-full"
          v-model="formData.rule_name"
          placeholder="Enter rule name"
          :disabled="readonly || isSubmitting"
        />
        <div v-if="fieldErrors?.rule_name" class="invalid-feedback">
          {{ fieldErrors.rule_name }}
        </div>
      </div>

      <div class="col-lg-12 mb-4">
        <label class="form-label" for="description-input-full">Description</label>
        <textarea
          class="form-control"
          :class="{ 'is-invalid': fieldErrors?.description }"
          id="description-input-full"
          v-model="formData.description"
          rows="3"
          placeholder="Enter description"
          :disabled="readonly || isSubmitting"
        ></textarea>
        <div v-if="fieldErrors?.description" class="invalid-feedback">
          {{ fieldErrors.description }}
        </div>
      </div>
    </div>

    <!-- Submit button -->
    <div v-if="!hideSubmit" class="text-center mt-4">
      <button
        type="submit"
        class="btn btn-success"
        :class="{ 'btn-sm': compact }"
        :disabled="isSubmitting"
      >
        <i class="fa fa-save me-1"></i>
        {{ isSubmitting ? "Saving..." : "Save Rule" }}
      </button>
    </div>
  </form>
</template>

<style scoped>
.compact-form {
  max-width: 100%;
}
</style>
