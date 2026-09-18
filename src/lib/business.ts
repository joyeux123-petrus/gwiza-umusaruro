import prisma from "./prisma";

export async function getBusinessInfo() {
  try {
    return await prisma.businessInfo.findUnique({
      where: { id: 'singleton' }
    });
  } catch (error) {
    console.error("Failed to fetch business info:", error);
    return null;
  }
}
