
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
                <label class="form-label" for="field-parent_id">Parent id</label>
                
                <LazySearchSelect
                    id="field-parent_id"
                    v-model="formData.parent_id"
                    endpoint="/hr/department/search"
                    placeholder="Select parent department..."
                    :disabled="readonly || busy"
                    :invalid="!!fieldError('parent_id')"
                />
                
                <div v-if="fieldError('parent_id')" class="invalid-feedback">{{ fieldError('parent_id') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-department_name">Department name</label>
                
                <input
                    id="field-department_name"
                    v-model="formData.department_name"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('department_name') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('department_name')" class="invalid-feedback">{{ fieldError('department_name') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-department_code">Department code</label>
                
                <input
                    id="field-department_code"
                    v-model="formData.department_code"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('department_code') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('department_code')" class="invalid-feedback">{{ fieldError('department_code') }}</div>
            </div>

            <div class="col-12">
                <label class="form-label" for="field-description">Description</label>
                <textarea
                    id="field-description"
                    v-model="formData.description"
                    rows="4"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('description') }"
                    :disabled="readonly || busy"
                ></textarea>
                <div v-if="fieldError('description')" class="invalid-feedback">{{ fieldError('description') }}</div>
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
    