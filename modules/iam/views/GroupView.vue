<script setup>
import { ref, reactive, onMounted } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseModal from "@/components/BaseModal.vue";
import BaseGridForm from "@/components/BaseGridForm.vue";
import BasePageHeading from "@/components/BasePageHeading.vue";
import { useGroupStore } from "~/iam/stores/groupStore";
import { useAlert } from "@/composables/alerts";

const { toastSuccess, toastError, confirmAction } = useAlert();
const store = useGroupStore();

const showModal = ref(false);
const isEditing = ref(false);
let currentQuery = "";

const tableColumns = [
  { name: "Group Name", field: "group_name" },
  { name: "Rule Name", field: "ruleName" },
  { name: "Description", field: "description" },
  { name: "Actions", field: "actions" },
];

const formData = ref({});
const formFields = reactive([
  { label: "Group Name", type: "text", name: "group_name", placeholder: "Enter Group Name", col: "col-6" },
  { label: "Rule Name", type: "text", name: "ruleName", placeholder: "Enter Rule Name", col: "col-6" },
  { label: "Description", type: "textarea", name: "description", placeholder: "Enter Description", col: "col-12" },
]);

const handleSearch = (query) => { currentQuery = query; store.fetchAll(query, 1, store.pagination?.perPage || 25); };
const handlePageChange = (newPage) => { store.fetchAll(currentQuery, newPage, store.pagination?.perPage || 25); };
const handleSizeChange = (newSize) => { store.fetchAll(currentQuery, 1, newSize); };

const openCreateModal = () => { isEditing.value = false; formData.value = {}; showModal.value = true; };
const openEditModal = (row) => { isEditing.value = true; formData.value = { ...row }; showModal.value = true; };

const handleSave = async () => {
  try {
    const recordId = formData.value.id || formData.value.uuid || formData.value[`group_id`];
    if (isEditing.value) { await store.update(recordId, formData.value); toastSuccess("Success", "Group updated!"); }
    else { await store.create(formData.value); toastSuccess("Success", "Group created!"); }
    showModal.value = false;
  } catch (error) { toastError("Error", error.response?.data?.message || "Failed to save data"); }
};

const handleDelete = async (row) => {
  const recordId = row.id || row.uuid || row[`group_id`]; 
  const confirmed = await confirmAction("Are you sure?", "You won't be able to revert this!");
  if (confirmed.isConfirmed) {
    try { await store.delete(recordId); toastSuccess("Deleted!", "Record has been deleted."); } catch { toastError("Error", "Failed to delete record."); }
  }
};

onMounted(() => { store.fetchAll().catch(() => toastError("Error", "Failed to load data")); });
</script>

<template>
  <div class="content">
    <BasePageHeading title="Group Management" />
    <BaseTable
      title="Groups"
      :data="store.items"
      :columns="tableColumns"
      :loading="store.loading"
      :pagination="store.pagination"
      @search="handleSearch"
      @page-change="handlePageChange"
      @size-change="handleSizeChange"
    >
      <template #header-actions>
        <button class="btn btn-sm btn-primary" @click="openCreateModal"><i class="fa fa-plus me-1"></i> Create Group</button>
      </template>

      <template #cell(status)="{ row }">
        <span v-if="row.status" class="badge" :class="`bg-${row.status.theme || 'primary'}`">{{ row.status.label || 'N/A' }}</span>
        <span v-else class="text-muted">N/A</span>
      </template>

      <template #cell(actions)="{ row }">
        <button class="btn btn-sm btn-alt-primary me-1" @click="openEditModal(row)" title="Edit"><i class="fa fa-pencil-alt"></i></button>
        <button class="btn btn-sm btn-alt-danger" @click="handleDelete(row)" title="Delete"><i class="fa fa-trash"></i></button>
      </template>
    </BaseTable>

    <BaseModal :showModal="showModal" size="modal-lg" :title="isEditing ? 'Edit Group' : 'Create Group'" @close="showModal = false">
      <BaseGridForm v-model="formData" :fields="formFields" :showSubmit="false" />
      <template #footer>
        <button type="button" class="btn btn-sm btn-alt-secondary me-2" @click="showModal = false">Cancel</button>
        <button type="button" class="btn btn-sm btn-primary" @click="handleSave">{{ isEditing ? 'Update' : 'Save' }}</button>
      </template>
    </BaseModal>
  </div>
</template>