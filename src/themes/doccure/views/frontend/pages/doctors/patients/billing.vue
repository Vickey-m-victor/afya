<template>
    <div class="search-header">
        <div class="search-field">
            <input type="text" class="form-control" placeholder="Search">
            <span class="search-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
        </div>
        <div>
            <a href="#" class="btn btn-primary prime-btn" data-bs-toggle="modal" data-bs-target="#add_billing">Add New
                Billing</a>
        </div>
    </div>

    <div class="custom-table">
        <div class="table-responsive">
            <table class="table table-center mb-0">
                <thead>
                    <tr>
                        <th>Billing Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>24 Mar 2024</td>
                        <td>$300</td>
                        <td><span class="badge badge-green status-badge">Paid</span>
                        </td>
                        <td>
                            <div class="action-item">
                                <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#view_bill">
                                    <i class="fa-solid fa-link"></i>
                                </a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>28 Mar 2024</td>
                        <td>$350</td>
                        <td><span class="badge badge-green status-badge">Paid</span>
                        </td>
                        <td>
                            <div class="action-item">
                                <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#view_bill">
                                    <i class="fa-solid fa-link"></i>
                                </a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>10 Apr 2024</td>
                        <td>$400</td>
                        <td><span class="badge badge-green status-badge">Paid</span>
                        </td>
                        <td>
                            <div class="action-item">
                                <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#view_bill">
                                    <i class="fa-solid fa-link"></i>
                                </a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>19 Apr 2024</td>
                        <td>$250</td>
                        <td><span class="badge badge-green status-badge">Paid</span>
                        </td>
                        <td>
                            <div class="action-item">
                                <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#view_bill">
                                    <i class="fa-solid fa-link"></i>
                                </a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>22 Apr 2024</td>
                        <td>$320</td>
                        <td><span class="badge badge-green status-badge">Paid</span>
                        </td>
                        <td>
                            <div class="action-item">
                                <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#view_bill">
                                    <i class="fa-solid fa-link"></i>
                                </a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>02 May 2024</td>
                        <td>$480</td>
                        <td><span class="badge badge-danger status-badge">Unpaid</span>
                        </td>
                        <td>
                            <div class="action-item">
                                <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#view_bill">
                                    <i class="fa-solid fa-link"></i>
                                </a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Pagination -->
    <div class="pagination dashboard-pagination">
        <ul>
            <li>
                <a href="#" class="page-link"><i class="fa-solid fa-chevron-left"></i></a>
            </li>
            <li>
                <a href="#" class="page-link">1</a>
            </li>
            <li>
                <a href="#" class="page-link active">2</a>
            </li>
            <li>
                <a href="#" class="page-link">3</a>
            </li>
            <li>
                <a href="#" class="page-link">4</a>
            </li>
            <li>
                <a href="#" class="page-link">...</a>
            </li>
            <li>
                <a href="#" class="page-link"><i class="fa-solid fa-chevron-right"></i></a>
            </li>
        </ul>
    </div>
    <!-- /Pagination -->
</template>