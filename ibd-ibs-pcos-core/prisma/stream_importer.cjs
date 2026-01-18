const fs = require('fs')
const path = require('path')
const readline = require('readline')
const Papa = require('papaparse')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

function chunk(arr, size=200){
  const out = []
  for (let i=0;i<arr.length;i+=size) out.push(arr.slice(i,i+size))
  return out
}

async function upsertRecipe(r){
  // normalize id
  if (!r.id) r.id = r.slug ?? (r.title ? r.title.replace(/\s+/g,'_').toLowerCase() : undefined)
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
}

async function upsertProduct(f){
  const id = f.id ?? f.barcode ?? `${(f.name||'').slice(0,40)}_${(f.brand||'').slice(0,20)}`
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
}

async function importNdjson(file, type, batchSize){
  const rl = readline.createInterface({ input: fs.createReadStream(file), crlfDelay: Infinity })
  let batch = []
  let i = 0
  for await (const line of rl) {
    if (!line.trim()) continue
    const obj = JSON.parse(line)
    batch.push(obj)
    if (batch.length >= batchSize) {
      await processBatch(batch, type)
      i += batch.length
      console.log('Processed', i)
      batch = []
    }
  }
  if (batch.length) {
    await processBatch(batch, type)
    i += batch.length
    console.log('Processed', i)
  }
}

async function importCsv(file, type, batchSize){
  return new Promise((resolve, reject)=>{
    const stream = fs.createReadStream(file)
    const batch = []
    Papa.parse(stream, {
      header: true,
      dynamicTyping: true,
      step: async (results) => {
        batch.push(results.data)
        if (batch.length >= batchSize) {
          // pause parsing by throwing into step? Papaparse doesn't support pause in Node
          // Instead, we accumulate and let step continue; process in background but control concurrency by awaiting in chunks at end
        }
      },
      complete: async () => {
        try {
          const chunks = chunk(batch, batchSize)
          let processed = 0
          for (const ch of chunks) {
            await processBatch(ch, type)
            processed += ch.length
            console.log('Processed', processed)
          }
          resolve()
        } catch (e) { reject(e) }
      },
      error: (err)=>reject(err)
    })
  })
}

async function importJsonArray(file, type, batchSize){
  const data = JSON.parse(fs.readFileSync(file,'utf8'))
  const chunks = chunk(data, batchSize)
  let processed = 0
  for (const ch of chunks) {
    await processBatch(ch, type)
    processed += ch.length
    console.log('Processed', processed)
  }
}

async function processBatch(batch, type){
  if (type === 'recipes') {
    await Promise.all(batch.map(r => upsertRecipe(r)))
  } else if (type === 'foods' || type === 'products'){
    await Promise.all(batch.map(f => upsertProduct(f)))
  }
}

async function main(){
  const argv = require('minimist')(process.argv.slice(2))
  const recipesFile = argv.recipes || argv.r
  const foodsFile = argv.foods || argv.f
  const type = argv.type || 'json'
  const batch = Number(argv.batch) || 200

  if (recipesFile) {
    const file = path.resolve(process.cwd(), recipesFile)
    console.log('Importing recipes from', file)
    if (type === 'ndjson') await importNdjson(file, 'recipes', batch)
    else if (type === 'csv') await importCsv(file, 'recipes', batch)
    else await importJsonArray(file, 'recipes', batch)
  }
  if (foodsFile) {
    const file = path.resolve(process.cwd(), foodsFile)
    console.log('Importing foods from', file)
    if (type === 'ndjson') await importNdjson(file, 'foods', batch)
    else if (type === 'csv') await importCsv(file, 'foods', batch)
    else await importJsonArray(file, 'foods', batch)
  }
  console.log('Done')
}

main().catch(e=>{ console.error(e); process.exit(1) }).finally(()=>prisma.$disconnect())
