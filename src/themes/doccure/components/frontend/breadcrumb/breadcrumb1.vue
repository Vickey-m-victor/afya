<template>
  <div class="breadcrumb-bar">
    <div class="container">
      <div class="row align-items-center inner-banner">
        <div class="col-md-12 col-12 text-center">
          <nav aria-label="breadcrumb" class="page-breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/"><i class="isax isax-home-15"></i></router-link>
              </li>
              <li class="breadcrumb-item" aria-current="page">{{ title }}</li>
              <li class="breadcrumb-item active">{{ text }}</li>
            </ol>
            <h2 class="breadcrumb-title">{{ text1 }}</h2>
          </nav>
        </div>
      </div>
    </div>
    <div class="breadcrumb-bg">
      <img
        src="@/themes/doccure/assets/img/bg/breadcrumb-bg-01.png"
        alt="img"
        class="breadcrumb-bg-01"
      />
      <img
        src="@/themes/doccure/assets/img/bg/breadcrumb-bg-02.png"
        alt="img"
        class="breadcrumb-bg-02"
      />
      <img src="@/themes/doccure/assets/img/bg/breadcrumb-icon.png" alt="img" class="breadcrumb-bg-03" />
      <img src="@/themes/doccure/assets/img/bg/breadcrumb-icon.png" alt="img" class="breadcrumb-bg-04" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    text1: {
      type: String,
      default: "",
    },
  },
};
</script>
