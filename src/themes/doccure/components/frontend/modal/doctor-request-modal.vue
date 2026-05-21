<template>
    <!-- Appointment Accepted Modal -->
    <div class="modal fade info-modal" id="accept_appointment">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="success-wrap text-center">
                        <span class="icon-success"><i class="fa-solid fa-calendar-check"></i></span>
                        <h3>Appointment Accepted</h3>
                        <p>Your Appointment has been scheduled on 23 Mar 2023</p>
                        <a href="javascript:void(0);" class="btn btn-blue">Go to Appointments</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /Appointment Accepted Modal -->

    <!-- Appointment Cancel Modal -->
    <div class="modal fade info-modal" id="cancel_appointment">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="success-wrap">
                        <div class="success-info">
                            <div class="text-center">
                                <span class="icon-success bg-red"><i class="fa-solid fa-xmark"></i></span>
                                <h3>Are you Sure</h3>
                                <p>Do you want to Cancel Appointment</p>
                            </div>
                            <div class="form-wrap">
                                <label class="col-form-label">Cancel Reason <span class="text-danger">*</span></label>
                                <textarea class="form-control" rows="4"></textarea>
                            </div>
                            <div class="form-wrap">
                                <div class="custom-control form-check custom-control-inline">
                                    <input type="radio" id="reshedule" name="rating_option" class="form-check-input"
                                        value="price_free" checked="">
                                    <label class="form-check-label" for="reshedule">Cancel with Reschedule</label>
                                </div>
                            </div>
                            <div class="form-wrap">
                                <div class="custom-control form-check custom-control-inline">
                                    <input type="radio" id="refund" name="rating_option" class="form-check-input"
                                        value="price_free" checked="">
                                    <label class="form-check-label" for="refund">Cancel with Request Refund Description
                                        text</label>
                                </div>
                            </div>
                        </div>
                        <div class="modal-button">
                            <div class="row gx-3">
                                <div class="col-sm-6">
                                    <a href="javascript:void(0);" class="btn btn-gray w-100" data-bs-toggle="modal"
                                        data-bs-dismiss="modal">No, I change my mind</a>
                                </div>
                                <div class="col-sm-6">
                                    <button class="btn btn-blue w-100">Go to Appointments</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /Appointment Cancel Modal -->
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
}
</script>