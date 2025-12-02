import { prisma } from '../lib/prisma.js'

async function main() {
  const compromissos = await prisma.compromisso.findMany()
  console.log(compromissos)
}
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })