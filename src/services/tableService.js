import api from "@/utils/api";

export const tableService = {
    getAll() {
        return api.get("/iam/users");
    }
};