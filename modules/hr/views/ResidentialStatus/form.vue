
<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
    formData: {
        type: Object,
        default: () => ({}),
    },
    error: {
        type: [Object, String, Array],
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
        default: true,
    },
    onSubmit: {
        type: Function,
        default: null,
    },
});

const emit = defineEmits(['submit']);
const submitting = ref(false);
const localErrors = ref({});

const busy = computed(() => props.isLoading || submitting.value);
const requiredFields = new Set([]);

function fieldError(key) {
    if (localErrors.value?.[key]) {
        return localErrors.value[key];
    }

    const value = props.fieldErrors?.[key];
    if (Array.isArray(value)) return value[0] || '';
    return value || '';
}

function validateForm() {
    const errors = {};

    requiredFields.forEach((key) => {
        const value = props.formData?.[key];
        const isEmptyString = typeof value === 'string' && value.trim() === '';
        const isMissing = value === undefined || value === null || isEmptyString;

        if (isMissing) {
            errors[key] = 'This field is required.';
        }
    });

    localErrors.value = errors;
    return Object.keys(errors).length === 0;
}

async function handleSubmit() {
    if (props.readonly || busy.value) return;

    if (!validateForm()) {
        return;
    }

    if (typeof props.onSubmit === 'function') {
        submitting.value = true;
        try {
            await props.onSubmit(props.formData);
        } finally {
            submitting.value = false;
        }
        return;
    }

    emit('submit', props.formData);
}
</script>
    

<template>
    <form @submit.prevent="handleSubmit">
        <div v-if="typeof error === 'string' && error" class="alert alert-danger mb-3">
            {{ error }}
        </div>

        <div class="row g-3">
            
            <div class="col-md-6">
                <label class="form-label" for="field-residential_status_id">ID</label>
                
                <input
                    id="field-residential_status_id"
                    v-model.number="formData.residential_status_id"
                    type="number"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('residential_status_id') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('residential_status_id')" class="invalid-feedback">{{ fieldError('residential_status_id') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-facility_id">Facility ID</label>
                
                <input
                    id="field-facility_id"
                    v-model.number="formData.facility_id"
                    type="number"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('facility_id') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('facility_id')" class="invalid-feedback">{{ fieldError('facility_id') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-name">Name</label>
                
                <input
                    id="field-name"
                    v-model="formData.name"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('name') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('name')" class="invalid-feedback">{{ fieldError('name') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-code">Code</label>
                
                <input
                    id="field-code"
                    v-model="formData.code"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('code') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('code')" class="invalid-feedback">{{ fieldError('code') }}</div>
            </div>

            <div class="col-md-6 col-lg-4">
                <div class="form-check mb-0">
                    <input
                        id="field-tax_applicable"
                        v-model="formData.tax_applicable"
                        class="form-check-input"
                        type="checkbox"
                        
                        :disabled="readonly || busy"
                    />
                    <label class="form-check-label" for="field-tax_applicable">Tax applicable</label>
                    <div v-if="fieldError('tax_applicable')" class="text-danger small mt-1">{{ fieldError('tax_applicable') }}</div>
                </div>
            </div>
        </div>

        <div v-if="!hideSubmit" class="text-end mt-4">
            <button type="submit" class="btn btn-primary" :disabled="busy || readonly">
                <span v-if="busy" class="spinner-border spinner-border-sm me-2"></span>
                {{ busy ? 'Saving...' : 'Save' }}
            </button>
        </div>
    </form>
</template>
    