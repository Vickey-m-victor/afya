<script setup>
import { ref, reactive, onMounted } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseModal from "@/components/BaseModal.vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseButton from "@/components/BaseButton.vue";
import BasePageHeading from "@/components/BasePageHeading.vue";
import { useAuditTrailStore } from "~/admin/stores/auditTrailStore";
import { useAlert } from "@/composables/alerts";

const { toastSuccess, toastError, confirmAction } = useAlert();
const store = useAuditTrailStore();

// --- UI State ---
const showModal = ref(false);
const isEditing = ref(false);

// --- Table Configuration ---
const tableColumns = [
  // { name: "Audit ID", field: "audit_id" },
  { name: "System User", field: "user" },
  // { name: "IP Address", field: "ip_info.ip_address" },
  // { name: "Country", field: "ip_info.country" },
  // { name: "Country Code", field: "ip_info.country_code" },
  // { name: "Region Code", field: "ip_info.region_code" },
  // { name: "Region Name", field: "ip_info.region_name" },
  // { name: "City", field: "ip_info.city" },
  // { name: "ZIP Code", field: "ip_info.zip_code" },
  // { name: "Latitude", field: "ip_info.latitude" },
  // { name: "Longitude", field: "ip_info.longitude" },
  // { name: "Time Zone", field: "ip_info.time_zone" },
  // { name: "ISP", field: "ip_info.isp" },
  // { name: "Organization", field: "ip_info.organization" },
  // { name: "Autonomous System", field: "ip_info.autonomous_system" },
  // { name: "Field Name", field: "field_name" },
  { name: "Old Value", field: "old_value" },
  { name: "New Value", field: "new_value" },
  { name: "Audit Time", field: "audit_time" },
  // { name: "Operation", field: "operation" },
  // { name: "Request Method", field: "request_method" },
  { name: "Actions", field: "actions" },
];

// --- Form Configuration ---
const formData = ref({});

const formFields = reactive([
]);

// --- Handlers ---
const openCreateModal = () => {
  isEditing.value = false;
  formData.value = {}; // Clear form for new entry
  showModal.value = true;
};

// 💡 NEW: Edit Handler
const openEditModal = (row) => {
  isEditing.value = true;
  formData.value = { ...row }; // Copy row data into form
  showModal.value = true;
};

// 💡 NEW: Delete Handler
const handleDelete = async (row) => {
  // Assuming the ID field is 'id' or 'uuid'. Adjust if your backend uses something like 'role_id'
  const recordId = row.id || row.uuid || row[`audit_trail_id`]; 
  
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
const handleSearch = (query) => {
  // Pass the query to your store to fetch new data
  store.fetchAll(query);
};
const handleSave = async () => {
  try {
    if (isEditing.value) {
      // Assuming ID field. Adjust if your backend uses a custom ID name
      const recordId = formData.value.id || formData.value.uuid || formData.value[`audit_trail_id`];
      await store.update(recordId, formData.value);
      toastSuccess("Success", "AuditTrail updated successfully!");
    } else {
      await store.create(formData.value);
      toastSuccess("Success", "AuditTrail created successfully!");
    }
    showModal.value = false;
  } catch (error) {
    toastError("Error", error.response?.data?.message || "Failed to save data");
  }
};

onMounted(() => {
  store.fetchAll().catch(() => toastError("Error", "Failed to load data"));
});
</script>

<template>
  <div class="content">
    <BasePageHeading title="AuditTrail Management" />

    <BaseTable
      title="AuditTrails"
      :data="store.items"
      :columns="tableColumns"
      :loading="store.loading"
      @search="handleSearch"
    >
      <!-- <template #header-actions>
        <BaseButton label="Create AuditTrail" variant="primary" @click="openCreateModal" />
      </template> -->

      <template #cell(status)="{ row }">
        <span class="badge" :class="row.status === 'active' ? 'bg-success' : 'bg-warning'">
          {{ row.status || 'N/A' }}
        </span>
      </template>

      <template #cell(actions)="{ row }">
        <button class="btn btn-sm btn-alt-primary me-1" @click="openEditModal(row)">
          <i class="fa fa-pencil-alt"></i>
        </button>
        <button class="btn btn-sm btn-alt-danger" @click="handleDelete(row)">
          <i class="fa fa-trash"></i>
        </button>
      </template>
    </BaseTable>

    <BaseModal 
      :showModal="showModal" 
      :title="isEditing ? 'Edit AuditTrail' : 'Create AuditTrail'" 
      @close="showModal = false"
    >
      <BaseForm 
        v-model="formData" 
        :fields="formFields" 
        submitLabel="Save" 
        @submit="handleSave" 
      />
    </BaseModal>
  </div>
</template>