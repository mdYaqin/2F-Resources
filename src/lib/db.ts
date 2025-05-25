import { prisma } from "@/lib/prisma";

export async function saveMessage(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return prisma.contactSubmission.create({
    data,
  });
}

export async function deleteMessage(id: string) {
  return prisma.contactSubmission.delete({
    where: { id },
  });
}

export async function deleteAllMessages() {
  return prisma.contactSubmission.deleteMany();
}
