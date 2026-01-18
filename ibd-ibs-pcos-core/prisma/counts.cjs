const { PrismaClient } = require('@prisma/client')
;(async ()=>{
  const prisma = new PrismaClient()
  const r = await prisma.recipe.count()
  const p = await prisma.product.count()
  console.log('recipes', r)
  console.log('products', p)
  await prisma.$disconnect()
})().catch(e=>{ console.error(e); process.exit(1) })
