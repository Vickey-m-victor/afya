export default function formTemplate(name, schema) {
    const properties = schema?.properties || {};
    const ignoredFields = new Set([
        'created_at',
        'updated_at',
        'is_deleted',
        'createdAt',
        'updatedAt',
        'isDeleted',
    ]);

    const requiredFields = Array.isArray(schema?.required)
        ? schema.required.filter((key) => !ignoredFields.has(key))
        : [];
    const scriptSection = `
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
const requiredFields = new Set(${JSON.stringify(requiredFields)});

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
<\/script>
    `;

    const templateSection = `
<template>
    <form @submit.prevent="handleSubmit">
        <div v-if="typeof error === 'string' && error" class="alert alert-danger mb-3">
            {{ error }}
        </div>

        <div class="row g-3">
            ${Object.entries(properties)
            .filter(([key]) => !ignoredFields.has(key))
            .map(([key, value]) => buildFieldTemplate(key, value, requiredFields))
            .join('\n')}
        </div>

        <div v-if="!hideSubmit" class="text-end mt-4">
            <button type="submit" class="btn btn-primary" :disabled="busy || readonly">
                <span v-if="busy" class="spinner-border spinner-border-sm me-2"></span>
                {{ busy ? 'Saving...' : 'Save' }}
            </button>
        </div>
    </form>
<\/template>
    `;

    return `${scriptSection}\n${templateSection}`;
}

function buildFieldTemplate(key, schema = {}, requiredFields = []) {
    const type = String(schema.type || '').toLowerCase();
    const format = String(schema.format || '').toLowerCase();
    const label = schema.title || formatLabel(key);
    const isRequired = requiredFields.includes(key);
    const requiredMark = isRequired ? ' <span class="text-danger">*</span>' : '';
    const enumValues = schema.enum || null;
    const maxLength = schema.maxLength || 0;
    const colClass = getColumnClass(key, type, format, maxLength);
    const iconClass = getFieldIcon(key, type, format);

    // Boolean → checkbox
    if (type === 'boolean') {
        return `
            <div class="${colClass}">
                <div class="form-check mb-0">
                    <input
                        id="field-${key}"
                        v-model="formData.${key}"
                        class="form-check-input"
                        type="checkbox"
                        ${isRequired ? 'required' : ''}
                        :disabled="readonly || busy"
                    />
                    <label class="form-check-label" for="field-${key}">${label}${requiredMark}</label>
                    <div v-if="fieldError('${key}')" class="text-danger small mt-1">{{ fieldError('${key}') }}</div>
                </div>
            </div>`;
    }

    // Enum → select dropdown
    if (enumValues && Array.isArray(enumValues)) {
        const options = enumValues
            .map(val => `                        <option value="${val}">${formatLabel(String(val))}</option>`)
            .join('\n');
        return `
            <div class="${colClass}">
                <label class="form-label" for="field-${key}">${label}${requiredMark}</label>
                <select
                    id="field-${key}"
                    v-model="formData.${key}"
                    class="form-select"
                    :class="{ 'is-invalid': fieldError('${key}') }"
                    :disabled="readonly || busy"
                    ${isRequired ? 'required' : ''}
                >
                    <option value="" disabled>Select ${label}</option>
${options}
                </select>
                <div v-if="fieldError('${key}')" class="invalid-feedback">{{ fieldError('${key}') }}</div>
            </div>`;
    }

    // Date/time fields
    if (format === 'date-time' || format === 'datetime') {
        return `
            <div class="${colClass}">
                <label class="form-label" for="field-${key}">${label}${requiredMark}</label>
                ${iconClass ? `<div class="input-group">
                    <span class="input-group-text"><i class="${iconClass}"></i></span>` : ''}
                <input
                    id="field-${key}"
                    v-model="formData.${key}"
                    type="datetime-local"
                    ${isRequired ? 'required' : ''}
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('${key}') }"
                    :disabled="readonly || busy"
                />
                ${iconClass ? `</div>` : ''}
                <div v-if="fieldError('${key}')" class="invalid-feedback">{{ fieldError('${key}') }}</div>
            </div>`;
    }

    if (format === 'date') {
        return `
            <div class="${colClass}">
                <label class="form-label" for="field-${key}">${label}${requiredMark}</label>
                ${iconClass ? `<div class="input-group">
                    <span class="input-group-text"><i class="${iconClass}"></i></span>` : ''}
                <input
                    id="field-${key}"
                    v-model="formData.${key}"
                    type="date"
                    ${isRequired ? 'required' : ''}
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('${key}') }"
                    :disabled="readonly || busy"
                />
                ${iconClass ? `</div>` : ''}
                <div v-if="fieldError('${key}')" class="invalid-feedback">{{ fieldError('${key}') }}</div>
            </div>`;
    }

    // Number / integer
    if (type === 'integer' || type === 'number' || type === 'int') {
        return `
            <div class="${colClass}">
                <label class="form-label" for="field-${key}">${label}${requiredMark}</label>
                ${iconClass ? `<div class="input-group">
                    <span class="input-group-text"><i class="${iconClass}"></i></span>` : ''}
                <input
                    id="field-${key}"
                    v-model.number="formData.${key}"
                    type="number"
                    ${isRequired ? 'required' : ''}
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('${key}') }"
                    :disabled="readonly || busy"
                />
                ${iconClass ? `</div>` : ''}
                <div v-if="fieldError('${key}')" class="invalid-feedback">{{ fieldError('${key}') }}</div>
            </div>`;
    }

    // Long text → textarea
    if (type === 'string' && (maxLength > 255 || isTextAreaField(key))) {
        return `
            <div class="col-12">
                <label class="form-label" for="field-${key}">${label}${requiredMark}</label>
                <textarea
                    id="field-${key}"
                    v-model="formData.${key}"
                    rows="4"
                    ${isRequired ? 'required' : ''}
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('${key}') }"
                    :disabled="readonly || busy"
                ></textarea>
                <div v-if="fieldError('${key}')" class="invalid-feedback">{{ fieldError('${key}') }}</div>
            </div>`;
    }

    // Email field
    if (format === 'email' || key.toLowerCase().includes('email')) {
        return `
            <div class="${colClass}">
                <label class="form-label" for="field-${key}">${label}${requiredMark}</label>
                <div class="input-group">
                    <span class="input-group-text"><i class="fa fa-envelope"></i></span>
                    <input
                        id="field-${key}"
                        v-model="formData.${key}"
                        type="email"
                        ${isRequired ? 'required' : ''}
                        class="form-control"
                        :class="{ 'is-invalid': fieldError('${key}') }"
                        :disabled="readonly || busy"
                    />
                </div>
                <div v-if="fieldError('${key}')" class="invalid-feedback d-block">{{ fieldError('${key}') }}</div>
            </div>`;
    }

    // Default → text input with optional icon
    return `
            <div class="${colClass}">
                <label class="form-label" for="field-${key}">${label}${requiredMark}</label>
                ${iconClass ? `<div class="input-group">
                    <span class="input-group-text"><i class="${iconClass}"></i></span>` : ''}
                <input
                    id="field-${key}"
                    v-model="formData.${key}"
                    type="text"
                    ${isRequired ? 'required' : ''}
                    class="form-control"
                    :class="{ 'is-invalid': fieldError('${key}') }"
                    :disabled="readonly || busy"
                />
                ${iconClass ? `</div>` : ''}
                <div v-if="fieldError('${key}')" class="invalid-feedback">{{ fieldError('${key}') }}</div>
            </div>`;
}

function formatLabel(propertyName) {
    return propertyName
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getColumnClass(key, type, format, maxLength) {
    // Full-width for long text, descriptions, notes
    if (type === 'string' && (maxLength > 255 || isTextAreaField(key))) return 'col-12';
    // Boolean checkboxes are compact
    if (type === 'boolean') return 'col-md-6 col-lg-4';
    // Default: half-width on medium screens
    return 'col-md-6';
}

function getFieldIcon(key, type, format) {
    const k = key.toLowerCase();
    if (k.includes('phone') || k.includes('mobile') || k.includes('tel')) return 'fa fa-phone';
    if (k.includes('user') || k.includes('username')) return 'fa fa-user';
    if (k.includes('password') || k.includes('secret')) return 'fa fa-lock';
    if (k.includes('url') || k.includes('link') || k.includes('website')) return 'fa fa-link';
    if (k.includes('ip') || k.includes('address')) return 'fa fa-map-marker';
    if (format === 'date' || format === 'date-time' || k.includes('date') || k.includes('time')) return 'fa fa-calendar';
    return '';
}

function isTextAreaField(key) {
    const k = key.toLowerCase();
    return k.includes('description') || k.includes('notes') || k.includes('comment')
        || k.includes('body') || k.includes('content') || k.includes('message')
        || k.includes('bio') || k.includes('summary') || k.includes('extra_data');
}
