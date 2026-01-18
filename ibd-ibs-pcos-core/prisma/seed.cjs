const fs = require('fs')
const path = require('path')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const dataPath = path.resolve(__dirname, './recipes.json')
  const recipes = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
  console.log('Seeding recipes (cjs):', recipes.length)
  for (const r of recipes) {
    await prisma.recipe.upsert({
      where: { id: r.id },
      update: {
        title: r.title,
        description: r.description || null,
        timeMin: r.timeMin || null,
        servings: r.servings || null,
        fodmap: r.fodmap || null,
        ingredients: JSON.stringify(r.ingredients || []),
        steps: JSON.stringify(r.steps || [])
      },
      create: {
        id: r.id,
        title: r.title,
        description: r.description || null,
        timeMin: r.timeMin || null,
        servings: r.servings || null,
        fodmap: r.fodmap || null,
        ingredients: JSON.stringify(r.ingredients || []),
        steps: JSON.stringify(r.steps || [])
      }
    })
  }
  console.log('Seeding complete (cjs)')
}

main().catch(e=>{ console.error(e); process.exit(1) }).finally(()=>prisma.$disconnect())
