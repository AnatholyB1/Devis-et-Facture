import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

const adminPassword = process.env.ADMIN_PASSWORD;



async function main() {
  if(!adminPassword) {    
    console.error("ADMIN_PASSWORD environment variable is required");
    process.exit(1);
  }   

  const password = await hash(adminPassword, 12);
  const user = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      email: "admin@admin.com",
      name: "Admin",
      password,
      role: "ADMIN",
      prenom: "Admin",
      telephone: "1234567890",
      adresse: "123 Admin St",
      ville: "Admin City",
      codePostal: "12345",
      Siret: "123456789",
      NomSociete: "Admin Company",
    },
  });
  console.log({ user });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });