import api from "./api";

export async function addMilkEntry(data: any) {
    return await api.post("/milk-entries", data)
}