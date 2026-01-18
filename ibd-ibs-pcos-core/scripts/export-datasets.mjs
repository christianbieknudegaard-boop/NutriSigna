import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const base = path.dirname(fileURLToPath(import.meta.url))

async function dump(moduleRelPath, outName) {
  const modPath = path.resolve(base, '..', moduleRelPath)
  let data = null
  try {
    const mod = await import(modPath)
    data = mod.recipes ?? mod.default ?? mod.foods ?? mod.items ?? mod
  } catch (err) {
    // fallback: read .ts file and extract the exported array
    const src = fs.readFileSync(modPath, 'utf8')
    const m = src.match(/export const (recipes|foods) =\s*(\[[\s\S]*?\])/) 
    if (!m) throw err
    const arrText = m[2]
    // very small heuristic to make array JSON parsable
    const jsonish = arrText.replace(/([\n\r])\s*([a-zA-Z0-9_]+):/g, '$1"$2":').replace(/'/g, '"')
    data = JSON.parse(jsonish)
  }
  const out = path.resolve(base, '..', 'prisma', outName)
  fs.writeFileSync(out, JSON.stringify(data, null, 2), 'utf8')
  console.log('Wrote', out, 'count=', Array.isArray(data) ? data.length : Object.keys(data).length)
}

async function main(){
  await dump('./data/recipes.generated.js', 'recipes.generated.json').catch(()=>dump('./data/recipes.generated.ts','recipes.generated.json'))
  await dump('./data/foods.generated.js', 'foods.generated.json').catch(()=>dump('./data/foods.generated.ts','foods.generated.json'))
}

main().catch(err=>{ console.error(err); process.exit(1) })
