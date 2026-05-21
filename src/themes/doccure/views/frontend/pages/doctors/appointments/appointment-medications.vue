<template>
    <div class="col-md-12">
        <div class="d-flex flex-wrap medication-wrap align-items-center">
            <div class="input-block input-block-new">
                <label class="form-label">Name</label>
                <input type="text" class="form-control">
            </div>
            <div class="input-block input-block-new">
                <label class="form-label">Type</label>
                <vue-select :options="Direct" id="directcall" placeholder="Select" />
            </div>
            <div class="input-block input-block-new">
                <label class="form-label">Dosage</label>
                <input type="text" class="form-control">
            </div>
            <div class="input-block input-block-new">
                <label class="form-label">Duration</label>
                <input type="text" class="form-control" placeholder="1-0-0">
            </div>
            <div class="input-block input-block-new">
                <label class="form-label">Duration</label>
                <vue-select :options="Duration" id="duration" placeholder="Select" />
            </div>
            <div class="input-block input-block-new">
                <label class="form-label">Instruction</label>
                <input type="text" class="form-control">
            </div>
            <div class="delete-row">
                <a href="#" class="delete-btn delete-medication trash text-danger"><i
                        class="fa-solid fa-trash-can"></i></a>
            </div>
        </div>
        <div class="d-flex flex-wrap medication-wrap align-items-center"
            v-for="(Medications, index) in Medications" :key="index">
            <div class="input-block input-block-new">
                <label class="form-label">Name</label>
                <input type="text" class="form-control">
            </div>
            <div class="input-block input-block-new">
                <label class="form-label">Type</label>
                <vue-select :options="Direct" placeholder="Select" />
            </div>
            <div class="input-block input-block-new">
                <label class="form-label">Dosage</label>
                <input type="text" class="form-control">
            </div>
            <div class="input-block input-block-new">
                <label class="form-label">Duration</label>
                <input type="text" class="form-control" placeholder="1-0-0">
            </div>
            <div class="input-block input-block-new">
                <label class="form-label">Duration</label>
                <vue-select :options="Duration" placeholder="Select" />
            </div>
            <div class="input-block input-block-new">
                <label class="form-label">Instruction</label>
                <input type="text" class="form-control">
            </div>
            <div class="delete-row">
                <a href="#"  @click="deleteMedications(index)" class="delete-btn delete-medication trash text-danger"><i
                        class="fa-solid fa-trash-can"></i></a>
            </div>
        </div>
        <div class="add-new-med text-end mb-4">
            <a href="#" class="add-medical more-item mb-0" @click="addMedications">Add New</a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            Duration: ["Select", "Not Available"],
            Direct: ["Select", "Direct Visit", "Video Call"],
            Medications: [],
        }
    },
    methods: {
        addMedications() {
            this.Medications.push({});
        },
        deleteMedications(index) {
            this.Medications.splice(index, 1);
        },
    },
}
</script>