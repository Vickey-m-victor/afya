
<script setup>
import { computed, ref } from 'vue';
import LazySearchSelect from '@/components/inputs/LazySearchSelect.vue';

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
                <label class="form-label" for="field-facility_id">Facility id</label>
                
                <LazySearchSelect
                    id="field-facility_id"
                    v-model="formData.facility_id"
                    endpoint="/admin/facility/search-dropdown"
                    placeholder="Select facility..."
                    :disabled="readonly || busy"
                    :invalid="!!fieldError('facility_id')"
                />
                
                <div v-if="fieldError('facility_id')" class="invalid-feedback">{{ fieldError('facility_id') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-department_id">Department id</label>
                
                <LazySearchSelect
                    id="field-department_id"
                    v-model="formData.department_id"
                    endpoint="/hr/department/search"
                    placeholder="Select department..."
                    :disabled="readonly || busy"
                    :invalid="!!fieldError('department_id')"
                />
                
                <div v-if="fieldError('department_id')" class="invalid-feedback">{{ fieldError('department_id') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-reports_to_title_id">Reports to title id</label>
                
                <LazySearchSelect
                    id="field-reports_to_title_id"
                    v-model="formData.reports_to_title_id"
                    endpoint="/hr/job-title/search"
                    placeholder="Select reporting title..."
                    :disabled="readonly || busy"
                    :invalid="!!fieldError('reports_to_title_id')"
                />
                
                <div v-if="fieldError('reports_to_title_id')" class="invalid-feedback">{{ fieldError('reports_to_title_id') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-job_group_id">Job group id</label>
                
                <LazySearchSelect
                    id="field-job_group_id"
                    v-model="formData.job_group_id"
                    endpoint="/hr/job-group/search"
                    placeholder="Select job group..."
                    :disabled="readonly || busy"
                    :invalid="!!fieldError('job_group_id')"
                />
                
                <div v-if="fieldError('job_group_id')" class="invalid-feedback">{{ fieldError('job_group_id') }}</div>
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

            <div class="col-md-6">
                <label class="form-label" for="field-title_name">Title name</label>
                
                <input
                    id="field-title_name"
                    v-model="formData.title_name"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('title_name') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('title_name')" class="invalid-feedback">{{ fieldError('title_name') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-title_code">Title code</label>
                
                <input
                    id="field-title_code"
                    v-model="formData.title_code"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('title_code') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('title_code')" class="invalid-feedback">{{ fieldError('title_code') }}</div>
            </div>

            <div class="col-12">
                <label class="form-label" for="field-title_description">Title description</label>
                <textarea
                    id="field-title_description"
                    v-model="formData.title_description"
                    rows="4"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('title_description') }"
                    :disabled="readonly || busy"
                ></textarea>
                <div v-if="fieldError('title_description')" class="invalid-feedback">{{ fieldError('title_description') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-requires_license">Requires license</label>
                
                <input
                    id="field-requires_license"
                    v-model="formData.requires_license"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('requires_license') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('requires_license')" class="invalid-feedback">{{ fieldError('requires_license') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-license_type">License type</label>
                
                <input
                    id="field-license_type"
                    v-model="formData.license_type"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('license_type') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('license_type')" class="invalid-feedback">{{ fieldError('license_type') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-is_clinical">Is clinical</label>
                
                <input
                    id="field-is_clinical"
                    v-model="formData.is_clinical"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('is_clinical') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('is_clinical')" class="invalid-feedback">{{ fieldError('is_clinical') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-is_supervisory">Is supervisory</label>
                
                <input
                    id="field-is_supervisory"
                    v-model="formData.is_supervisory"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('is_supervisory') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('is_supervisory')" class="invalid-feedback">{{ fieldError('is_supervisory') }}</div>
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
    