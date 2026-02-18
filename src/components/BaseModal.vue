<script setup>
import BaseButton from "./BaseButton.vue";

const props = defineProps({
  title: {
    type: String,
    default: "Modal",
  },
  size: {
    type: String,
    default: "modal-lg", //modal-xl, modal-sm
  },
  showModal: {
    type: Boolean,
    default: false,
  },
  position: {
    type: String,
    default: "modal-centered",
  },
});
const emit = defineEmits([ "close"]);

const close = () => emit("close");
</script>

<template>
  <div
    v-if="showModal"
    class="modal"
    id="modal-block-vcenter"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modal-block-vcenter"
    aria-hidden="true"
    @click.self="close"
  >
    <div class="modal-dialog" :class="[size, position]" role="document">
      <div class="modal-content">
        <BaseBlock :title="title" transparent class="mb-0">
          <template #options>
            <button
              type="button"
              class="btn-block-option"
              aria-label="Close"
              @click="close"
            >
              <i class="fa fa-fw fa-times"></i>
            </button>
          </template>

          <template #content>
            <div class="block-content fs-sm">
              <slot></slot>
            </div>
          </template>
        </BaseBlock>
        <div class="block-content block-content-full text-end bg-body">
          <slot name="footer">
            <BaseButton label="Close" @click="close"> </BaseButton>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
