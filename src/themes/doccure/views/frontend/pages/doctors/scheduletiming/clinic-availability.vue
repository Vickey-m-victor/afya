<template>
  <div class="clinic-wrap">
    <h5>Select Clinic</h5>
    <div class="row">
      <div class="col-md-6">
        <vue-select
          v-model="selectedClinic"
          :options="selectOptions"
          :templateResult="templateResult"
          placeholder="The Family Dentistry Clinic"
        />
      </div>
    </div>
  </div>
  <div class="card custom-card">
    <div class="card-body">
      <div class="card-header">
        <h3>Select Available Slots</h3>
      </div>

      <div class="available-tab">
        <label class="form-label">Select Available days</label>
        <ul class="nav">
          <li>
            <a href="#" class="active" data-bs-toggle="tab" data-bs-target="#monday-slot"
              >Monday</a
            >
          </li>
          <li>
            <a href="#" data-bs-toggle="tab" data-bs-target="#tuesday-slot">Tuesday</a>
          </li>
          <li>
            <a href="#" data-bs-toggle="tab" data-bs-target="#wedneday-slot">Wedneday</a>
          </li>
          <li>
            <a href="#" data-bs-toggle="tab" data-bs-target="#thursday-slot">Thursday</a>
          </li>
          <li>
            <a href="#" data-bs-toggle="tab" data-bs-target="#friday-slot">Friday</a>
          </li>
          <li>
            <a href="#" data-bs-toggle="tab" data-bs-target="#saturday-slot">Saturday</a>
          </li>
          <li>
            <a href="#" data-bs-toggle="tab" data-bs-target="#sunday-slot">Sunday</a>
          </li>
        </ul>
      </div>

      <div class="tab-content pt-0">
        <!-- Slot -->
        <div class="tab-pane active show" id="monday-slot">
          <div class="slot-box">
            <div class="slot-header">
              <h5>Monday</h5>
              <ul>
                <li>
                  <a
                    href="#"
                    class="add-slot"
                    data-bs-toggle="modal"
                    data-bs-target="#add_slot"
                    >Add Slots</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="del-slot"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_slot"
                    >Delete All</a
                  >
                </li>
              </ul>
            </div>
            <div class="slot-body">
              <ul class="time-slots">
                <li><i class="isax isax-clock"></i>09:00 AM</li>
                <li><i class="isax isax-clock"></i>09:30 AM</li>
                <li class="slot-space">Space : 2</li>
                <li><i class="isax isax-clock"></i>10:30 AM</li>
                <li><i class="isax isax-clock"></i>11:00 AM</li>
              </ul>
            </div>
          </div>
        </div>
        <!-- /Slot -->

        <!-- Slot -->
        <div class="tab-pane fade" id="tuesday-slot">
          <div class="slot-box">
            <div class="slot-header">
              <h5>Tuesday</h5>
              <ul>
                <li>
                  <a
                    href="#"
                    class="add-slot"
                    data-bs-toggle="modal"
                    data-bs-target="#add_slot"
                    >Add Slots</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="del-slot"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_slot"
                    >Delete All</a
                  >
                </li>
              </ul>
            </div>
            <div class="slot-body">
              <p>No Slots Available</p>
            </div>
          </div>
        </div>
        <!-- /Slot -->

        <!-- Slot -->
        <div class="tab-pane fade" id="wednesday-slot">
          <div class="slot-box">
            <div class="slot-header">
              <h5>Wednesday</h5>
              <ul>
                <li>
                  <a
                    href="#"
                    class="add-slot"
                    data-bs-toggle="modal"
                    data-bs-target="#add_slot"
                    >Add Slots</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="del-slot"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_slot"
                    >Delete All</a
                  >
                </li>
              </ul>
            </div>
            <div class="slot-body">
              <p>No Slots Available</p>
            </div>
          </div>
        </div>
        <!-- /Slot -->

        <!-- Slot -->
        <div class="tab-pane fade" id="thursday-slot">
          <div class="slot-box">
            <div class="slot-header">
              <h5>Thursday</h5>
              <ul>
                <li>
                  <a
                    href="#"
                    class="add-slot"
                    data-bs-toggle="modal"
                    data-bs-target="#add_slot"
                    >Add Slots</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="del-slot"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_slot"
                    >Delete All</a
                  >
                </li>
              </ul>
            </div>
            <div class="slot-body">
              <p>No Slots Available</p>
            </div>
          </div>
        </div>
        <!-- /Slot -->

        <!-- Slot -->
        <div class="tab-pane fade" id="friday-slot">
          <div class="slot-box">
            <div class="slot-header">
              <h5>Friday</h5>
              <ul>
                <li>
                  <a
                    href="#"
                    class="add-slot"
                    data-bs-toggle="modal"
                    data-bs-target="#add_slot"
                    >Add Slots</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="del-slot"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_slot"
                    >Delete All</a
                  >
                </li>
              </ul>
            </div>
            <div class="slot-body">
              <p>No Slots Available</p>
            </div>
          </div>
        </div>
        <!-- /Slot -->

        <!-- Slot -->
        <div class="tab-pane fade" id="saturday-slot">
          <div class="slot-box">
            <div class="slot-header">
              <h5>Saturday</h5>
              <ul>
                <li>
                  <a
                    href="#"
                    class="add-slot"
                    data-bs-toggle="modal"
                    data-bs-target="#add_slot"
                    >Add Slots</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="del-slot"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_slot"
                    >Delete All</a
                  >
                </li>
              </ul>
            </div>
            <div class="slot-body">
              <p>No Slots Available</p>
            </div>
          </div>
        </div>
        <!-- /Slot -->

        <!-- Slot -->
        <div class="tab-pane fade" id="sunday-slot">
          <div class="slot-box">
            <div class="slot-header">
              <h5>Sunday</h5>
              <ul>
                <li>
                  <a
                    href="#"
                    class="add-slot"
                    data-bs-toggle="modal"
                    data-bs-target="#add_slot"
                    >Add Slots</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="del-slot"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_slot"
                    >Delete All</a
                  >
                </li>
              </ul>
            </div>
            <div class="slot-body">
              <p>No Slots Available</p>
            </div>
          </div>
        </div>
        <!-- /Slot -->

        <div class="form-wrap">
          <label class="col-form-label">Appointment Fees ($)</label>
          <input type="text" class="form-control" value="254" />
        </div>
        <div class="modal-btn text-end">
          <a href="#" class="btn btn-gray">Cancel</a>
          <button class="btn btn-primary prime-btn">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const selectedClinic = ref(null);

const options = [
  { id: 1, text: "The Family Dentistry Clinic", image: "clinic-01.jpg" },
  { id: 2, text: "Dentistry Clinic", image: "clinic-02.jpg" },
];

const selectOptions = options.map((option) => ({ id: option.id, text: option.text }));

const templateResult = (option) => {
  const image = option.data
    ? option.data.require(`@/themes/doccure/assets/img/doctors-dashboard/${options.image}`)
    : null;
  const text = option.text ? option.text : null;

  if (!image) {
    return text;
  }

  return $('<span><img src="' + image + '" class="img-flag" /> ' + text + "</span>");
};
</script>
