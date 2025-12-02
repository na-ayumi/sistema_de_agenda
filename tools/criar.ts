import { prisma } from '../lib/prisma.js'
async function main() {
  const novoCompromisso = await prisma.compromisso.create({
    data: {
        start_datetime: new Date("2025-11-29T14:00Z"),
        end_datetime: new Date("2025-11-29T15:00Z"),
        description: "Fazer projeto CodePink",
    },
  })
  console.log(novoCompromisso)
}
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })