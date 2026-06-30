<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    default: () => []
  }
});
</script>

<template>
  <div class="custom-breadcrumb-bar border-bottom">
    <div class="content content-full py-4 text-center">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb justify-content-center mb-2">
          <li
            v-for="(item, index) in items"
            :key="index"
            class="breadcrumb-item"
            :class="{ active: item.active, 'text-dark fw-medium': item.active }"
            :aria-current="item.active ? 'page' : undefined"
          >
            <!-- Active item / current page (no link) -->
            <span v-if="item.active">
              <i v-if="item.icon" :class="item.icon" class="me-1"></i>
              {{ item.name }}
            </span>
            
            <!-- Link item -->
            <template v-else>
              <RouterLink
                v-if="item.to"
                :to="item.to"
                class="text-primary"
              >
                <i v-if="item.icon" :class="[item.icon, { 'me-1': item.name }]"></i>
                {{ item.name }}
              </RouterLink>
              <a
                v-else
                href="javascript:void(0)"
                class="text-primary"
              >
                <i v-if="item.icon" :class="[item.icon, { 'me-1': item.name }]"></i>
                {{ item.name }}
              </a>
            </template>
          </li>
        </ol>
      </nav>
      <h1 class="h2 fw-bold mb-0 text-dark" style="color: #0c1a52 !important;">{{ title }}</h1>
    </div>
    <div class="breadcrumb-bg">
      <img src="/assets/media/photos/breadcrumb-bg-01.png" alt="img" class="breadcrumb-bg-01" />
      <img src="/assets/media/photos/breadcrumb-bg-02.png" alt="img" class="breadcrumb-bg-02" />
      <img src="/assets/media/photos/breadcrumb-icon.png" alt="img" class="breadcrumb-bg-03" />
      <img src="/assets/media/photos/breadcrumb-icon.png" alt="img" class="breadcrumb-bg-04" />
    </div>
  </div>
</template>

<style scoped>
.custom-breadcrumb-bar {
  background: #f4f8fb;
  position: relative;
  overflow: hidden;
  z-index: 1;
}
.custom-breadcrumb-bar .content {
  position: relative;
  z-index: 2;
}
.breadcrumb-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}
.breadcrumb-bg .breadcrumb-bg-01 {
  position: absolute;
  top: 0;
  left: 0;
  max-width: 15%;
}
.breadcrumb-bg .breadcrumb-bg-02 {
  position: absolute;
  bottom: 0;
  right: 0;
  max-width: 25%;
}
.breadcrumb-bg .breadcrumb-bg-03 {
  position: absolute;
  top: 20%;
  left: 20%;
  width: 15px;
}
.breadcrumb-bg .breadcrumb-bg-04 {
  position: absolute;
  bottom: 20%;
  right: 25%;
  width: 12px;
}
</style>
