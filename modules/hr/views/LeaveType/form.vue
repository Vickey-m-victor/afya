
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
                <label class="form-label" for="field-default_days">Default days</label>
                
                <input
                    id="field-default_days"
                    v-model.number="formData.default_days"
                    type="number"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('default_days') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('default_days')" class="invalid-feedback">{{ fieldError('default_days') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-gender_specific">Gender specific</label>
                
                <input
                    id="field-gender_specific"
                    v-model="formData.gender_specific"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('gender_specific') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('gender_specific')" class="invalid-feedback">{{ fieldError('gender_specific') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-paid">Paid</label>
                
                <input
                    id="field-paid"
                    v-model="formData.paid"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('paid') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('paid')" class="invalid-feedback">{{ fieldError('paid') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-requires_approval">Requires approval</label>
                
                <input
                    id="field-requires_approval"
                    v-model="formData.requires_approval"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('requires_approval') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('requires_approval')" class="invalid-feedback">{{ fieldError('requires_approval') }}</div>
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
    