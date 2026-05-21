<template>
  <div class="card custom-card">
    <div class="card-body">
      <div class="card-header">
        <h3>Select Available Slots</h3>
      </div>

      <div class="available-tab">
        <label class="form-label">Select Available days</label>
        <ul class="nav">
          <li>
            <a href="#" class="active" data-bs-toggle="tab" data-bs-target="#monday"
              >Monday</a
            >
          </li>
          <li>
            <a href="#" data-bs-toggle="tab" data-bs-target="#tuesday">Tuesday</a>
          </li>
          <li>
            <a href="#" data-bs-toggle="tab" data-bs-target="#wedneday">Wedneday</a>
          </li>
          <li>
            <a href="#" data-bs-toggle="tab" data-bs-target="#thursday">Thursday</a>
          </li>
          <li>
            <a href="#" data-bs-toggle="tab" data-bs-target="#friday">Friday</a>
          </li>
          <li>
            <a href="#" data-bs-toggle="tab" data-bs-target="#saturday">Saturday</a>
          </li>
          <li>
            <a href="#" data-bs-toggle="tab" data-bs-target="#sunday">Sunday</a>
          </li>
        </ul>
      </div>

      <div class="tab-content pt-0">
        <!-- Slot -->
        <div class="tab-pane active show" id="monday">
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
        <div class="tab-pane fade" id="tuesday">
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
        <div class="tab-pane fade" id="wednesday">
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
        <div class="tab-pane fade" id="thursday">
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
        <div class="tab-pane fade" id="friday">
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
        <div class="tab-pane fade" id="saturday">
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
        <div class="tab-pane fade" id="sunday">
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
