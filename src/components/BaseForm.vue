<script setup>

</script>

<template>
        <form @sumbit.prevent>
            <div class="mb-4">
              <label class="form-label" for="example-ltf-email2">Email</label>
              <input
                type="email"
                class="form-control form-control-alt"
                id="example-ltf-email2"
                name="example-ltf-email2"
                placeholder="Your Email.."
              />
            </div>
            <div class="mb-4">
              <label class="form-label" for="example-ltf-password2"
                >Password</label
              >
              <input
                type="password"
                class="form-control form-control-alt"
                id="example-ltf-password2"
                name="example-ltf-password2"
                placeholder="Your Password.."
              />
            </div>
            <div class="mb-4">
              <button type="submit" class="btn btn-dark">Login</button>
            </div>
          </form>
</template>

<!-- i want to make the baseform, it will be used in a few files, sometimes in the modals etc. the labels will be different. also not all will have the save button, and the ones that will have it, have difeerent texts, which can be passed using the basebutton component. this is like the structure i want it to look like. 
<script setup>

</script>

<template>
        <form @sumbit.prevent>
            <div class="mb-4">
              <label class="form-label" for="example-ltf-email2">Email</label>
              <input
                type="email"
                class="form-control form-control-alt"
                id="example-ltf-email2"
                name="example-ltf-email2"
                placeholder="Your Email.."
              />
            </div>
            <div class="mb-4">
              <label class="form-label" for="example-ltf-password2"
                >Password</label
              >
              <input
                type="password"
                class="form-control form-control-alt"
                id="example-ltf-password2"
                name="example-ltf-password2"
                placeholder="Your Password.."
              />
            </div>
            <div class="mb-4">
              <button type="submit" class="btn btn-dark">Login</button>
            </div>
          </form>
</template> -->