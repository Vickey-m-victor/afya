<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  availableItems: {
    type: Array,
    default: () => [],
  },
  assignedItems: {
    type: Array,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  isSubmitting: {
    type: Boolean,
    default: false,
  },
  availableLabel: {
    type: String,
    default: "Available",
  },
  assignedLabel: {
    type: String,
    default: "Assigned",
  },
  onAssign: Function,
  onRemove: Function,
});

const selectedAvailable = ref([]);
const selectedAssigned = ref([]);
const availableSearch = ref("");
const assignedSearch = ref("");

const filteredAvailable = computed(() => {
  const term = availableSearch.value.toLowerCase();
  if (!term) return props.availableItems;
  return props.availableItems.filter(
    (item) =>
      item.label.toLowerCase().includes(term) ||
      item.id.toLowerCase().includes(term)
  );
});

const filteredAssigned = computed(() => {
  const term = assignedSearch.value.toLowerCase();
  if (!term) return props.assignedItems;
  return props.assignedItems.filter(
    (item) =>
      item.label.toLowerCase().includes(term) ||
      item.id.toLowerCase().includes(term)
  );
});

function isSelected(id, bucket) {
  return bucket === "available"
    ? selectedAvailable.value.includes(id)
    : selectedAssigned.value.includes(id);
}

function toggleSelection(id, bucket) {
  const target = bucket === "available" ? selectedAvailable : selectedAssigned;
  const index = target.value.indexOf(id);
  if (index === -1) {
    target.value.push(id);
  } else {
    target.value.splice(index, 1);
  }
}

function selectAll(bucket) {
  if (bucket === "available") {
    selectedAvailable.value = filteredAvailable.value.map((item) => item.id);
  } else {
    selectedAssigned.value = filteredAssigned.value.map((item) => item.id);
  }
}

function deselectAll(bucket) {
  if (bucket === "available") {
    selectedAvailable.value = [];
  } else {
    selectedAssigned.value = [];
  }
}

async function handleAssign() {
  const ids = [...selectedAvailable.value];
  if (!ids.length || !props.onAssign) return;
  selectedAvailable.value = [];
  await props.onAssign(ids);
}

async function handleRemove() {
  const ids = [...selectedAssigned.value];
  if (!ids.length || !props.onRemove) return;
  selectedAssigned.value = [];
  await props.onRemove(ids);
}
</script>

<template>
  <div>
    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2 text-muted small">Loading...</p>
    </div>

    <div v-else class="row g-0">
      <!-- Available column -->
      <div class="col-md-5">
        <div class="p-3" style="min-height: 460px;">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h6 class="mb-0 fw-semibold">{{ availableLabel }}</h6>
            <div class="btn-group btn-group-sm">
              <button
                class="btn btn-sm btn-outline-primary"
                type="button"
                @click="selectAll('available')"
                :disabled="!filteredAvailable.length"
              >
               Select All
              </button>
              <button
                class="btn btn-sm btn-outline-secondary"
                type="button"
                @click="deselectAll('available')"
                :disabled="!selectedAvailable.length"
              >
                Clear
              </button>
            </div>
          </div>

          <input
            v-model="availableSearch"
            type="text"
            class="form-control form-control-sm mb-2"
            placeholder="Search..."
          />

          <div class="list-group assignment-list">
            <div
              v-for="item in filteredAvailable"
              :key="`avail-${item.id}`"
              class="list-group-item list-group-item-action d-flex align-items-center"
              :class="{ active: isSelected(item.id, 'available') }"
              @click="toggleSelection(item.id, 'available')"
              style="cursor: pointer;"
            >
              <input
                type="checkbox"
                class="form-check-input me-2"
                :checked="isSelected(item.id, 'available')"
                @click.stop="toggleSelection(item.id, 'available')"
              />
              <div class="flex-grow-1 overflow-hidden">
                <div
                  class="fw-semibold text-truncate"
                  :class="{ 'text-white': isSelected(item.id, 'available') }"
                >
                  {{ item.label }}
                </div>
                <small
                  v-if="item.type"
                  class="text-truncate d-block"
                  :class="isSelected(item.id, 'available') ? 'text-white-50' : 'text-muted'"
                >
                  {{ item.type }}
                </small>
              </div>
            </div>
            <div v-if="!filteredAvailable.length" class="text-center text-muted py-4 small">
              No {{ availableLabel.toLowerCase() }}
            </div>
          </div>

          <div class="mt-2 text-muted small">{{ selectedAvailable.length }} selected</div>
        </div>
      </div>

      <!-- Action buttons column -->
      <div class="col-md-2 d-flex flex-column justify-content-center align-items-center p-3 assignment-actions bg-body-light">
        <button
          type="button"
          class="btn btn-primary mb-2 w-100"
          :disabled="isSubmitting || !selectedAvailable.length"
          @click="handleAssign"
        >
          <i
            class="fa fa-fw"
            :class="isSubmitting ? 'fa-circle-notch fa-spin' : 'fa-arrow-right'"
          ></i>
          <span class="d-block small">Assign</span>
        </button>
        <button
          type="button"
          class="btn btn-danger w-100"
          :disabled="isSubmitting || !selectedAssigned.length"
          @click="handleRemove"
        >
          <i class="fa fa-fw fa-arrow-left"></i>
          <span class="d-block small">Remove</span>
        </button>
      </div>

      <!-- Assigned column -->
      <div class="col-md-5">
        <div class="p-3" style="min-height: 460px;">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h6 class="mb-0 fw-semibold">{{ assignedLabel }}</h6>
            <div class="btn-group btn-group-sm">
              <button
                class="btn btn-sm btn-outline-primary"
                type="button"
                @click="selectAll('assigned')"
                :disabled="!filteredAssigned.length"
              >
               Select All
              </button>
              <button
                class="btn btn-sm btn-outline-secondary"
                type="button"
                @click="deselectAll('assigned')"
                :disabled="!selectedAssigned.length"
              >
                Clear
              </button>
            </div>
          </div>

          <input
            v-model="assignedSearch"
            type="text"
            class="form-control form-control-sm mb-2"
            placeholder="Search..."
          />

          <div class="list-group assignment-list">
            <div
              v-for="item in filteredAssigned"
              :key="`assigned-${item.id}`"
              class="list-group-item list-group-item-action d-flex align-items-center"
              :class="{ active: isSelected(item.id, 'assigned') }"
              @click="toggleSelection(item.id, 'assigned')"
              style="cursor: pointer;"
            >
              <input
                type="checkbox"
                class="form-check-input me-2"
                :checked="isSelected(item.id, 'assigned')"
                @click.stop="toggleSelection(item.id, 'assigned')"
              />
              <div class="flex-grow-1 overflow-hidden">
                <div
                  class="fw-semibold text-truncate"
                  :class="{ 'text-white': isSelected(item.id, 'assigned') }"
                >
                  {{ item.label }}
                </div>
                <small
                  v-if="item.type"
                  class="text-truncate d-block"
                  :class="isSelected(item.id, 'assigned') ? 'text-white-50' : 'text-muted'"
                >
                  {{ item.type }}
                </small>
              </div>
            </div>
            <div v-if="!filteredAssigned.length" class="text-center text-muted py-4 small">
              No {{ assignedLabel.toLowerCase() }}
            </div>
          </div>

          <div class="mt-2 text-muted small">{{ selectedAssigned.length }} selected</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.assignment-list {
  border: 1px solid var(--bs-border-color);
  border-radius: 0.25rem;
  max-height: 360px;
  overflow-y: auto;
}

.list-group-item.active {
  z-index: 0;
}

:global(html.dark) .assignment-actions {
  background-color: #171e28 !important;
  border-left: 1px solid #2e3c51;
  border-right: 1px solid #2e3c51;
}

:global(html.dark) .assignment-list .list-group-item {
  background-color: #1f2937;
  border-color: #2e3c51;
  color: #bec8d5;
}

:global(html.dark) .assignment-list .list-group-item:not(.active):hover {
  background-color: #253041;
}
</style>
