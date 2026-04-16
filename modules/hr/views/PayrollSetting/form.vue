
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
                <label class="form-label" for="field-pay_cycle">Pay cycle</label>
                
                <input
                    id="field-pay_cycle"
                    v-model="formData.pay_cycle"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('pay_cycle') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('pay_cycle')" class="invalid-feedback">{{ fieldError('pay_cycle') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-currency">Currency</label>
                
                <input
                    id="field-currency"
                    v-model="formData.currency"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('currency') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('currency')" class="invalid-feedback">{{ fieldError('currency') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-overtime_rate">Overtime rate</label>
                <div class="input-group">
                    <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                <input
                    id="field-overtime_rate"
                    v-model="formData.overtime_rate"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('overtime_rate') }"
                    :disabled="readonly || busy"
                />
                </div>
                <div v-if="fieldError('overtime_rate')" class="invalid-feedback">{{ fieldError('overtime_rate') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-tax_calculation_method">Tax calculation method</label>
                
                <input
                    id="field-tax_calculation_method"
                    v-model="formData.tax_calculation_method"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('tax_calculation_method') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('tax_calculation_method')" class="invalid-feedback">{{ fieldError('tax_calculation_method') }}</div>
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
    