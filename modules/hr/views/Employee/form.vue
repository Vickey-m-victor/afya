
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
                <label class="form-label" for="field-employment_type_id">Employment Type ID</label>
                
                <input
                    id="field-employment_type_id"
                    v-model.number="formData.employment_type_id"
                    type="number"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('employment_type_id') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('employment_type_id')" class="invalid-feedback">{{ fieldError('employment_type_id') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-residential_status_id">Residential Status ID</label>
                
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
                <label class="form-label" for="field-department_id">Department ID</label>
                
                <input
                    id="field-department_id"
                    v-model.number="formData.department_id"
                    type="number"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('department_id') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('department_id')" class="invalid-feedback">{{ fieldError('department_id') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-job_title_id">Job Title ID</label>
                
                <input
                    id="field-job_title_id"
                    v-model.number="formData.job_title_id"
                    type="number"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('job_title_id') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('job_title_id')" class="invalid-feedback">{{ fieldError('job_title_id') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-job_group_id">Job Group ID</label>
                
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
                <label class="form-label" for="field-work_shift_id">Work Shift ID</label>
                
                <input
                    id="field-work_shift_id"
                    v-model.number="formData.work_shift_id"
                    type="number"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('work_shift_id') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('work_shift_id')" class="invalid-feedback">{{ fieldError('work_shift_id') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-reports_to_employee_id">Reports To Employee ID</label>
                
                <input
                    id="field-reports_to_employee_id"
                    v-model.number="formData.reports_to_employee_id"
                    type="number"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('reports_to_employee_id') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('reports_to_employee_id')" class="invalid-feedback">{{ fieldError('reports_to_employee_id') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-hire_date">Hire Date</label>
                <div class="input-group">
                    <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                <input
                    id="field-hire_date"
                    v-model="formData.hire_date"
                    type="date"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('hire_date') }"
                    :disabled="readonly || busy"
                />
                </div>
                <div v-if="fieldError('hire_date')" class="invalid-feedback">{{ fieldError('hire_date') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-probation_end_date">Probation End Date</label>
                <div class="input-group">
                    <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                <input
                    id="field-probation_end_date"
                    v-model="formData.probation_end_date"
                    type="date"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('probation_end_date') }"
                    :disabled="readonly || busy"
                />
                </div>
                <div v-if="fieldError('probation_end_date')" class="invalid-feedback">{{ fieldError('probation_end_date') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-confirmation_date">Confirmation Date</label>
                <div class="input-group">
                    <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                <input
                    id="field-confirmation_date"
                    v-model="formData.confirmation_date"
                    type="date"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('confirmation_date') }"
                    :disabled="readonly || busy"
                />
                </div>
                <div v-if="fieldError('confirmation_date')" class="invalid-feedback">{{ fieldError('confirmation_date') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-termination_date">Termination Date</label>
                <div class="input-group">
                    <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                <input
                    id="field-termination_date"
                    v-model="formData.termination_date"
                    type="date"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('termination_date') }"
                    :disabled="readonly || busy"
                />
                </div>
                <div v-if="fieldError('termination_date')" class="invalid-feedback">{{ fieldError('termination_date') }}</div>
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
    