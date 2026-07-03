import api from "./api";

export const getSettlements = async () => {
  return await api.get("/settlement");
};

export const getSettlementDetails = async (id: string) => {
  return await api.get(`/settlement/${id}`);
};

export const resetSettlement = async () => {
    return await api.post("/settlement/reset")
}