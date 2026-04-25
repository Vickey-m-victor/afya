<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useRegistrationService } from "../../services/registrationService";
import { unwrapData } from "../../services/models";
import { useOutpatientContextStore } from "../../stores/outpatientContext";

const route = useRoute();
const router = useRouter();
const ctx = useOutpatientContextStore();
const api = useRegistrationService();

const isLoading = ref(false);
const patient = ref(null);

async function load() {
  isLoading.value = true;
  try {
    const res = await api.getPatient(route.params.patientId);
    if (res.error?.value) throw res.error.value;
    const payload = unwrapData(res.data?.value);
    patient.value = payload?.patient ?? payload?.data?.patient ?? payload?.data ?? payload;
  } finally {
    isLoading.value = false;
  }
}

async function startEncounter() {
  if (!patient.value) return;
  isLoading.value = true;
  try {
    const res = await api.registerAndStartEncounter({
      facility_id: ctx.facilityId,
      first_name: patient.value.first_name,
      last_name: patient.value.last_name,
      date_of_birth: patient.value.date_of_birth,
      gender: patient.value.gender,
      encounter_type_id: 1,
    });
    if (res.error?.value) throw res.error.value;
    router.push({ name: "outpatient/triage/queue", query: { facility_id: ctx.facilityId } });
  } finally {
    isLoading.value = false;
  }
}

onMounted(load);
</script>

<template>
  <div class="content">
    <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
      <div>
        <h2 class="h3 mb-1">Patient Profile</h2>
        <div class="text-muted fs-sm">Outpatient / Registration</div>
      </div>
      <div class="d-flex gap-2">
        <RouterLink class="btn btn-alt-secondary" to="/outpatient/registration">Back</RouterLink>
        <button class="btn btn-success" type="button" @click="startEncounter" :disabled="isLoading || !patient">
          <i class="fa fa-play me-1"></i>
          Start Encounter
        </button>
      </div>
    </div>

    <BaseBlock title="Details">
      <template #content>
        <div class="block-content">
          <div v-if="isLoading" class="text-muted">
            <i class="fa fa-spinner fa-spin me-1"></i> Loading...
          </div>
          <div v-else-if="patient" class="row g-3 fs-sm">
            <div class="col-md-6">
              <div class="text-muted">Name</div>
              <div class="fw-semibold">{{ patient.first_name }} {{ patient.last_name }}</div>
            </div>
            <div class="col-md-6">
              <div class="text-muted">DOB</div>
              <div class="fw-semibold">{{ patient.date_of_birth || "-" }}</div>
            </div>
            <div class="col-md-6">
              <div class="text-muted">Gender</div>
              <div class="fw-semibold">{{ patient.gender ?? "-" }}</div>
            </div>
            <div class="col-md-6">
              <div class="text-muted">Patient ID</div>
              <div class="fw-semibold">{{ patient.patient_id }}</div>
            </div>
          </div>
          <div v-else class="text-muted">Patient not found.</div>
        </div>
      </template>
    </BaseBlock>
  </div>
</template>

