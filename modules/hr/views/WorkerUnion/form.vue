
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
                <label class="form-label" for="field-union_name">Union name</label>
                
                <input
                    id="field-union_name"
                    v-model="formData.union_name"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('union_name') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('union_name')" class="invalid-feedback">{{ fieldError('union_name') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-union_code">Union code</label>
                
                <input
                    id="field-union_code"
                    v-model="formData.union_code"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('union_code') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('union_code')" class="invalid-feedback">{{ fieldError('union_code') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-registration_number">Registration number</label>
                
                <input
                    id="field-registration_number"
                    v-model="formData.registration_number"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('registration_number') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('registration_number')" class="invalid-feedback">{{ fieldError('registration_number') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-contact_person">Contact person</label>
                
                <input
                    id="field-contact_person"
                    v-model="formData.contact_person"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('contact_person') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('contact_person')" class="invalid-feedback">{{ fieldError('contact_person') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-phone">Phone</label>
                <div class="input-group">
                    <span class="input-group-text"><i class="fa fa-phone"></i></span>
                <input
                    id="field-phone"
                    v-model="formData.phone"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('phone') }"
                    :disabled="readonly || busy"
                />
                </div>
                <div v-if="fieldError('phone')" class="invalid-feedback">{{ fieldError('phone') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-email">Email</label>
                <div class="input-group">
                    <span class="input-group-text"><i class="fa fa-envelope"></i></span>
                    <input
                        id="field-email"
                        v-model="formData.email"
                        type="email"
                        
                        class="form-control"
                        :class="{ 'is-invalid': fieldError('email') }"
                        :disabled="readonly || busy"
                    />
                </div>
                <div v-if="fieldError('email')" class="invalid-feedback d-block">{{ fieldError('email') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-address">Address</label>
                <div class="input-group">
                    <span class="input-group-text"><i class="fa fa-map-marker"></i></span>
                <input
                    id="field-address"
                    v-model="formData.address"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('address') }"
                    :disabled="readonly || busy"
                />
                </div>
                <div v-if="fieldError('address')" class="invalid-feedback">{{ fieldError('address') }}</div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="field-monthly_dues">Monthly dues</label>
                
                <input
                    id="field-monthly_dues"
                    v-model="formData.monthly_dues"
                    type="text"
                    
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('monthly_dues') }"
                    :disabled="readonly || busy"
                />
                
                <div v-if="fieldError('monthly_dues')" class="invalid-feedback">{{ fieldError('monthly_dues') }}</div>
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
    