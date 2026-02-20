<script setup>
import { ref, reactive, onMounted } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseModal from "@/components/BaseModal.vue";
import BaseForm from "@/components/BaseForm.vue";

const showLogin = ref(false);

// For testing, simple reactive fields
const loginFields = reactive([
  { label: "Email", type: "email", name: "email", placeholder: "Your Email", value: "" },
  { label: "Password", type: "password", name: "password", placeholder: "Your Password", value: "" },
]);

const handleLogin = (data) => {
  console.log("Form submitted:", data);
  showLogin.value = false;
};

// Fake table data
const users = ref([{ name: "Alice", email: "alice@test.com", status: "Active" }]);
const tableColumns = [
  { name: "Name", field: "name" },
  { name: "Email", field: "email" },
  { name: "Status", field: "status" },
  { name: "Actions", field: "actions" },
];
</script>

<template>
  <div class="content">
    <BaseTable
      title="Users"
      :data="users"
      :columns="tableColumns"
      @click="showLogin = true"
    >
      <!-- Status badge -->
      <template #cell(status)="{ row }">
        <span :class="row.status === 'Active' ? 'badge bg-success' : 'badge bg-warning'">
          {{ row.status }}
        </span>
      </template>

      <!-- Actions buttons -->
      <template #cell(actions)="{ row }">
        <button class="btn btn-sm btn-alt-primary me-1" @click="showLogin = true">
          <i class="fa fa-pencil-alt"></i>
        </button>
      </template>

      <!-- Table slot for "Create User" -->
      <template #header-actions>
        <button class="btn btn-primary" @click="showLogin = true">
          Create User
        </button>
      </template>
    </BaseTable>

    <!-- Modal -->
    <BaseModal :showModal="showLogin" title="Login" @close="showLogin = false">
      <BaseForm :fields="loginFields" submitLabel="Login" @submit="handleLogin" />
    </BaseModal>
  </div>
</template>