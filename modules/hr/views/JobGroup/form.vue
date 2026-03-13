
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
                <label class="form-label" for="field-job_group_id">Job group id</label>
                
                <input
                    id="field-job_group_id"
                    v-model.number="formData.job_group_id"
                    type="number"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('job_group_id') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('job_group_id')" class="invalid-feedback">{{ fieldError('job_group_id') }}</div>
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
                <label class="form-label" for="field-group_name">Group name</label>
                
                <input
                    id="field-group_name"
                    v-model="formData.group_name"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('group_name') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('group_name')" class="invalid-feedback">{{ fieldError('group_name') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-group_code">Group code</label>
                
                <input
                    id="field-group_code"
                    v-model="formData.group_code"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('group_code') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('group_code')" class="invalid-feedback">{{ fieldError('group_code') }}</div>
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

            <div class="col-12">
                <label class="form-label" for="field-group_description">Group description</label>
                <textarea
                    id="field-group_description"
                    v-model="formData.group_description"
                    rows="4"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('group_description') }"
                    :disabled="readonly || busy"
                ></textarea>
                <div v-if="fieldError('group_description')" class="invalid-feedback">{{ fieldError('group_description') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-level">Level</label>
                
                <input
                    id="field-level"
                    v-model.number="formData.level"
                    type="number"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('level') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('level')" class="invalid-feedback">{{ fieldError('level') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-min_salary">Min salary</label>
                
                <input
                    id="field-min_salary"
                    v-model="formData.min_salary"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('min_salary') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('min_salary')" class="invalid-feedback">{{ fieldError('min_salary') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-max_salary">Max salary</label>
                
                <input
                    id="field-max_salary"
                    v-model="formData.max_salary"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('max_salary') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('max_salary')" class="invalid-feedback">{{ fieldError('max_salary') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-default_salary">Default salary</label>
                
                <input
                    id="field-default_salary"
                    v-model="formData.default_salary"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('default_salary') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('default_salary')" class="invalid-feedback">{{ fieldError('default_salary') }}</div>
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
    