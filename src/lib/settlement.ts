import Settlement from "@/models/Settlement";

export async function getActiveSettlement(userId: string) {
  return Settlement.findOne({
    userId,
    status: "ACTIVE",
  });
}

export async function createSettlement(userId: string, startDate: Date) {
  return Settlement.create({
    userId,
    startDate,
  });
}

export async function getOrCreateSettlement(userId: string, startDate: Date) {
  let settlement = await getActiveSettlement(userId);

  if (!settlement) {
    settlement = await createSettlement(userId, startDate);
  }
  return settlement;
}
