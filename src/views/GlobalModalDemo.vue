<script setup>
import { useModalStore } from '@/stores/modal';

// Example form component to show in modal
const ExampleForm = {
  template: `
    <div class="mb-3">
      <label class="form-label">Name</label>
      <input type="text" class="form-control" placeholder="Enter name" />
    </div>
    <div class="mb-3">
      <label class="form-label">Email</label>
      <input type="email" class="form-control" placeholder="Enter email" />
    </div>
  `
};

const modalStore = useModalStore();

// Example 1: Simple modal
function openSimpleModal() {
  modalStore.openModal({
    title: 'Simple Modal Example',
    size: 'md',
  });
}

// Example 2: Modal with dynamic component
function openFormModal() {
  modalStore.openModal({
    component: ExampleForm,
    title: 'User Form',
    size: 'lg',
    showFooter: true,
    centered: true,
    scrollable: false,
    confirmText: 'Save',
    onConfirm: async () => {
      await new Promise((resolve) => setTimeout(resolve, 600));
    },
  });
}

// Example 3: Import and use a real component
// To use this, you'd import a component:
// import UserForm from '@/modules/iam/components/UserForm.vue'
// Then:
function openUserFormModal() {
  // Uncomment when you have the component
  // modalStore.openModal({
  //   component: UserForm,
  //   props: {
  //     formData: { username: '', email: '' },
  //     readonly: false,
  //     compact: true
  //   },
  //   title: 'Create User',
  //   size: 'lg',
  //   showFooter: true
  // });
}

// Example 4: View mode (readonly)
function openViewModal() {
  // modalStore.openModal({
  //   component: UserForm,
  //   props: {
  //     formData: { username: 'john', email: 'john@example.com' },
  //     readonly: true,
  //     hideSubmit: true,
  //     compact: true
  //   },
  //   title: 'View User',
  //   size: 'md',
  //   showFooter: false
  // });
}
</script>

<template>
  <div class="content">
    <div class="block block-rounded">
      <div class="block-header block-header-default">
        <h3 class="block-title">Global Modal Examples</h3>
      </div>
      <div class="block-content">
        <div class="row g-3">
          <div class="col-12">
            <h4>Basic Usage</h4>
            <p class="text-muted">
              The global modal system allows you to dynamically load any component 
              into a modal without duplicating modal markup.
            </p>
          </div>

          <div class="col-md-4">
            <button 
              type="button" 
              class="btn btn-primary w-100"
              @click="openSimpleModal"
            >
              <i class="fa fa-window-maximize me-2"></i>
              Simple Modal
            </button>
          </div>

          <div class="col-md-4">
            <button 
              type="button" 
              class="btn btn-success w-100"
              @click="openFormModal"
            >
              <i class="fa fa-edit me-2"></i>
              Form Modal
            </button>
          </div>

          <div class="col-md-4">
            <button 
              type="button" 
              class="btn btn-info w-100"
              disabled
              title="Uncomment code to enable"
            >
              <i class="fa fa-user me-2"></i>
              User Form (Demo)
            </button>
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-12">
            <h4 class="mt-3">Usage Example</h4>
            <pre class="bg-body-light p-3 rounded"><code>import { useModalStore } from '@/stores/modal'
import UserForm from './UserForm.vue'

const modalStore = useModalStore()

// Open modal with component
function editUser(user) {
  modalStore.openModal({
    component: UserForm,
    props: {
      formData: user,
      readonly: false
    },
    title: 'Edit User',
    size: 'lg',
    showFooter: true,
    centered: true,
    closeOnBackdrop: true,
    confirmText: 'Save',
    onConfirm: async () => {
      await saveUser(user)
    }
  })
}

// Close modal
modalStore.closeModal()</code></pre>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-12">
            <div class="alert alert-info d-flex">
              <div class="flex-shrink-0">
                <i class="fa fa-fw fa-info-circle"></i>
              </div>
              <div class="flex-grow-1 ms-3">
                <p class="mb-0">
                  <strong>Benefits:</strong>
                </p>
                <ul class="mb-0">
                  <li>Single modal container for entire app</li>
                  <li>No duplicate modal markup</li>
                  <li>Consistent styling and behavior</li>
                  <li>Easy to use with any component</li>
                  <li>Supports view/edit modes</li>
                  <li>Toggle between modal and page navigation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
