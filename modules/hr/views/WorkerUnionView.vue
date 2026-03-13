<script setup>
import { ref, reactive, onMounted } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseModal from "@/components/BaseModal.vue";
import BaseGridForm from "@/components/BaseGridForm.vue";
import BasePageHeading from "@/components/BasePageHeading.vue";
import { useWorkerUnionStore } from "~/hr/stores/workerUnionStore";
import { useAlert } from "@/composables/alerts";

const { toastSuccess, toastError, confirmAction } = useAlert();
const store = useWorkerUnionStore();

const showModal = ref(false);
const isEditing = ref(false);
let currentQuery = "";

const tableColumns = [
  { name: "Union Id", field: "union_id" },
  { name: "Union Name", field: "union_name" },
  { name: "Union Code", field: "union_code" },
  { name: "Registration Number", field: "registration_number" },
  { name: "Contact Person", field: "contact_person" },
  { name: "Phone", field: "phone" },
  { name: "Email", field: "email" },
  { name: "Address", field: "address" },
  { name: "Monthly Dues", field: "monthly_dues" },
  { name: "Status", field: "status" },
  { name: "Actions", field: "actions" },
];

const formData = ref({});
const formFields = reactive([
  { label: "Union ID", type: "text", name: "union_id", placeholder: "Enter ID", col: "col-4" },
  { label: "Union Name", type: "text", name: "union_name", placeholder: "Enter Name", col: "col-8" },
  { label: "Union Code", type: "text", name: "union_code", placeholder: "Enter Code", col: "col-4" },
  { label: "Registration No.", type: "text", name: "registration_number", placeholder: "Enter Reg Number", col: "col-8" },
  { label: "Contact Person", type: "text", name: "contact_person", placeholder: "Enter Contact Name", col: "col-6" },
  { label: "Phone Number", type: "text", name: "phone", placeholder: "Enter Phone", col: "col-6" },
  { label: "Email Address", type: "email", name: "email", placeholder: "Enter Email", col: "col-6" },
  { label: "Monthly Dues", type: "text", name: "monthly_dues", placeholder: "Enter Dues Amount", col: "col-6" },
  { label: "Status", type: "badge", name: "status", col: "col-4" },
  { label: "Physical Address", type: "textarea", name: "address", placeholder: "Enter Address", col: "col-12" },
]);

const handleSearch = (query) => { currentQuery = query; store.fetchAll(query, 1, store.pagination?.perPage || 25); };
const handlePageChange = (newPage) => { store.fetchAll(currentQuery, newPage, store.pagination?.perPage || 25); };
const handleSizeChange = (newSize) => { store.fetchAll(currentQuery, 1, newSize); };

const openCreateModal = () => { isEditing.value = false; formData.value = {}; showModal.value = true; };
const openEditModal = (row) => { isEditing.value = true; formData.value = { ...row }; showModal.value = true; };

const handleSave = async () => {
  try {
    const recordId = formData.value.id || formData.value.uuid || formData.value[`worker_union_id`];
    if (isEditing.value) {
      await store.update(recordId, formData.value);
      toastSuccess("Success", "WorkerUnion updated successfully!");
    } else {
      await store.create(formData.value);
      toastSuccess("Success", "WorkerUnion created successfully!");
    }
    showModal.value = false;
  } catch (error) {
    toastError("Error", error.response?.data?.message || "Failed to save data");
  }
};

const handleDelete = async (row) => {
  const recordId = row.id || row.uuid || row[`worker_union_id`]; 
  const confirmed = await confirmAction("Are you sure?", "You won't be able to revert this!");
  if (confirmed.isConfirmed) {
    try {
      await store.delete(recordId);
      toastSuccess("Deleted!", "Record has been deleted.");
    } catch (error) {
      toastError("Error", "Failed to delete record.");
    }
  }
};

onMounted(() => { store.fetchAll().catch(() => toastError("Error", "Failed to load data")); });
</script>

<template>
  <div class="content">
    <BasePageHeading title="WorkerUnion Management" />
    <BaseTable
      title="WorkerUnions"
      :data="store.items"
      :columns="tableColumns"
      :loading="store.loading"
      :pagination="store.pagination"
      :show-index="false"
      @search="handleSearch"
      @page-change="handlePageChange"
      @size-change="handleSizeChange"
    >
      <template #cell(status)="{ row }">
        <span v-if="row.status" class="badge" :class="`bg-${row.status.theme || 'primary'}`">
          {{ row.status.label || 'N/A' }}
        </span>
        <span v-else class="text-muted">N/A</span>
      </template>

      <template #header-actions>
        <button class="btn btn-sm btn-primary" @click="openCreateModal">
          <i class="fa fa-plus me-1"></i> Create Union
        </button>
      </template>

      <template #cell(actions)="{ row }">
        <button class="btn btn-sm btn-alt-primary me-1" @click="openEditModal(row)" title="Edit">
          <i class="fa fa-pencil-alt"></i>
        </button>
        <button class="btn btn-sm btn-alt-danger" @click="handleDelete(row)" title="Delete">
          <i class="fa fa-trash"></i>
        </button>
      </template>
    </BaseTable>

    <BaseModal 
      :showModal="showModal" 
      size="modal-lg"
      :title="isEditing ? 'Edit WorkerUnion' : 'Create WorkerUnion'" 
      @close="showModal = false"
    >
      <BaseGridForm v-model="formData" :fields="formFields" :showSubmit="false" />
      <template #footer>
        <button type="button" class="btn btn-sm btn-alt-secondary me-2" @click="showModal = false">Cancel</button>
        <button type="button" class="btn btn-sm btn-primary" @click="handleSave">{{ isEditing ? 'Update' : 'Save' }}</button>
      </template>
    </BaseModal>
  </div>
</template>