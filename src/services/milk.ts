import api from "./api";

export async function addMilkEntry(data: any) {
    return await api.post("/milk-entries", data)
}

export async function fetchMilkEntries() {
    return await api.get("/milk-entries");
}

export async function updateMilkEntry(id: string, data: any) {
    return await api.patch(`/milk-entries/${id}`, data);
}

export async function deleteMilkEntry(id: string) {
    return await api.delete(`/milk-entries/${id}`);
}