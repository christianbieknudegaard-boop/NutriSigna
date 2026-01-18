import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

function chunk<T>(arr: T[], size = 100) {
  const out: T[][] = []
  for (let i=0;i<arr.length;i+=size) out.push(arr.slice(i,i+size))
  return out
}

async function importRecipes(filePath: string) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  console.log('Importing recipes', data.length)
  for (const batch of chunk(data, 200)) {
    await Promise.all(batch.map(async (r:any)=>{
      await prisma.recipe.upsert({
        where: { id: r.id },
        update: {
          title: r.title,
          description: r.description ?? null,
          timeMin: r.timeMin ?? null,
          servings: r.servings ?? null,
          fodmap: r.fodmap ?? null,
          ingredients: JSON.stringify(r.ingredients ?? []),
          steps: JSON.stringify(r.steps ?? [])
        },
        create: {
          id: r.id,
          title: r.title,
          description: r.description ?? null,
          timeMin: r.timeMin ?? null,
          servings: r.servings ?? null,
          fodmap: r.fodmap ?? null,
          ingredients: JSON.stringify(r.ingredients ?? []),
          steps: JSON.stringify(r.steps ?? [])
        }
      })
    }))
    console.log('Imported batch', batch.length)
  }
}

async function importFoods(filePath: string) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  console.log('Importing foods/products', data.length)
  for (const batch of chunk(data, 500)) {
    await Promise.all(batch.map(async (f:any)=>{
      const id = f.id ?? f.barcode ?? f.code ?? `${f.name}_${f.brand ?? ''}`
      await prisma.product.upsert({
        where: { id },
        update: {
          name: f.name,
          brand: f.brand ?? null,
          kcal: f.kcal ?? null,
          proteinG: f.proteinG ?? null,
          carbsG: f.carbsG ?? null,
          fatG: f.fatG ?? null,
          fiberG: f.fiberG ?? null
        },
        create: {
          id,
          barcode: f.barcode ?? null,
          name: f.name,
          brand: f.brand ?? null,
          kcal: f.kcal ?? null,
          proteinG: f.proteinG ?? null,
          carbsG: f.carbsG ?? null,
          fatG: f.fatG ?? null,
          fiberG: f.fiberG ?? null
        }
      })
    }))
    console.log('Imported product batch', batch.length)
  }
}

async function main(){
  const base = path.resolve(__dirname)
  const recipesPath = path.join(base, 'recipes.generated.json')
  const foodsPath = path.join(base, 'foods.generated.json')
  if (fs.existsSync(recipesPath)) await importRecipes(recipesPath)
  if (fs.existsSync(foodsPath)) await importFoods(foodsPath)
  console.log('Import done')
}

main().catch(e=>{ console.error(e); process.exit(1) }).finally(()=>prisma.$disconnect())
