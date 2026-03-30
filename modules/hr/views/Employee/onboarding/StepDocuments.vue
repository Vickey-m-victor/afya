<script setup>
import { ref } from 'vue';
import { useApi } from '@/helpers/useApi';
import { useAlertStore } from '@/stores/alert';
import { parseBackendError } from '@/composables/useWarpHelpers';

const props = defineProps({
  formData: { type: Object, required: true },
  employeeId: { type: [Number, String], required: true }
});

const emit = defineEmits(['next', 'back', 'skip']);
const alertStore = useAlertStore();

const documents = ref(
  props.formData.documents?.length 
    ? [...props.formData.documents] 
    : [{ document_type_id: null, document_name: '', document_number: '', issue_date: '', expiry_date: '', file: null }]
);

const fieldErrors = ref({});
const isLoading = ref(false);
const { data: typeData } = useApi('/hr/document-type/search', { autoFetch: true, autoAlert: false });

const getTypes = () => typeData.value?.dataPayload?.data || [];

const addRow = () => {
  documents.value.push({ document_type_id: null, document_name: '', document_number: '', issue_date: '', expiry_date: '', file: null });
};

const removeRow = (index) => {
  documents.value.splice(index, 1);
};

const handleFileChange = (e, item) => {
    if (e.target.files.length) {
        item.file = e.target.files[0];
    }
};

const getFieldError = (index, field) => {
  return fieldErrors.value[`documents.${index}.${field}`] 
      || fieldErrors.value[`documents[${index}].${field}`]
      || fieldErrors.value[field];
};

const submit = async () => {
  fieldErrors.value = {};
  isLoading.value = true;
  
  const validDocs = documents.value.filter(d => d.document_type_id || d.file);
  
  if (validDocs.length === 0) {
      isLoading.value = false;
      return emit('next', []);
  }

  let successful = [];
  let hasError = false;

  for (let i = 0; i < validDocs.length; i++) {
        const item = validDocs[i];
        if (item.id) {
            successful.push(item);
            continue; 
        }
        
        const payloadData = new FormData();
        if (item.document_type_id) payloadData.append('document_type_id', item.document_type_id);
        if (item.document_name) payloadData.append('document_name', item.document_name);
        if (item.document_number) payloadData.append('document_number', item.document_number);
        if (item.issue_date) payloadData.append('issue_date', item.issue_date);
        if (item.expiry_date) payloadData.append('expiry_date', item.expiry_date);
        if (item.file) payloadData.append('file', item.file);

        const endpoint = `/hr/employees/${props.employeeId}/documents`;
        const { request, error } = useApi(endpoint, { method: 'POST', autoFetch: false });
        await request(payloadData);
        
        if (error.value) {
            const parsed = parseBackendError(error.value);
            for (const [key, val] of Object.entries(parsed.fieldErrors)) {
                fieldErrors.value[`documents.${i}.${key}`] = val;
            }
            if (!parsed.isValidation) {
                alertStore.show({ theme: 'danger', type: 'toast', message: parsed.message || 'Error uploading document.' });
            }
            hasError = true;
        } else {
            successful.push(item);
        }
  }
  
  isLoading.value = false;

  if (hasError) return;
  emit('next', successful);
};
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="mb-0">Employee Documents</h4>
        <button type="button" class="btn btn-sm btn-alt-success" @click="addRow">
            <i class="fa fa-plus me-1"></i> Add Document
        </button>
    </div>
    
    <form @submit.prevent="submit">
      <div v-if="documents.length === 0" class="alert alert-info py-2">
          No documents added. You can skip this step or add a document.
      </div>
      
      <div v-for="(item, index) in documents" :key="index" class="card mb-3 border">
          <div class="card-header bg-light py-2 d-flex justify-content-between align-items-center">
              <span class="fs-sm fw-semibold">Document #{{ index + 1 }}</span>
              <button type="button" class="btn btn-sm btn-danger px-2 py-1" @click="removeRow(index)">
                  <i class="fa fa-trash"></i>
              </button>
          </div>
          <div class="card-body">
              <div class="row g-3">
                  <div class="col-md-4">
                      <label class="form-label">Document Type <span class="text-danger">*</span></label>
                        <select v-model.number="item.document_type_id" class="form-select" :class="{'is-invalid': getFieldError(index, 'document_type_id')}">
                          <option :value="null">Select...</option>
                          <option v-for="type in getTypes()" :key="type.id" :value="type.id">{{ type.document_type_name || type.name || type.text }}</option>
                      </select>
                      <div class="invalid-feedback">{{ getFieldError(index, 'document_type_id') }}</div>
                  </div>
                  <div class="col-md-4">
                      <label class="form-label">Document Name <span class="text-danger">*</span></label>
                      <input v-model="item.document_name" type="text" class="form-control" :class="{'is-invalid': getFieldError(index, 'document_name')}">
                      <div class="invalid-feedback">{{ getFieldError(index, 'document_name') }}</div>
                  </div>
                  <div class="col-md-4">
                      <label class="form-label">Document Number</label>
                      <input v-model="item.document_number" type="text" class="form-control" :class="{'is-invalid': getFieldError(index, 'document_number')}">
                  </div>
                  
                  <div class="col-md-4">
                      <label class="form-label">Issue Date</label>
                      <input v-model="item.issue_date" type="date" class="form-control" :class="{'is-invalid': getFieldError(index, 'issue_date')}">
                  </div>
                  <div class="col-md-4">
                      <label class="form-label">Expiry Date</label>
                      <input v-model="item.expiry_date" type="date" class="form-control" :class="{'is-invalid': getFieldError(index, 'expiry_date')}">
                  </div>
                  <div class="col-md-4">
                      <label class="form-label">File Upload <span class="text-danger">*</span></label>
                      <input type="file" class="form-control" @change="e => handleFileChange(e, item)" :class="{'is-invalid': getFieldError(index, 'file')}">
                      <div class="invalid-feedback">{{ getFieldError(index, 'file') }}</div>
                  </div>
              </div>
          </div>
      </div>
      
      <div class="mt-4 d-flex justify-content-between">
        <button type="button" class="btn btn-alt-secondary" @click="emit('back')">
          <i class="fa fa-arrow-left me-1"></i> Back
        </button>
        <div>
            <button type="button" class="btn btn-alt-primary me-2" @click="emit('skip')">
              Skip
            </button>
            <button type="submit" class="btn btn-primary" :disabled="isLoading">
              <span v-if="isLoading" class="spinner-border spinner-border-sm me-1"></span>
              Save & Next <i class="fa fa-arrow-right ms-1"></i>
            </button>
        </div>
      </div>
    </form>
  </div>
</template>
