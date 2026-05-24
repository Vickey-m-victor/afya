
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
                <label class="form-label" for="field-shift_name">Shift name</label>
                
                <input
                    id="field-shift_name"
                    v-model="formData.shift_name"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('shift_name') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('shift_name')" class="invalid-feedback">{{ fieldError('shift_name') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-shift_code">Shift code</label>
                
                <input
                    id="field-shift_code"
                    v-model="formData.shift_code"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('shift_code') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('shift_code')" class="invalid-feedback">{{ fieldError('shift_code') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-start_time">Start time</label>
                <div class="input-group">
                    <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                <input
                    id="field-start_time"
                    v-model="formData.start_time"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('start_time') }"
                    :disabled="readonly || busy"
                />
                </div>
                <div v-if="fieldError('start_time')" class="invalid-feedback">{{ fieldError('start_time') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-end_time">End time</label>
                <div class="input-group">
                    <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                <input
                    id="field-end_time"
                    v-model="formData.end_time"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('end_time') }"
                    :disabled="readonly || busy"
                />
                </div>
                <div v-if="fieldError('end_time')" class="invalid-feedback">{{ fieldError('end_time') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-duration_hours">Duration hours</label>
                
                <input
                    id="field-duration_hours"
                    v-model="formData.duration_hours"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('duration_hours') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('duration_hours')" class="invalid-feedback">{{ fieldError('duration_hours') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-grace_period_minutes">Grace period minutes</label>
                
                <input
                    id="field-grace_period_minutes"
                    v-model.number="formData.grace_period_minutes"
                    type="number"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('grace_period_minutes') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('grace_period_minutes')" class="invalid-feedback">{{ fieldError('grace_period_minutes') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-is_overnight">Is overnight</label>
                
                <input
                    id="field-is_overnight"
                    v-model="formData.is_overnight"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('is_overnight') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('is_overnight')" class="invalid-feedback">{{ fieldError('is_overnight') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-is_weekend_shift">Is weekend shift</label>
                
                <input
                    id="field-is_weekend_shift"
                    v-model="formData.is_weekend_shift"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('is_weekend_shift') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('is_weekend_shift')" class="invalid-feedback">{{ fieldError('is_weekend_shift') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-shift_allowance">Shift allowance</label>
                
                <input
                    id="field-shift_allowance"
                    v-model="formData.shift_allowance"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('shift_allowance') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('shift_allowance')" class="invalid-feedback">{{ fieldError('shift_allowance') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-color_code">Color code</label>
                
                <input
                    id="field-color_code"
                    v-model="formData.color_code"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('color_code') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('color_code')" class="invalid-feedback">{{ fieldError('color_code') }}</div>
            </div>


            <div class="col-md-6">
                <label class="form-label" for="field-shift_type">Shift type</label>
                
                <input
                    id="field-shift_type"
                    v-model="formData.shift_type"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('shift_type') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('shift_type')" class="invalid-feedback">{{ fieldError('shift_type') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-is_flexible">Is flexible</label>
                
                <input
                    id="field-is_flexible"
                    v-model="formData.is_flexible"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('is_flexible') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('is_flexible')" class="invalid-feedback">{{ fieldError('is_flexible') }}</div>
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
    