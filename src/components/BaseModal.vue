<script setup>

</script>

<template>
 <div
      class="modal"
      id="modal-block-vcenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modal-block-vcenter"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <BaseBlock title="Modal Title" transparent class="mb-0">
            <template #options>
              <button
                type="button"
                class="btn-block-option"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i class="fa fa-fw fa-times"></i>
              </button>
            </template>

            <template #content>
              <div class="block-content fs-sm">
                <p>
                  Dolor posuere proin blandit accumsan senectus netus nullam
                  curae, ornare laoreet adipiscing luctus mauris adipiscing
                  pretium eget fermentum, tristique lobortis est ut metus
                  lobortis tortor tincidunt himenaeos habitant quis dictumst
                  proin odio sagittis purus mi, nec taciti vestibulum quis in
                  sit varius lorem sit metus mi.
                </p>
              
              </div>
              <div class="block-content block-content-full text-end bg-body">
                <button
                  type="button"
                  class="btn btn-sm btn-alt-secondary me-1"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-sm btn-primary"
                  data-bs-dismiss="modal"
                >
                  Perfect
                </button>
              </div>
            </template>
          </BaseBlock>
        </div>
      </div>
    </div>
</template>