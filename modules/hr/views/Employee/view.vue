<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useApi } from '@/helpers/useApi';
import { parseBackendError } from '@/composables/useWarpHelpers';
import { useModalStore } from '@/stores/modal';
import LazySearchSelect from '@/components/inputs/LazySearchSelect.vue';
import EmployeeSectionEditModal from './EmployeeSectionEditModal.vue';

const route = useRoute();
const router = useRouter();
const id = computed(() => route.params.id);
const modalStore = useModalStore();

const formData = ref({});

// Prefer expand so we can render human-friendly names (profile, facility, department, etc)
const primaryViewUrl = computed(
  () => `/hr/employee/${id.value}?expand=profile,facility,department,job_title,job_group,employment_type,work_shift`
);
const fallbackViewUrl = computed(
  () => `/hr/employees/${id.value}?expand=profile,facility,department,job_title,job_group,employment_type,work_shift`
);

const parsedErrorMessage = ref('');

// Local fetch state (so we can retry + fallback cleanly)
const data = ref(null);
const error = ref(null);
const isLoading = ref(false);
const isError = ref(false);

const request = async () => {
  parsedErrorMessage.value = '';
  isLoading.value = true;
  isError.value = false;
  error.value = null;
  data.value = null;

  const tryFetch = async (url) => {
    const api = useApi(url, { method: 'GET', autoFetch: false });
    await api.request();
    return { data: api.data.value, error: api.error.value };
  };

  const primary = await tryFetch(primaryViewUrl.value);
  if (!primary.error) {
    data.value = primary.data;
    isLoading.value = false;
    return;
  }

  const fallback = await tryFetch(fallbackViewUrl.value);
  if (!fallback.error) {
    data.value = fallback.data;
    isLoading.value = false;
    return;
  }

  error.value = fallback.error ?? primary.error;
  isError.value = true;
  parsedErrorMessage.value = parseBackendError(error.value).message || 'Please try again.';
  isLoading.value = false;

  // eslint-disable-next-line no-console
  console.error('Employee detail fetch failed', {
    primary: primaryViewUrl.value,
    fallback: fallbackViewUrl.value,
    primaryError: primary.error,
    fallbackError: fallback.error,
  });
};

watch(
  data,
  () => {
    const payload = data.value?.dataPayload || data.value || {};
    formData.value = payload?.data || payload || {};
  },
  { immediate: true }
);

watch(id, () => {
  if (id.value) request();
}, { immediate: true });

const profile = computed(() => formData.value?.profile || {});
const fullName = computed(() =>
  [profile.value?.title, profile.value?.first_name, profile.value?.middle_name, profile.value?.last_name]
    .filter(Boolean)
    .join(' ')
    .trim()
);

const initials = computed(() => {
  const first = profile.value?.first_name?.trim()?.[0] || '';
  const last = profile.value?.last_name?.trim()?.[0] || '';
  const value = `${first}${last}`.toUpperCase();
  return value || '—';
});

const jobTitleName = computed(() => formData.value?.job_title?.name ?? formData.value?.job_title_name ?? null);
const jobGroupName = computed(() => formData.value?.job_group?.name ?? formData.value?.job_group_name ?? null);
const facilityName = computed(() => formData.value?.facility?.name ?? formData.value?.facility_name ?? null);
const departmentName = computed(() => formData.value?.department?.name ?? formData.value?.department_name ?? null);
const employmentTypeName = computed(() => formData.value?.employment_type?.name ?? formData.value?.employment_type_name ?? null);
const workShiftName = computed(() => formData.value?.work_shift?.name ?? formData.value?.work_shift_name ?? null);

const employeeStatus = computed(() => {
  const raw = formData.value?.status ?? formData.value?.employment_status ?? null;
  if (raw) return String(raw);
  if (typeof formData.value?.is_active === 'boolean') return formData.value.is_active ? 'Active' : 'Inactive';
  return null;
});

const formatDate = (value) => {
  if (!value) return null;
  const dt = new Date(value);
  if (Number.isNaN(dt.getTime())) return String(value);
  return new Intl.DateTimeFormat(undefined, { day: '2-digit', month: 'short', year: 'numeric' }).format(dt);
};

const formatRelative = (value) => {
  if (!value) return null;
  const dt = new Date(value);
  if (Number.isNaN(dt.getTime())) return null;
  const diffMs = dt.getTime() - Date.now();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });
  if (Math.abs(diffDays) < 30) return rtf.format(diffDays, 'day');
  const diffMonths = Math.round(diffDays / 30);
  if (Math.abs(diffMonths) < 24) return rtf.format(diffMonths, 'month');
  const diffYears = Math.round(diffMonths / 12);
  return rtf.format(diffYears, 'year');
};

const hireDateLabel = computed(() => formatDate(formData.value?.hire_date));
const hireDateRelative = computed(() => formatRelative(formData.value?.hire_date));

const toast = ref({ show: false, message: '' });
let toastTimer = null;
const showToast = (message) => {
  toast.value = { show: true, message };
  if (toastTimer) window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => (toast.value.show = false), 2200);
};

const copyToClipboard = async (text, label = 'Copied') => {
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    showToast(label);
  } catch {
    // Fallback for older browsers / blocked clipboard API
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showToast(label);
  }
};

const safeEmail = computed(() => profile.value?.email_address || formData.value?.email_address || null);
const safePhone = computed(() => profile.value?.mobile_number || formData.value?.mobile_number || null);

const documentUpload = ref({
  document_type_id: null,
  document_name: '',
  document_number: '',
  issue_date: '',
  expiry_date: '',
  file: null,
});

const documentUploadErrors = ref({});
const documentUploadLoading = ref(false);

const handleDocumentFileChange = (event) => {
  const files = event?.target?.files;
  documentUpload.value.file = files && files.length ? files[0] : null;
};

const uploadEmployeeDocument = async () => {
  documentUploadErrors.value = {};

  if (!documentUpload.value.file) {
    documentUploadErrors.value.file = 'File is required';
    return;
  }

  documentUploadLoading.value = true;

  try {
    const payload = new FormData();
    if (documentUpload.value.document_type_id) payload.append('document_type_id', documentUpload.value.document_type_id);
    if (documentUpload.value.document_name) payload.append('document_name', documentUpload.value.document_name);
    if (documentUpload.value.document_number) payload.append('document_number', documentUpload.value.document_number);
    if (documentUpload.value.issue_date) payload.append('issue_date', documentUpload.value.issue_date);
    if (documentUpload.value.expiry_date) payload.append('expiry_date', documentUpload.value.expiry_date);
    payload.append('file', documentUpload.value.file);

    const endpoint = `/hr/employees/${id.value}/documents`;
    const { request: uploadRequest, error: uploadError } = useApi(endpoint, {
      method: 'POST',
      autoFetch: false,
      options: {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    });

    await uploadRequest(payload);

    if (uploadError.value) {
      const parsed = parseBackendError(uploadError.value);
      documentUploadErrors.value = parsed.fieldErrors || {};
      if (!parsed.isValidation) {
        showToast(parsed.message || 'Document upload failed');
      }
      return;
    }

    showToast('Document uploaded successfully');
    documentUpload.value = {
      document_type_id: null,
      document_name: '',
      document_number: '',
      issue_date: '',
      expiry_date: '',
      file: null,
    };
    await request();
  } finally {
    documentUploadLoading.value = false;
  }
};

const openSectionEdit = (section) => {
  const sectionTitles = {
    about: 'Edit About Employee',
    bank: 'Edit Bank Information',
    dates: 'Edit Employment Dates',
    family: 'Edit Family Information',
    emergency: 'Edit Emergency Contacts',
  };

  modalStore.openModal({
    component: EmployeeSectionEditModal,
    title: sectionTitles[section] ?? 'Edit',
    size: 'lg',
    showFooter: false,
    scrollable: true,
    props: {
      employeeId: id.value,
      section,
      initialData: { ...formData.value },
      onSaved: async () => {
        await request();
      },
    },
  });
};

const expandAll = () => {
  const root = document.getElementById('accordionExample');
  if (!root) return;
  const targets = Array.from(root.querySelectorAll('.accordion-collapse'));
  targets.forEach((el) => {
    if (window.bootstrap?.Collapse) {
      window.bootstrap.Collapse.getOrCreateInstance(el, { toggle: false }).show();
    } else {
      el.classList.add('show');
    }
  });
};

const collapseAll = () => {
  const root = document.getElementById('accordionExample');
  if (!root) return;
  const targets = Array.from(root.querySelectorAll('.accordion-collapse'));
  targets.forEach((el) => {
    if (window.bootstrap?.Collapse) {
      window.bootstrap.Collapse.getOrCreateInstance(el, { toggle: false }).hide();
    } else {
      el.classList.remove('show');
    }
  });
};

onMounted(() => {
  // Ensure "About Employee" starts expanded (Bootstrap derives button state from `.collapsed` class)
  const aboutBtn = document.querySelector('[data-bs-target="#primaryBorderOne"]');
  if (aboutBtn) aboutBtn.classList.remove('collapsed');
});
</script>

<template>
  <div class="content">
    <!-- lightweight toast -->
    <div v-if="toast.show" class="copy-toast shadow-sm">
      <i class="ti ti-check me-2"></i>
      <span>{{ toast.message }}</span>
    </div>

    <!-- Breadcrumb / Page header -->
    <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
      <div class="my-auto mb-2">
        <h2 class="page-title mb-1">Employee Details</h2>
      </div>
      <div class="d-flex my-xl-auto right-content align-items-center flex-wrap">
        <div class="head-icons ms-2">
          <a
            href="javascript:void(0);"
            @click.prevent="router.push({ name: 'hr/employee' })"
            title="Back to List"
          >
            <i class="ti ti-arrow-left"></i>
          </a>
        </div>
      </div>
    </div>

    <div v-if="isError" class="card border-0">
      <div class="card-body text-center py-5">
        <div class="mb-2">
          <i class="ti ti-alert-triangle text-warning fs-1"></i>
        </div>
        <h5 class="mb-2">Couldn’t load employee details</h5>
        <div class="text-muted mb-3">
          {{ parsedErrorMessage || 'Please try again.' }}
        </div>
        <button type="button" class="btn btn-primary" @click="request()">
          <i class="ti ti-refresh me-1"></i>Retry
        </button>
      </div>
    </div>

    <div v-else-if="isLoading" class="row">
      <div class="col-xl-4 theiaStickySidebar">
        <div class="card card-bg-1">
          <div class="card-body p-0">
            <div class="p-3">
              <div class="d-flex align-items-center">
                <div class="skeleton skeleton-avatar me-3"></div>
                <div class="flex-fill">
                  <div class="skeleton skeleton-line w-75 mb-2"></div>
                  <div class="skeleton skeleton-line w-50"></div>
                </div>
              </div>
            </div>
            <div class="p-3 border-top">
              <div class="skeleton skeleton-line w-100 mb-2"></div>
              <div class="skeleton skeleton-line w-100 mb-2"></div>
              <div class="skeleton skeleton-line w-75"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-8">
        <div class="card">
          <div class="card-body">
            <div class="skeleton skeleton-line w-50 mb-3"></div>
            <div class="skeleton skeleton-line w-100 mb-2"></div>
            <div class="skeleton skeleton-line w-100 mb-2"></div>
            <div class="skeleton skeleton-line w-75"></div>
          </div>
        </div>
        <div class="card mt-3">
          <div class="card-body">
            <div class="skeleton skeleton-line w-40 mb-3"></div>
            <div class="skeleton skeleton-line w-100 mb-2"></div>
            <div class="skeleton skeleton-line w-75"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="row">
      <!-- LEFT: Profile + info sidebar -->
      <div class="col-xl-4 theiaStickySidebar">
        <div class="card card-bg-1">
          <div class="card-body p-0">
            <div class="employee-avatar">
              <div class="employee-avatar-inner">
                <span class="employee-initials">{{ initials }}</span>
              </div>
            </div>

            <div class="text-center px-3 pb-3 border-bottom">
              <div class="mb-3">
                <h5 class="d-flex align-items-center justify-content-center mb-1">
                  {{ fullName || '—' }}
                </h5>
                <div class="d-flex align-items-center justify-content-center gap-2 flex-wrap mb-2">
                  <span v-if="employeeStatus" class="badge badge-soft-success fw-medium">
                    <i class="ti ti-point-filled me-1"></i>{{ employeeStatus }}
                  </span>
                  <span v-if="employmentTypeName" class="badge badge-soft-info fw-medium">
                    <i class="ti ti-briefcase me-1"></i>{{ employmentTypeName }}
                  </span>
                </div>
                <span class="badge badge-soft-dark fw-medium me-2">
                  <i class="ti ti-point-filled me-1"></i>{{ jobTitleName || '—' }}
                </span>
                <span class="badge badge-soft-secondary fw-medium">
                  {{ jobGroupName || '—' }}
                </span>
              </div>

              <!-- Key facts -->
              <div class="key-facts rounded-3 p-2 text-start mb-2">
                <div class="d-flex align-items-center justify-content-between mb-1">
                  <span class="text-muted d-inline-flex align-items-center">
                    <i class="ti ti-id me-1"></i>Employee No
                  </span>
                  <span class="fw-medium text-dark">{{ formData.employee_number ?? '—' }}</span>
                </div>
                <div class="d-flex align-items-center justify-content-between mb-1">
                  <span class="text-muted d-inline-flex align-items-center">
                    <i class="ti ti-star me-1"></i>Department
                  </span>
                  <span class="fw-medium text-dark text-end">{{ departmentName || '—' }}</span>
                </div>
                <div class="d-flex align-items-center justify-content-between mb-1">
                  <span class="text-muted d-inline-flex align-items-center">
                    <i class="ti ti-building me-1"></i>Facility
                  </span>
                  <span class="fw-medium text-dark text-end">{{ facilityName || '—' }}</span>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                  <span class="text-muted d-inline-flex align-items-center">
                    <i class="ti ti-calendar-check me-1"></i>Hire Date
                  </span>
                  <span class="fw-medium text-dark text-end">
                    {{ hireDateLabel || '—' }}
                    <small v-if="hireDateRelative" class="text-muted ms-1">({{ hireDateRelative }})</small>
                  </span>
                </div>
              </div>

              <div>
                <div class="d-flex align-items-center justify-content-between mb-1">
                  <span class="d-inline-flex align-items-center">
                    <i class="ti ti-star me-1"></i>
                    Team
                  </span>
                  <p class="text-dark mb-0">{{ departmentName || '—' }}</p>
                </div>

                <div class="d-flex align-items-center justify-content-between mb-1">
                  <span class="d-inline-flex align-items-center">
                    <i class="ti ti-calendar-check me-1"></i>
                    Date Of Join
                  </span>
                  <p class="text-dark mb-0">{{ hireDateLabel || '—' }}</p>
                </div>

                <div class="d-flex align-items-center justify-content-between">
                  <span class="d-inline-flex align-items-center">
                    <i class="ti ti-calendar-check me-1"></i>
                    Report Office
                  </span>
                  <div class="d-flex align-items-center">
                    <span class="avatar avatar-sm avatar-rounded mx-1 me-2 bg-body-light d-inline-flex align-items-center justify-content-center">
                      <i class="ti ti-building text-primary"></i>
                    </span>
                    <p class="text-gray-9 mb-0">{{ facilityName || '—' }}</p>
                  </div>
                </div>

                <div class="row gx-2 mt-2">
                  <div class="col-6">
                    <div>
                      <button
                        type="button"
                        class="btn btn-dark w-100"
                        @click="router.push({ name: 'hr/employee/onboard', query: { id } })"
                      >
                        <i class="ti ti-edit me-1"></i>Edit Info
                      </button>
                    </div>
                  </div>
                  <div class="col-6">
                    <div>
                      <button type="button" class="btn btn-primary w-100">
                        <i class="ti ti-message-heart me-1"></i>Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Basic information -->
            <div class="p-3 border-bottom sidebar-info-section">
              <div class="d-flex align-items-center justify-content-between mb-1">
                <h6 class="mb-0">Basic information</h6>
                <button
                  type="button"
                  class="btn btn-icon btn-sm"
                  @click="router.push({ name: 'hr/employee/onboard', query: { id } })"
                  title="Edit"
                >
                  <i class="ti ti-edit"></i>
                </button>
              </div>

              <div class="d-flex align-items-center justify-content-between sidebar-info-row">
                <span class="d-inline-flex align-items-center">
                  <i class="ti ti-phone me-2"></i>
                  Phone
                </span>
                <div class="d-flex align-items-center gap-2">
                  <a
                    v-if="safePhone"
                    class="text-dark fw-medium"
                    :href="`tel:${safePhone}`"
                    title="Call"
                  >
                    {{ safePhone }}
                  </a>
                  <span v-else class="text-dark sidebar-info-value">—</span>
                  <button
                    v-if="safePhone"
                    type="button"
                    class="btn btn-icon btn-sm btn-light"
                    title="Copy phone"
                    @click="copyToClipboard(safePhone, 'Phone copied')"
                  >
                    <i class="ti ti-copy"></i>
                  </button>
                </div>
              </div>

              <div class="d-flex align-items-center justify-content-between sidebar-info-row">
                <span class="d-inline-flex align-items-center">
                  <i class="ti ti-mail-check me-2"></i>
                  Email
                </span>
                <div class="d-flex align-items-center gap-2">
                  <a
                    v-if="safeEmail"
                    class="text-info fw-medium"
                    :href="`mailto:${safeEmail}`"
                    title="Email"
                  >
                    {{ safeEmail }}
                  </a>
                  <span v-else class="text-dark sidebar-info-value">—</span>
                  <button
                    v-if="safeEmail"
                    type="button"
                    class="btn btn-icon btn-sm btn-light"
                    title="Copy email"
                    @click="copyToClipboard(safeEmail, 'Email copied')"
                  >
                    <i class="ti ti-copy"></i>
                  </button>
                </div>
              </div>

              <div class="d-flex align-items-center justify-content-between sidebar-info-row">
                <span class="d-inline-flex align-items-center">
                  <i class="ti ti-gender-male me-2"></i>
                  Gender
                </span>
                <p class="text-dark text-end sidebar-info-value">{{ profile.gender || formData.gender || '—' }}</p>
              </div>

              <div class="d-flex align-items-center justify-content-between sidebar-info-row">
                <span class="d-inline-flex align-items-center">
                  <i class="ti ti-cake me-2"></i>
                  Birthday
                </span>
                <p class="text-dark text-end sidebar-info-value">{{ profile.date_of_birth || formData.date_of_birth || '—' }}</p>
              </div>

              <div class="d-flex align-items-center justify-content-between sidebar-info-row mb-0">
                <span class="d-inline-flex align-items-center">
                  <i class="ti ti-map-pin-check me-2"></i>
                  Address
                </span>
                <p class="text-dark text-end sidebar-info-value">{{ profile.physical_address || formData.physical_address || '—' }}</p>
              </div>
            </div>

            <!-- Personal Information -->
            <div class="p-3 border-bottom sidebar-info-section">
              <div class="d-flex align-items-center justify-content-between mb-1">
                <h6 class="mb-0">Personal Information</h6>
                <button
                  type="button"
                  class="btn btn-icon btn-sm"
                  @click="router.push({ name: 'hr/employee/onboard', query: { id } })"
                  title="Edit"
                >
                  <i class="ti ti-edit"></i>
                </button>
              </div>

              <div class="d-flex align-items-center justify-content-between sidebar-info-row">
                <span class="d-inline-flex align-items-center">
                  <i class="ti ti-e-passport me-2"></i>
                  Passport No
                </span>
                <p class="text-dark sidebar-info-value">{{ profile.passport_number || formData.passport_number || '—' }}</p>
              </div>

              <div class="d-flex align-items-center justify-content-between sidebar-info-row">
                <span class="d-inline-flex align-items-center">
                  <i class="ti ti-id me-2"></i>
                  National ID
                </span>
                <p class="text-dark sidebar-info-value">{{ profile.national_id || formData.national_id || '—' }}</p>
              </div>

              <div class="d-flex align-items-center justify-content-between sidebar-info-row">
                <span class="d-inline-flex align-items-center">
                  <i class="ti ti-receipt me-2"></i>
                  KRA PIN
                </span>
                <p class="text-dark text-end sidebar-info-value">{{ profile.tax_pin || formData.tax_pin || '—' }}</p>
              </div>

              <div class="d-flex align-items-center justify-content-between sidebar-info-row">
                <span class="d-inline-flex align-items-center">
                  <i class="ti ti-bookmark-plus me-2"></i>
                  Religion
                </span>
                <p class="text-dark text-end sidebar-info-value">{{ profile.religion || formData.religion || '—' }}</p>
              </div>

              <div class="d-flex align-items-center justify-content-between sidebar-info-row">
                <span class="d-inline-flex align-items-center">
                  <i class="ti ti-hotel-service me-2"></i>
                  Marital status
                </span>
                <p class="text-dark text-end sidebar-info-value">{{ profile.marital_status || formData.marital_status || '—' }}</p>
              </div>

              <div class="d-flex align-items-center justify-content-between sidebar-info-row mb-0">
                <span class="d-inline-flex align-items-center">
                  <i class="ti ti-gender-male me-2"></i>
                  Nationality
                </span>
                <p class="text-dark text-end sidebar-info-value">{{ profile.nationality || formData.nationality || '—' }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Emergency Contact Number -->
        <!-- moved to right-side accordion to balance layout -->
      </div>

      <!-- RIGHT: Accordion details -->
      <div class="col-xl-8">
        <div class="sticky-actions mb-3">
          <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div class="d-flex align-items-center gap-2 flex-wrap">

              <button type="button" class="btn btn-outline-secondary" @click="router.push({ name: 'hr/employee' })">
                <i class="ti ti-arrow-left me-1"></i>Back
              </button>
            </div>
            <div class="d-flex align-items-center gap-2">
              <button type="button" class="btn btn-light" @click="expandAll">
                <i class="ti ti-arrows-maximize me-1"></i>Expand all
              </button>
              <button type="button" class="btn btn-light" @click="collapseAll">
                <i class="ti ti-arrows-minimize me-1"></i>Collapse all
              </button>
            </div>
          </div>
        </div>

        <div>
          <div class="tab-content custom-accordion-items">
            <div class="tab-pane active show" role="tabpanel">
              <div class="accordion accordions-items-seperate" id="accordionExample">

                <!-- About Employee -->
                <div class="accordion-item">
                  <div class="accordion-header d-flex align-items-center" id="headingOne">
                    <button
                      class="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#primaryBorderOne"
                      aria-expanded="true"
                      aria-controls="primaryBorderOne"
                    >
                      <div class="d-flex align-items-center justify-content-between w-100 gap-2">
                        <div class="d-flex align-items-center gap-2 flex-wrap">
                          <h5 class="mb-0">About Employee</h5>
                          <span v-if="facilityName" class="badge bg-light text-dark border">{{ facilityName }}</span>
                          <span v-if="departmentName" class="badge bg-light text-dark border">{{ departmentName }}</span>
                        </div>
                        <i class="ti ti-chevron-down fs-18 accordion-chevron" aria-hidden="true"></i>
                      </div>
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm btn-icon btn-light ms-2 flex-shrink-0"
                      @click.stop="openSectionEdit('about')"
                      title="Edit"
                    >
                      <i class="fa fa-pen"></i>
                    </button>
                  </div>
                  <div
                    id="primaryBorderOne"
                    class="accordion-collapse collapse show border-top"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body mt-2">
                      <div class="row g-3">
                        <div class="col-md-6">
                          <div class="d-flex align-items-center justify-content-between">
                            <span class="text-muted">Facility</span>
                            <span class="text-dark">{{ facilityName || '—' }}</span>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="d-flex align-items-center justify-content-between">
                            <span class="text-muted">Department</span>
                            <span class="text-dark">{{ departmentName || '—' }}</span>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="d-flex align-items-center justify-content-between">
                            <span class="text-muted">Job Title</span>
                            <span class="text-dark">{{ jobTitleName || '—' }}</span>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="d-flex align-items-center justify-content-between">
                            <span class="text-muted">Employment Type</span>
                            <span class="text-dark">{{ employmentTypeName || '—' }}</span>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="d-flex align-items-center justify-content-between">
                            <span class="text-muted">Work Shift</span>
                            <span class="text-dark">{{ workShiftName || '—' }}</span>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="d-flex align-items-center justify-content-between">
                            <span class="text-muted">Reports To</span>
                            <span class="text-dark">{{ formData.reports_to_employee_id ?? '—' }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Bank Information -->
                <div class="accordion-item">
                  <div class="accordion-header d-flex align-items-center" id="headingTwo">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#primaryBorderTwo"
                      aria-expanded="false"
                      aria-controls="primaryBorderTwo"
                    >
                      <div class="d-flex align-items-center justify-content-between w-100 gap-2">
                        <div class="d-flex align-items-center gap-2 flex-wrap">
                          <h5 class="mb-0">Bank Information</h5>
                          <span v-if="formData.bank_name" class="badge bg-light text-dark border">{{ formData.bank_name }}</span>
                        </div>
                        <i class="ti ti-chevron-down fs-18 accordion-chevron" aria-hidden="true"></i>
                      </div>
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm btn-icon btn-light ms-2 flex-shrink-0"
                      @click.stop="openSectionEdit('bank')"
                      title="Edit"
                    >
                      <i class="fa fa-pen"></i>
                    </button>
                  </div>
                  <div
                    id="primaryBorderTwo"
                    class="accordion-collapse collapse border-top"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <div v-if="!formData.bank_name && !formData.bank_account_number && !formData.bank_branch && !formData.bank_code" class="text-muted py-2">
                        No bank information on record.
                      </div>
                      <div v-else class="row">
                        <div class="col-md-3">
                          <span class="d-inline-flex align-items-center">Bank Name</span>
                          <h6 class="d-flex align-items-center fw-medium mt-1">{{ formData.bank_name || '—' }}</h6>
                        </div>
                        <div class="col-md-3">
                          <span class="d-inline-flex align-items-center">Bank Account No</span>
                          <h6 class="d-flex align-items-center fw-medium mt-1">{{ formData.bank_account_number || '—' }}</h6>
                        </div>
                        <div class="col-md-3">
                          <span class="d-inline-flex align-items-center">Bank Branch</span>
                          <h6 class="d-flex align-items-center fw-medium mt-1">{{ formData.bank_branch || '—' }}</h6>
                        </div>
                        <div class="col-md-3">
                          <span class="d-inline-flex align-items-center">Bank Code</span>
                          <h6 class="d-flex align-items-center fw-medium mt-1">{{ formData.bank_code || '—' }}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Employment Dates -->
                <div class="accordion-item">
                  <div class="accordion-header d-flex align-items-center" id="headingThree">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#primaryBorderThree"
                      aria-expanded="false"
                      aria-controls="primaryBorderThree"
                    >
                      <div class="d-flex align-items-center justify-content-between w-100 gap-2">
                        <div class="d-flex align-items-center gap-2 flex-wrap">
                          <h5 class="mb-0">Employment Dates</h5>
                          <span v-if="hireDateLabel" class="badge bg-light text-dark border">Hired {{ hireDateLabel }}</span>
                        </div>
                        <i class="ti ti-chevron-down fs-18 accordion-chevron" aria-hidden="true"></i>
                      </div>
                    </button>
                    <button
                      type="button"
                      class="btn btn-icon btn-sm btn-light ms-2 flex-shrink-0"
                      @click.stop="openSectionEdit('dates')"
                      title="Edit"
                    >
                      <i class="fa fa-pen"></i>
                    </button>
                  </div>
                  <div
                    id="primaryBorderThree"
                    class="accordion-collapse collapse border-top"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <div class="row">
                        <div class="col-md-3">
                          <span class="d-inline-flex align-items-center">Hire Date</span>
                          <h6 class="d-flex align-items-center fw-medium mt-1">{{ hireDateLabel || '—' }}</h6>
                        </div>
                        <div class="col-md-3">
                          <span class="d-inline-flex align-items-center">Probation End Date</span>
                          <h6 class="d-flex align-items-center fw-medium mt-1">{{ formatDate(formData.probation_end_date) || '—' }}</h6>
                        </div>
                        <div class="col-md-3">
                          <span class="d-inline-flex align-items-center">Confirmation Date</span>
                          <h6 class="d-flex align-items-center fw-medium mt-1">{{ formatDate(formData.confirmation_date) || '—' }}</h6>
                        </div>
                        <div class="col-md-3">
                          <span class="d-inline-flex align-items-center">Termination Date</span>
                          <h6 class="d-flex align-items-center fw-medium mt-1">{{ formatDate(formData.termination_date) || '—' }}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Family Information -->
                <div class="accordion-item">
                  <div class="accordion-header d-flex align-items-center" id="headingFour">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#primaryBorderFour"
                      aria-expanded="false"
                      aria-controls="primaryBorderFour"
                    >
                      <div class="d-flex align-items-center justify-content-between w-100 gap-2">
                        <div class="d-flex align-items-center gap-2 flex-wrap">
                          <h5 class="mb-0">Family Information</h5>
                          <span v-if="formData.number_of_children !== undefined && formData.number_of_children !== null" class="badge bg-light text-dark border">
                            {{ formData.number_of_children }} children
                          </span>
                        </div>
                        <i class="ti ti-chevron-down fs-18 accordion-chevron" aria-hidden="true"></i>
                      </div>
                    </button>
                    <button
                      type="button"
                      class="btn btn-icon btn-sm btn-light ms-2 flex-shrink-0"
                      @click.stop="openSectionEdit('family')"
                      title="Edit"
                    >
                      <i class="fa fa-pen"></i>
                    </button>
                  </div>
                  <div
                    id="primaryBorderFour"
                    class="accordion-collapse collapse border-top"
                    aria-labelledby="headingFour"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <div v-if="!formData.spouse_name && !formData.next_of_kin && (formData.number_of_children === null || formData.number_of_children === undefined)" class="text-muted py-2">
                        No family information on record.
                      </div>
                      <div v-else class="row">
                        <div class="col-md-3">
                          <span class="d-inline-flex align-items-center">Spouse Name</span>
                          <h6 class="d-flex align-items-center fw-medium mt-1">{{ formData.spouse_name || '—' }}</h6>
                        </div>
                        <div class="col-md-3">
                          <span class="d-inline-flex align-items-center">No. of Children</span>
                          <h6 class="d-flex align-items-center fw-medium mt-1">{{ formData.number_of_children ?? '—' }}</h6>
                        </div>
                        <div class="col-md-3">
                          <span class="d-inline-flex align-items-center">Next of Kin</span>
                          <h6 class="d-flex align-items-center fw-medium mt-1">{{ formData.next_of_kin || '—' }}</h6>
                        </div>
                        <div class="col-md-3">
                          <span class="d-inline-flex align-items-center">Relationship</span>
                          <h6 class="d-flex align-items-center fw-medium mt-1">{{ formData.next_of_kin_relationship || '—' }}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Emergency Contacts -->
                <div class="accordion-item">
                  <div class="accordion-header d-flex align-items-center" id="headingFive">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#primaryBorderFive"
                      aria-expanded="false"
                      aria-controls="primaryBorderFive"
                    >
                      <div class="d-flex align-items-center justify-content-between w-100 gap-2">
                        <div class="d-flex align-items-center gap-2 flex-wrap">
                          <h5 class="mb-0">Emergency Contacts</h5>
                        </div>
                        <i class="ti ti-chevron-down fs-18 accordion-chevron" aria-hidden="true"></i>
                      </div>
                    </button>
                    <button
                      type="button"
                      class="btn btn-icon btn-sm btn-light ms-2 flex-shrink-0"
                      @click.stop="openSectionEdit('emergency')"
                      title="Edit"
                    >
                      <i class="fa fa-pen"></i>
                    </button>
                  </div>
                  <div
                    id="primaryBorderFive"
                    class="accordion-collapse collapse border-top"
                    aria-labelledby="headingFive"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <div class="row g-3">
                        <div class="col-md-6">
                          <div class="p-3 rounded-3 border bg-body">
                            <div class="d-flex align-items-center justify-content-between mb-2">
                              <span class="text-muted">Primary</span>
                              <span class="badge bg-light text-dark border">Contact</span>
                            </div>
                            <div class="d-flex align-items-center justify-content-between">
                              <span class="text-dark fw-medium">{{ formData.emergency_primary_name || '—' }}</span>
                              <span class="text-dark">{{ formData.emergency_primary_phone || '—' }}</span>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="p-3 rounded-3 border bg-body">
                            <div class="d-flex align-items-center justify-content-between mb-2">
                              <span class="text-muted">Secondary</span>
                              <span class="badge bg-light text-dark border">Contact</span>
                            </div>
                            <div class="d-flex align-items-center justify-content-between">
                              <span class="text-dark fw-medium">{{ formData.emergency_secondary_name || '—' }}</span>
                              <span class="text-dark">{{ formData.emergency_secondary_phone || '—' }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div v-if="!formData.emergency_primary_name && !formData.emergency_primary_phone && !formData.emergency_secondary_name && !formData.emergency_secondary_phone" class="text-muted mt-3">
                        No emergency contact information on record.
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <!-- Bottom-right filler: Projects / Assets card (keeps layout balanced) -->
        <div class="card mt-3">
          <div class="card-header bg-white">
            <ul class="nav nav-tabs card-header-tabs" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="emp-projects-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#emp-projects"
                  type="button"
                  role="tab"
                  aria-controls="emp-projects"
                  aria-selected="true"
                >
                  Projects
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="emp-assets-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#emp-assets"
                  type="button"
                  role="tab"
                  aria-controls="emp-assets"
                  aria-selected="false"
                >
                  Assets
                </button>
              </li>
            </ul>
          </div>
          <div class="card-body">
            <div class="tab-content">
              <div class="tab-pane fade show active" id="emp-projects" role="tabpanel" aria-labelledby="emp-projects-tab">
                <div class="row g-3">
                  <div class="col-md-6">
                    <div class="mini-card p-3 rounded-3 border">
                      <div class="d-flex align-items-center justify-content-between">
                        <div>
                          <div class="fw-semibold">Current Assignment</div>
                          <div class="text-muted small">Active project / unit</div>
                        </div>
                        <div class="mini-icon bg-primary-subtle text-primary">
                          <i class="fa fa-briefcase"></i>
                        </div>
                      </div>
                      <div class="d-flex align-items-center justify-content-between mt-3">
                        <div class="text-muted small">Facility</div>
                        <div class="fw-medium text-dark">{{ facilityName || '—' }}</div>
                      </div>
                      <div class="d-flex align-items-center justify-content-between mt-2">
                        <div class="text-muted small">Department</div>
                        <div class="fw-medium text-dark">{{ departmentName || '—' }}</div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mini-card p-3 rounded-3 border">
                      <div class="d-flex align-items-center justify-content-between">
                        <div>
                          <div class="fw-semibold">Role</div>
                          <div class="text-muted small">Title / group</div>
                        </div>
                        <div class="mini-icon bg-info-subtle text-info">
                          <i class="fa fa-user-tie"></i>
                        </div>
                      </div>
                      <div class="d-flex align-items-center justify-content-between mt-3">
                        <div class="text-muted small">Job Title</div>
                        <div class="fw-medium text-dark">{{ jobTitleName || '—' }}</div>
                      </div>
                      <div class="d-flex align-items-center justify-content-between mt-2">
                        <div class="text-muted small">Job Group</div>
                        <div class="fw-medium text-dark">{{ jobGroupName || '—' }}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text-muted small mt-3">
                  This area can be connected to real “projects/assets” once the API endpoints are available.
                </div>
              </div>

              <div class="tab-pane fade" id="emp-assets" role="tabpanel" aria-labelledby="emp-assets-tab">
                <div class="row g-3">
                  <div class="col-md-6">
                    <div class="mini-card p-3 rounded-3 border">
                      <div class="d-flex align-items-center justify-content-between">
                        <div>
                          <div class="fw-semibold">Assigned Assets</div>
                          <div class="text-muted small">Devices / items</div>
                        </div>
                        <div class="mini-icon bg-warning-subtle text-warning">
                          <i class="fa fa-laptop"></i>
                        </div>
                      </div>
                      <div class="mt-3 text-muted small">No assets linked yet.</div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mini-card p-3 rounded-3 border">
                      <div class="d-flex align-items-center justify-content-between">
                        <div>
                          <div class="fw-semibold">Documents</div>
                          <div class="text-muted small">ID / contracts</div>
                        </div>
                        <div class="mini-icon bg-secondary-subtle text-secondary">
                          <i class="fa fa-file-alt"></i>
                        </div>
                      </div>
                      <div class="row g-2 mt-1">
                        <div class="col-12">
                          <label class="form-label small mb-1">Document Type</label>
                          <LazySearchSelect
                            v-model="documentUpload.document_type_id"
                            endpoint="/hr/document-type/search"
                            placeholder="Select..."
                            :disabled="documentUploadLoading"
                            :invalid="!!documentUploadErrors.document_type_id"
                          />
                          <div v-if="documentUploadErrors.document_type_id" class="invalid-feedback d-block">{{ documentUploadErrors.document_type_id }}</div>
                        </div>
                        <div class="col-12">
                          <label class="form-label small mb-1">Document Name</label>
                          <input v-model="documentUpload.document_name" type="text" class="form-control" :disabled="documentUploadLoading" :class="{ 'is-invalid': documentUploadErrors.document_name }" />
                          <div v-if="documentUploadErrors.document_name" class="invalid-feedback">{{ documentUploadErrors.document_name }}</div>
                        </div>
                        <div class="col-12">
                          <label class="form-label small mb-1">Document Number</label>
                          <input v-model="documentUpload.document_number" type="text" class="form-control" :disabled="documentUploadLoading" :class="{ 'is-invalid': documentUploadErrors.document_number }" />
                          <div v-if="documentUploadErrors.document_number" class="invalid-feedback">{{ documentUploadErrors.document_number }}</div>
                        </div>
                        <div class="col-6">
                          <label class="form-label small mb-1">Issue Date</label>
                          <input v-model="documentUpload.issue_date" type="date" class="form-control" :disabled="documentUploadLoading" :class="{ 'is-invalid': documentUploadErrors.issue_date }" />
                          <div v-if="documentUploadErrors.issue_date" class="invalid-feedback">{{ documentUploadErrors.issue_date }}</div>
                        </div>
                        <div class="col-6">
                          <label class="form-label small mb-1">Expiry Date</label>
                          <input v-model="documentUpload.expiry_date" type="date" class="form-control" :disabled="documentUploadLoading" :class="{ 'is-invalid': documentUploadErrors.expiry_date }" />
                          <div v-if="documentUploadErrors.expiry_date" class="invalid-feedback">{{ documentUploadErrors.expiry_date }}</div>
                        </div>
                        <div class="col-12">
                          <label class="form-label small mb-1">File</label>
                          <input type="file" class="form-control" :disabled="documentUploadLoading" :class="{ 'is-invalid': documentUploadErrors.file }" @change="handleDocumentFileChange" />
                          <div v-if="documentUploadErrors.file" class="invalid-feedback">{{ documentUploadErrors.file }}</div>
                        </div>
                        <div class="col-12 mt-2">
                          <button type="button" class="btn btn-sm btn-primary" :disabled="documentUploadLoading" @click="uploadEmployeeDocument">
                            <span v-if="documentUploadLoading" class="spinner-border spinner-border-sm me-1"></span>
                            Upload Document
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-breadcrumb .right-content .btn {
  white-space: nowrap;
}

.copy-toast {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 1056;
  background: rgba(33, 37, 41, 0.95);
  color: #fff;
  padding: 10px 12px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  max-width: min(420px, calc(100vw - 32px));
}

.card-bg-1 {
  padding-top: 50px;
  position: relative;
  border-radius: 0.5rem;
  overflow: visible;
}

.card-bg-1::before {
  content: "";
  background: linear-gradient(135deg, #1B84FF, #0d4f9e, #2196F3);
  position: absolute;
  border-radius: 5px 5px 0 0;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100px;
  z-index: 0;
}

.employee-avatar {
  position: relative;
  z-index: 1;
  width: 100px;
  height: 100px;
  margin: 0 auto 10px;
}

.employee-avatar-inner {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #e9ecef;
  border: 3px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.employee-initials {
  font-weight: 800;
  font-size: 1.5rem;
  color: #0d6efd;
}

.badge-soft-dark {
  background-color: rgba(33, 37, 41, 0.08);
  color: #212529;
}

.badge-soft-secondary {
  background-color: rgba(108, 117, 125, 0.12);
  color: #6c757d;
}

.badge-soft-success {
  background-color: rgba(25, 135, 84, 0.12);
  color: #198754;
}

.badge-soft-info {
  background-color: rgba(13, 110, 253, 0.10);
  color: #0d6efd;
}

.key-facts {
  background: rgba(13, 110, 253, 0.03);
  border: 1px solid rgba(13, 110, 253, 0.12);
}

.accordions-items-seperate .accordion-item {
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.08);
  margin-bottom: 0.75rem;
}

.accordions-items-seperate .accordion-header.d-flex {
  gap: 0.5rem;
  padding-right: 0.5rem; /* keep edge breathing room */
}

.accordions-items-seperate .accordion-button {
  background: var(--bs-body-bg);
  box-shadow: none;
  padding-right: 1.25rem; /* prevents chevron hugging edge */
}

.accordions-items-seperate .accordion-header.d-flex > .accordion-button {
  flex: 1 1 auto;
  width: auto;
  border-top-right-radius: 0;  /* visual continuity with edit button */
  border-bottom-right-radius: 0;
}

.accordions-items-seperate .accordion-header.d-flex > .btn {
  position: relative;
  z-index: 1;
  margin-right: 0.25rem;
}

.accordions-items-seperate .accordion-button:focus {
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.18);
}

.accordions-items-seperate .accordion-button:hover {
  background: rgba(13, 110, 253, 0.03);
}

.accordion-chevron {
  transition: transform 160ms ease;
  margin-left: 0.75rem;
}

.accordion-button.collapsed .accordion-chevron {
  transform: rotate(-90deg);
}

.collapse-arrow {
  color: var(--bs-primary);
  text-decoration: none;
  padding: 0.25rem 0.25rem;
}

.sticky-actions {
  position: sticky;
  top: 12px;
  z-index: 2;
  padding: 10px 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 0.75rem;
  background: var(--bs-body-bg);
}

.skeleton {
  background: linear-gradient(90deg, rgba(0,0,0,0.06), rgba(0,0,0,0.10), rgba(0,0,0,0.06));
  background-size: 200% 100%;
  animation: skeleton-loading 1.1s infinite;
  border-radius: 10px;
}

.skeleton-line {
  height: 12px;
}

.skeleton-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
}

.mini-card {
  background: var(--bs-body-bg);
}

.mini-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sidebar-info-section {
  padding-top: 0.8rem !important;
  padding-bottom: 0.8rem !important;
}

.sidebar-info-row {
  margin-bottom: 0.35rem;
  gap: 0.5rem;
}

.sidebar-info-row > span,
.sidebar-info-row > div,
.sidebar-info-value {
  line-height: 1.2;
}

.sidebar-info-value {
  margin-bottom: 0;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>