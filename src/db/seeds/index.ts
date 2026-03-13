import "dotenv/config";
import { seedRbac } from "./rbac";
// import { assignSuperAdminByEmail } from "./assign-super-admin";

async function main() {
  await seedRbac();

  // opcional:
  // await assignSuperAdminByEmail("seu-email@dominio.com");

  console.log("RBAC seed completed.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("RBAC seed failed:", error);
    process.exit(1);
  });
