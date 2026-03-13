
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
                <label class="form-label" for="field-holiday_id">Holiday id</label>
                
                <input
                    id="field-holiday_id"
                    v-model.number="formData.holiday_id"
                    type="number"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('holiday_id') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('holiday_id')" class="invalid-feedback">{{ fieldError('holiday_id') }}</div>
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
                <label class="form-label" for="field-holiday_name">Holiday name</label>
                
                <input
                    id="field-holiday_name"
                    v-model="formData.holiday_name"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('holiday_name') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('holiday_name')" class="invalid-feedback">{{ fieldError('holiday_name') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-holiday_date">Holiday date</label>
                <div class="input-group">
                    <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                <input
                    id="field-holiday_date"
                    v-model="formData.holiday_date"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('holiday_date') }"
                    :disabled="readonly || busy"
                />
                </div>
                <div v-if="fieldError('holiday_date')" class="invalid-feedback">{{ fieldError('holiday_date') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-is_recurring">Is recurring</label>
                
                <input
                    id="field-is_recurring"
                    v-model="formData.is_recurring"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('is_recurring') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('is_recurring')" class="invalid-feedback">{{ fieldError('is_recurring') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-is_paid">Is paid</label>
                
                <input
                    id="field-is_paid"
                    v-model="formData.is_paid"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('is_paid') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('is_paid')" class="invalid-feedback">{{ fieldError('is_paid') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-double_pay_if_worked">Double pay if worked</label>
                
                <input
                    id="field-double_pay_if_worked"
                    v-model="formData.double_pay_if_worked"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('double_pay_if_worked') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('double_pay_if_worked')" class="invalid-feedback">{{ fieldError('double_pay_if_worked') }}</div>
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
                <label class="form-label" for="field-created_by">Created by</label>
                
                <input
                    id="field-created_by"
                    v-model.number="formData.created_by"
                    type="number"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('created_by') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('created_by')" class="invalid-feedback">{{ fieldError('created_by') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-updated_by">Updated by</label>
                <div class="input-group">
                    <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                <input
                    id="field-updated_by"
                    v-model.number="formData.updated_by"
                    type="number"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('updated_by') }"
                    :disabled="readonly || busy"
                />
                </div>
                <div v-if="fieldError('updated_by')" class="invalid-feedback">{{ fieldError('updated_by') }}</div>
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
    