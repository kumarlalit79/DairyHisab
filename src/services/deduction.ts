import api from "./api";

export const addDeduction = async (data: any) => {
    const response =  await api.post("/deductions", data)
    console.log("deduction response" , response);
    return response
}

export const fetchDeductions = async () => {
    return await api.get("/deductions");
}

export const updateDeduction = async (id: string, data: any) => {
    return await api.patch(`/deductions/${id}`, data);
}

export const deleteDeduction = async (id: string) => {
    return await api.delete(`/deductions/${id}`);
}