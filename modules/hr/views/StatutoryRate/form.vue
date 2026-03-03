
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
                <label class="form-label" for="field-statutory_rate_id">Statutory rate id</label>
                
                <input
                    id="field-statutory_rate_id"
                    v-model.number="formData.statutory_rate_id"
                    type="number"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('statutory_rate_id') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('statutory_rate_id')" class="invalid-feedback">{{ fieldError('statutory_rate_id') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-facility_id">Facility id</label>
                
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
                <label class="form-label" for="field-authority">Authority</label>
                
                <input
                    id="field-authority"
                    v-model="formData.authority"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('authority') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('authority')" class="invalid-feedback">{{ fieldError('authority') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-type">Type</label>
                
                <input
                    id="field-type"
                    v-model="formData.type"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('type') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('type')" class="invalid-feedback">{{ fieldError('type') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-employee_rate">Employee rate</label>
                
                <input
                    id="field-employee_rate"
                    v-model="formData.employee_rate"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('employee_rate') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('employee_rate')" class="invalid-feedback">{{ fieldError('employee_rate') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-employer_rate">Employer rate</label>
                
                <input
                    id="field-employer_rate"
                    v-model="formData.employer_rate"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('employer_rate') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('employer_rate')" class="invalid-feedback">{{ fieldError('employer_rate') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-effective_from">Effective from</label>
                
                <input
                    id="field-effective_from"
                    v-model="formData.effective_from"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('effective_from') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('effective_from')" class="invalid-feedback">{{ fieldError('effective_from') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-effective_to">Effective to</label>
                
                <input
                    id="field-effective_to"
                    v-model="formData.effective_to"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('effective_to') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('effective_to')" class="invalid-feedback">{{ fieldError('effective_to') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-status">Status</label>
                
                <input
                    id="field-status"
                    v-model.number="formData.status"
                    type="number"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('status') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('status')" class="invalid-feedback">{{ fieldError('status') }}</div>
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
    