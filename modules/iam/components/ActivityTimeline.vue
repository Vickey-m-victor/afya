<script setup>
import { computed } from "vue";

const props = defineProps({
  username: {
    type: String,
    default: "User",
  },
  // When real data arrives, pass it in here.
  // Until then, demo data is used as fallback.
  activities: {
    type: Array,
    default: null,
  },
  totalActivities: {
    type: Number,
    default: null,
  },
  lastActivity: {
    type: String,
    default: null,
  },
});

// ── Demo data ─────────────────────────────────────────────────
const demoActivities = [
  {
    id: 1,
    timestamp: "2026-03-11T14:53:30",
    type: "page_visit",
    description: "Visited page: http://arova.untistltd.com/admin",
  },
  {
    id: 2,
    timestamp: "2026-03-11T14:53:24",
    type: "page_visit",
    description: "Visited page: http://arova.untistltd.com/reservation/reservation/create",
  },
  {
    id: 3,
    timestamp: "2026-03-11T14:52:10",
    type: "page_visit",
    description: "Visited page: http://arova.untistltd.com/reservation/room-list",
  },
  {
    id: 4,
    timestamp: "2026-03-11T14:52:09",
    type: "page_visit",
    description: "Visited page: http://arova.untistltd.com/reservation/reservation/create",
  },
  {
    id: 5,
    timestamp: "2026-03-11T14:52:00",
    type: "page_visit",
    description: "Visited page: http://arova.untistltd.com/reservation/reservation/index",
  },
  {
    id: 6,
    timestamp: "2026-03-11T14:51:42",
    type: "login",
    description: "User logged in successfully",
  },
  {
    id: 7,
    timestamp: "2026-03-11T10:34:18",
    type: "data_change",
    description: "Updated profile information",
  },
  {
    id: 8,
    timestamp: "2026-03-10T16:22:05",
    type: "login",
    description: "User logged in successfully",
  },
  {
    id: 9,
    timestamp: "2026-03-10T16:20:14",
    type: "logout",
    description: "User session ended (logout)",
  },
  {
    id: 10,
    timestamp: "2026-03-09T09:15:00",
    type: "password_change",
    description: "User changed their password",
  },
];

const displayActivities = computed(() => props.activities ?? demoActivities);
const displayTotal       = computed(() => props.totalActivities ?? 73);
const displayLastActivity = computed(() => props.lastActivity ?? "2026-03-11T14:53:30");

// ── Helpers ───────────────────────────────────────────────────
function fmtDateTime(str) {
  if (!str) return "—";
  try {
    return new Date(str).toLocaleString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
    });
  } catch { return str; }
}

function fmtDateTimeShort(str) {
  if (!str) return "—";
  try {
    const d = new Date(str);
    return d.toLocaleString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
    });
  } catch { return str; }
}

const activityIcon = (type) => {
  const map = {
    page_visit:      { icon: "fa-arrow-rotate-left", color: "var(--bs-info, #0dcaf0)" },
    login:           { icon: "fa-sign-in-alt",         color: "var(--bs-success, #198754)" },
    logout:          { icon: "fa-sign-out-alt",        color: "var(--bs-secondary, #6c757d)" },
    password_change: { icon: "fa-key",                 color: "var(--bs-warning, #ffc107)" },
    data_change:     { icon: "fa-pen",                 color: "var(--bs-primary, #0d6efd)" },
  };
  return map[type] || { icon: "fa-circle", color: "var(--bs-secondary, #6c757d)" };
};
</script>

<template>
  <div class="at-root">
    <!-- ── Summary strip ── -->
    <div class="at-summary bg-body-light border-bottom px-4 py-3">
      <div class="at-section-label mb-3">
        <i class="fa fa-circle-dot me-2 text-muted" style="font-size: 0.7rem;"></i>
        ACTIVITY TIMELINE
      </div>
      <div class="d-flex gap-4">
        <div>
          <p class="at-stat-label">Total Activities</p>
          <p class="at-stat-value">{{ displayTotal }}</p>
        </div>
        <div>
          <p class="at-stat-label">Last Activity</p>
          <p class="at-stat-value">{{ fmtDateTimeShort(displayLastActivity) }}</p>
        </div>
      </div>
    </div>

    <!-- ── Timeline items ── -->
    <div class="at-list px-4 pt-3">
      <div
        v-for="(item, index) in displayActivities"
        :key="item.id || index"
        class="at-item"
      >
        <!-- icon -->
        <div
          class="at-icon-wrap"
          :style="{ background: activityIcon(item.type).color + '22', color: activityIcon(item.type).color }"
        >
          <i class="fa" :class="activityIcon(item.type).icon"></i>
        </div>

        <!-- content -->
        <div class="at-item-content">
          <p class="at-ts">{{ fmtDateTime(item.timestamp) }}</p>
          <p class="at-desc">{{ item.description }}</p>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="!displayActivities.length" class="text-center py-5 text-muted">
        <i class="fa fa-history fa-2x mb-2 d-block opacity-50"></i>
        No activity recorded yet.
      </div>
    </div>
  </div>
</template>

<style scoped>
.at-root {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Summary strip */
.at-section-label {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--bs-secondary-color, #6c757d);
  display: flex;
  align-items: center;
}

.at-stat-label {
  font-size: 0.72rem;
  color: var(--bs-secondary-color, #6c757d);
  margin-bottom: 0.15rem;
}

.at-stat-value {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--bs-body-color, #212529);
  margin: 0;
  line-height: 1.2;
}

/* Timeline list */
.at-list {
  overflow-y: auto;
  flex: 1;
  padding-bottom: 1.5rem;
}

.at-item {
  display: flex;
  gap: 0.85rem;
  margin-bottom: 1.1rem;
  align-items: flex-start;
  position: relative;
}

/* Vertical connector line */
.at-item:not(:last-child)::before {
  content: "";
  position: absolute;
  left: 17px;
  top: 36px;
  width: 2px;
  height: calc(100% - 4px);
  background: var(--bs-border-color, #e4e7ed);
}

.at-icon-wrap {
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.82rem;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.at-item-content {
  padding-top: 0.15rem;
}

.at-ts {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--bs-secondary-color, #6c757d);
  margin-bottom: 0.2rem;
}

.at-desc {
  font-size: 0.82rem;
  color: var(--bs-body-color, #212529);
  margin: 0;
  line-height: 1.45;
  word-break: break-word;
}

/* Dark mode */
:global(html.dark) .at-stat-value {
  color: #bec8d5;
}
:global(html.dark) .at-desc {
  color: #bec8d5;
}
:global(html.dark) .at-item::before {
  background: #2e3c51;
}
</style>
