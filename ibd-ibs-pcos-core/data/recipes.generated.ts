import type { Recipe } from "./types";

/**
 * Generated from datasets/recipes.csv
 * Run: npm run build (or node scripts/import-recipes-csv.mjs)
 * Last generated: 2026-01-18T18:13:19.261Z
 */
export const recipes: Recipe[] = [
  {
    "id": "r1",
    "title": "Enkel havregrøt",
    "description": "Mild frokost som passer mange",
    "timeMin": 10,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      {
        "name": "Havregryn",
        "amount": "40 g"
      },
      {
        "name": "Vann",
        "amount": "2 dl"
      }
    ],
    "steps": [
      "Kok opp vann",
      "Tilsett havre",
      "La trekke i 3 min"
    ]
  },
  {
    "id": "r2",
    "title": "Eggerøre",
    "description": "Enkel og rask proteinrik frokost",
    "timeMin": 8,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      {
        "name": "Egg",
        "amount": "2 stk"
      },
      {
        "name": "Smør",
        "amount": "1 ts"
      },
      {
        "name": "Salt",
        "amount": "etter smak"
      }
    ],
    "steps": [
      "Visp egg med salt",
      "Stek på lav varme med smør",
      "Rør jevnlig til kremete"
    ]
  },
  {
    "id": "r3",
    "title": "Stekt laks med ris",
    "description": "Næringsrik middag",
    "timeMin": 25,
    "servings": 2,
    "fodmap": "green",
    "ingredients": [
      {
        "name": "Laks",
        "amount": "300 g"
      },
      {
        "name": "Ris",
        "amount": "2 dl"
      },
      {
        "name": "Vann",
        "amount": "4 dl"
      },
      {
        "name": "Salt",
        "amount": "1 ts"
      }
    ],
    "steps": [
      "Kok ris i saltet vann",
      "Stek laks på middels varme",
      "Server sammen"
    ]
  },
  {
    "id": "r4",
    "title": "Gulrotsuppe",
    "description": "Enkel og mettende suppe",
    "timeMin": 30,
    "servings": 4,
    "fodmap": "green",
    "ingredients": [
      {
        "name": "Gulrot",
        "amount": "500 g"
      },
      {
        "name": "Vann",
        "amount": "1 liter"
      },
      {
        "name": "Salt",
        "amount": "1 ts"
      },
      {
        "name": "Pepper",
        "amount": "0.5 ts"
      }
    ],
    "steps": [
      "Skrell og kutt gulrøtter",
      "Kok myke i vann",
      "Kjør til jevn suppe",
      "Smak til med salt og pepper"
    ]
  }
,
  {
    "id": "r5",
    "title": "Yoghurt med granola og bær",
    "description": "Kremet yoghurt med sprø granola",
    "timeMin": 5,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Naturell yoghurt", "amount": "150 g" },
      { "name": "Granola", "amount": "40 g" },
      { "name": "Blåbær", "amount": "50 g" }
    ],
    "steps": ["Ha yoghurt i bolle", "Topp med granola og bær"]
  },
  {
    "id": "r6",
    "title": "Avokado-toast",
    "description": "Rask og mettende frokost",
    "timeMin": 8,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Fullkornbrød", "amount": "1 skive" },
      { "name": "Avokado", "amount": "1/2" },
      { "name": "Sitron", "amount": "1 skvett" }
    ],
    "steps": ["Rist brød", "Mos avokado med sitron og smør på brød"]
  },
  {
    "id": "r7",
    "title": "Chiapudding med mango",
    "description": "Sunn chia-frokost",
    "timeMin": 10,
    "servings": 1,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Chiafrø", "amount": "3 ss" },
      { "name": "Mandelmelk", "amount": "2 dl" },
      { "name": "Mango", "amount": "80 g" }
    ],
    "steps": ["Bland chia og melk, sett i kjøleskap over natten", "Topp med mango"]
  },
  {
    "id": "r8",
    "title": "Havregryns-smoothie",
    "description": "Fyllende smoothie med havre",
    "timeMin": 5,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Havregryn", "amount": "30 g" },
      { "name": "Banan", "amount": "1/2" },
      { "name": "Melk", "amount": "2 dl" }
    ],
    "steps": ["Kjør alle ingredienser i blender til jevnt"]
  },
  {
    "id": "r9",
    "title": "Ristet kornblanding med frukt",
    "description": "Enkel frokostskål",
    "timeMin": 5,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Kornblanding", "amount": "50 g" },
      { "name": "Melk", "amount": "1.5 dl" },
      { "name": "Eplebiter", "amount": "50 g" }
    ],
    "steps": ["Hell korn i bolle og tilsett melk og frukt"]
  },
  {
    "id": "r10",
    "title": "Omelett med spinat",
    "description": "Proteinrik frokost",
    "timeMin": 10,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Egg", "amount": "2 stk" },
      { "name": "Spinat", "amount": "30 g" },
      { "name": "Olje", "amount": "1 ts" }
    ],
    "steps": ["Visp egg", "Stek spinat og hell over egg, stek til fast"]
  },
  {
    "id": "r11",
    "title": "Pannekaker med bær",
    "description": "Luftige pannekaker til frokost",
    "timeMin": 20,
    "servings": 2,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Hvetemel", "amount": "100 g" },
      { "name": "Melk", "amount": "2 dl" },
      { "name": "Egg", "amount": "1 stk" }
    ],
    "steps": ["Lag røre", "Stek små pannekaker", "Server med bær"]
  },
  {
    "id": "r12",
    "title": "Gresk yoghurt med honning og nøtter",
    "description": "Kremet yoghurt med sprø topping",
    "timeMin": 5,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Gresk yoghurt", "amount": "150 g" },
      { "name": "Honning", "amount": "1 ss" },
      { "name": "Hakkede nøtter", "amount": "20 g" }
    ],
    "steps": ["Server yoghurt med honning og nøtter"]
  },
  {
    "id": "r13",
    "title": "Ristet bagel med kremost og røkelaks",
    "description": "Smakfull frokost eller lett lunsj",
    "timeMin": 7,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Bagel", "amount": "1" },
      { "name": "Kremost", "amount": "2 ss" },
      { "name": "Røkelaks", "amount": "50 g" }
    ],
    "steps": ["Rist bagel, smør kremost, legg på laks"]
  },
  {
    "id": "r14",
    "title": "Quinoasalat med egg (lunsj)",
    "description": "Lett lunsj med protein",
    "timeMin": 20,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Quinoa", "amount": "1 dl" },
      { "name": "Egg", "amount": "1 stk" },
      { "name": "Cherrytomater", "amount": "6 stk" }
    ],
    "steps": ["Kok quinoa", "Kok egg", "Bland sammen med tomater"]
  },
  {
    "id": "r15",
    "title": "Wrap med kylling og grønnsaker",
    "description": "Rask lunsjwrap",
    "timeMin": 15,
    "servings": 1,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Tortilla", "amount": "1" },
      { "name": "Kyllingfilet", "amount": "80 g" },
      { "name": "Salat", "amount": "20 g" }
    ],
    "steps": ["Stek kylling og skjær i skiver", "Fyll tortilla og rull sammen"]
  },
  {
    "id": "r16",
    "title": "Grovt rundstykke med ost og tomat",
    "description": "Enkel og klassisk lunsj",
    "timeMin": 5,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Rundstykke", "amount": "1" },
      { "name": "Ost", "amount": "2 skiver" },
      { "name": "Tomat", "amount": "3 skiver" }
    ],
    "steps": ["Del rundstykket og legg på ost og tomat"]
  },
  {
    "id": "r17",
    "title": "Kikert-salat med urter (lunsj)",
    "description": "Vegetarisk og mettende",
    "timeMin": 10,
    "servings": 2,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Kikerter (hermetiske)", "amount": "240 g" },
      { "name": "Agurk", "amount": "1/2" },
      { "name": "Persille", "amount": "1 ss" }
    ],
    "steps": ["Skyll kikerter", "Bland med hakket agurk og persille"]
  },
  {
    "id": "r18",
    "title": "Havrepannekaker (glutenfri)",
    "description": "Lett frokost uten gluten",
    "timeMin": 15,
    "servings": 2,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Havremel", "amount": "100 g" },
      { "name": "Melk", "amount": "2 dl" },
      { "name": "Egg", "amount": "1" }
    ],
    "steps": ["Bland ingredienser til røre", "Stek små pannekaker"]
  },
  {
    "id": "r19",
    "title": "Ristet fullkornsbrød med peanøttsmør",
    "description": "Rask og energirik frokost",
    "timeMin": 3,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Fullkornsbrød", "amount": "2 skiver" },
      { "name": "Peanøttsmør", "amount": "1 ss" }
    ],
    "steps": ["Rist brød og smør på peanøttsmør"]
  },
  {
    "id": "r20",
    "title": "Salat med tunfisk og bønner (lunsj)",
    "description": "Proteinrik salat som metter",
    "timeMin": 10,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Tunfisk (hermetisk)", "amount": "1 boks" },
      { "name": "Hvit bønner", "amount": "100 g" },
      { "name": "Bladsalat", "amount": "30 g" }
    ],
    "steps": ["Bland alle ingredienser og smak til med olje og sitron"]
  },
  {
    "id": "r21",
    "title": "Smoothie bowl med spinat og banan",
    "description": "Næringsrik frokostskål",
    "timeMin": 7,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Spinat", "amount": "30 g" },
      { "name": "Banan", "amount": "1/2" },
      { "name": "Mandelmelk", "amount": "2 dl" }
    ],
    "steps": ["Kjør i blender til jevnt, topp med frø eller bær"]
  },
  {
    "id": "r22",
    "title": "Rødbetsalat med feta (lunsj)",
    "description": "Fargerik og frisk salat",
    "timeMin": 15,
    "servings": 2,
    "fodmap": "green",
    "ingredients": [
      { "name": "Rødbeter", "amount": "300 g" },
      { "name": "Feta", "amount": "50 g" },
      { "name": "Ruccola", "amount": "30 g" }
    ],
    "steps": ["Kok eller bak rødbeter til møre", "Skjær og bland med feta og ruccola"]
  },
  {
    "id": "r23",
    "title": "Havregrøt med eple og kanel",
    "description": "Varm og fyldig frokost",
    "timeMin": 12,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Havregryn", "amount": "50 g" },
      { "name": "Eple", "amount": "1/2" },
      { "name": "Kanel", "amount": "0.5 ts" }
    ],
    "steps": ["Kok havre i melk eller vann", "Tilsett eplebiter og kanel"]
  },
  {
    "id": "r24",
    "title": "Bakt søtpotet med cottage cheese (lunsj)",
    "description": "Mettende og enkelt",
    "timeMin": 40,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Søtpotet", "amount": "1 medium" },
      { "name": "Cottage cheese", "amount": "100 g" },
      { "name": "Chives", "amount": "1 ts" }
    ],
    "steps": ["Bak søtpotet til myk", "Del og topp med cottage cheese og urter"]
  },
  {
    "id": "r25",
    "title": "Kornblanding med tørket frukt",
    "description": "Rask frokost for travle dager",
    "timeMin": 2,
    "servings": 1,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Kornblanding", "amount": "50 g" },
      { "name": "Tørkede tranebær", "amount": "15 g" },
      { "name": "Melk", "amount": "1.5 dl" }
    ],
    "steps": ["Ha korn i bolle og tilsett melk og tørket frukt"]
  },
  {
    "id": "r26",
    "title": "Toast med egg og spinat",
    "description": "Varmer og mettende frokost",
    "timeMin": 10,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Brødskive", "amount": "2" },
      { "name": "Egg", "amount": "1" },
      { "name": "Spinat", "amount": "25 g" }
    ],
    "steps": ["Stek egg og spinat, legg på toast"]
  },
  {
    "id": "r27",
    "title": "Frokostmuffins med grønnsaker",
    "description": "Bakeklar frokost for flere dager",
    "timeMin": 30,
    "servings": 6,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Egg", "amount": "4" },
      { "name": "Hakket paprika", "amount": "100 g" },
      { "name": "Revet ost", "amount": "50 g" }
    ],
    "steps": ["Bland ingredienser, fyll i muffinsformer og stek 20 min"]
  },
  {
    "id": "r28",
    "title": "Kald havresalat med eple (frokost)",
    "description": "Frisk og enkel",
    "timeMin": 5,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Havregryn", "amount": "50 g" },
      { "name": "Eplebiter", "amount": "50 g" },
      { "name": "Yoghurt", "amount": "100 g" }
    ],
    "steps": ["Bland alt og server kaldt"]
  },
  {
    "id": "r29",
    "title": "Linsesuppe til lunsj",
    "description": "Varm lunsj med protein",
    "timeMin": 35,
    "servings": 4,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Røde linser", "amount": "200 g" },
      { "name": "Gulrot", "amount": "1" },
      { "name": "Krydder", "amount": "etter smak" }
    ],
    "steps": ["Kok linser med grønnsaker til møre", "Kjør delvis glatt eller server som er"]
  },
  {
    "id": "r30",
    "title": "Wrap med hummus og grønnsaker",
    "description": "Vegetarisk lunsjwrap",
    "timeMin": 10,
    "servings": 1,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Tortilla", "amount": "1" },
      { "name": "Hummus", "amount": "2 ss" },
      { "name": "Gulrotstrimler", "amount": "40 g" }
    ],
    "steps": ["Smør hummus og fyll med grønnsaker, rull sammen"]
  },
  {
    "id": "r31",
    "title": "Havrebar med peanøtt",
    "description": "Snack/frokost på farten",
    "timeMin": 15,
    "servings": 8,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Havregryn", "amount": "200 g" },
      { "name": "Peanøttsmør", "amount": "100 g" },
      { "name": "Honning", "amount": "2 ss" }
    ],
    "steps": ["Bland og press i form, avkjøl og skjær i barer"]
  },
  {
    "id": "r32",
    "title": "Tomat- og mozzarellasalat (lunsj)",
    "description": "En klassisk caprese",
    "timeMin": 5,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Tomat", "amount": "2" },
      { "name": "Mozzarella", "amount": "100 g" },
      { "name": "Basilikum", "amount": "noen blader" }
    ],
    "steps": ["Skjær tomat og mozzarella, legg lagvis og topp med basilikum"]
  },
  {
    "id": "r33",
    "title": "Grøt med chia og pære",
    "description": "Frokost med fiber",
    "timeMin": 12,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Havregryn", "amount": "40 g" },
      { "name": "Chiafrø", "amount": "1 ss" },
      { "name": "Pære", "amount": "1/2" }
    ],
    "steps": ["Kok havregryn med melk, rør inn chia, topp med pære"]
  },
  {
    "id": "r34",
    "title": "Kyllingsalat med avokado (lunsj)",
    "description": "Mettende salat med god fettprofil",
    "timeMin": 15,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Kyllingrester", "amount": "100 g" },
      { "name": "Avokado", "amount": "1/2" },
      { "name": "Salatmix", "amount": "50 g" }
    ],
    "steps": ["Bland kylling og avokado med salat, smak til"]
  },
  {
    "id": "r35",
    "title": "Protein-pannekaker (frokost)",
    "description": "Høyprotein frokost",
    "timeMin": 15,
    "servings": 2,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Proteinpulver", "amount": "1 scoop" },
      { "name": "Havregryn", "amount": "50 g" },
      { "name": "Egg", "amount": "1" }
    ],
    "steps": ["Bland og stek som pannekaker"]
  },
  {
    "id": "r36",
    "title": "Laksesalat i glass (lunsj)",
    "description": "Praktisk lunsj for kontoret",
    "timeMin": 10,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Røkt laks", "amount": "60 g" },
      { "name": "Agurk", "amount": "1/2" },
      { "name": "Dressing", "amount": "1 ss" }
    ],
    "steps": ["Lag lag i glass med salat nederst, laks øverst"]
  },
  {
    "id": "r37",
    "title": "Havre-og bananmuffins",
    "description": "Bake en stor batch for frokost",
    "timeMin": 35,
    "servings": 12,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Havregryn", "amount": "200 g" },
      { "name": "Banan", "amount": "2 modne" },
      { "name": "Egg", "amount": "2" }
    ],
    "steps": ["Mos bananer og bland med resten, fyll muffinsformer, stek 20 minutter"]
  },
  {
    "id": "r38",
    "title": "Couscous-salat med grønnsaker (lunsj)",
    "description": "Rask salat som kan lages kald",
    "timeMin": 15,
    "servings": 2,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Couscous", "amount": "1 dl" },
      { "name": "Paprika", "amount": "1/2" },
      { "name": "Agurk", "amount": "1/2" }
    ],
    "steps": ["Lag couscous etter pakke, bland med hakkede grønnsaker"]
  },
  {
    "id": "r39",
    "title": "Rømmegrøt (liten porsjon)",
    "description": "Tradisjonell, men enkel variant",
    "timeMin": 20,
    "servings": 1,
    "fodmap": "red",
    "ingredients": [
      { "name": "Rømme", "amount": "200 g" },
      { "name": "Mel", "amount": "2 ss" },
      { "name": "Salt", "amount": "1 klype" }
    ],
    "steps": ["Varm rømme, rør inn mel til grøtkonsistens, smak til med salt"]
  },
  {
    "id": "r40",
    "title": "Kalkun- og avokadosandwich (lunsj)",
    "description": "Proteinrik sandwich",
    "timeMin": 10,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Brød", "amount": "2 skiver" },
      { "name": "Kalkunpålegg", "amount": "80 g" },
      { "name": "Avokado", "amount": "1/4" }
    ],
    "steps": ["Legg kalkun og avokado mellom brødskivene"]
  },
  {
    "id": "r41",
    "title": "Müslibar med nøtter",
    "description": "Hjemmelaget snack/frokost",
    "timeMin": 20,
    "servings": 10,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Havregryn", "amount": "150 g" },
      { "name": "Blandede nøtter", "amount": "100 g" },
      { "name": "Honning", "amount": "3 ss" }
    ],
    "steps": ["Bland, press i form, avkjøl og skjær i barer"]
  },
  {
    "id": "r42",
    "title": "Pasta-salat med pesto (lunsj)",
    "description": "Kald pastasalat med grønnsaker",
    "timeMin": 20,
    "servings": 2,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Pasta", "amount": "150 g" },
      { "name": "Pesto", "amount": "2 ss" },
      { "name": "Cherrytomater", "amount": "6 stk" }
    ],
    "steps": ["Kok pasta, avkjøl og bland med pesto og tomater"]
  },
  {
    "id": "r43",
    "title": "Varm yoghurt med nøtter og kanel",
    "description": "En alternativ varm frokost",
    "timeMin": 6,
    "servings": 1,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Yoghurt", "amount": "150 g" },
      { "name": "Nøtter", "amount": "20 g" },
      { "name": "Kanel", "amount": "0.5 ts" }
    ],
    "steps": ["Varm yoghurt lett i kjele, topp med nøtter og kanel"]
  },
  {
    "id": "r44",
    "title": "Tunfisk-wrap med salat",
    "description": "Rask, proteinrik lunsj",
    "timeMin": 8,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Tortilla", "amount": "1" },
      { "name": "Tunfisk", "amount": "1 boks" },
      { "name": "Salat", "amount": "30 g" }
    ],
    "steps": ["Fyll tortilla med tunfisk og salat, rull sammen"]
  },
  {
    "id": "r45",
    "title": "Havrepanne med frø (frokost)",
    "description": "Fyldig frokost med frøblanding",
    "timeMin": 10,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Havregryn", "amount": "50 g" },
      { "name": "Linfrø", "amount": "1 ss" },
      { "name": "Gresskarkjerner", "amount": "1 ss" }
    ],
    "steps": ["Kok havre med vann eller melk, rør inn frø og server"]
  },
  {
    "id": "r46",
    "title": "Kyllingwrap med tzatziki (lunsj)",
    "description": "Smakfull og frisk",
    "timeMin": 15,
    "servings": 1,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Tortilla", "amount": "1" },
      { "name": "Stekt kylling", "amount": "80 g" },
      { "name": "Tzatziki", "amount": "2 ss" }
    ],
    "steps": ["Fyll tortilla og rull sammen"]
  },
  {
    "id": "r47",
    "title": "Fruktsalat med cottage cheese",
    "description": "Lett frokost eller dessert",
    "timeMin": 10,
    "servings": 2,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Blandet frukt", "amount": "200 g" },
      { "name": "Cottage cheese", "amount": "150 g" }
    ],
    "steps": ["Bland frukt og cottage cheese, server kald"]
  },
  {
    "id": "r48",
    "title": "Eggesalat på rugbrød (lunsj)",
    "description": "Klassisk eggesalat",
    "timeMin": 10,
    "servings": 2,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Egg", "amount": "3" },
      { "name": "Majones", "amount": "1 ss" },
      { "name": "Rugbrød", "amount": "2 skiver" }
    ],
    "steps": ["Kok egg, hakk og bland med majones, server på brød"]
  },
  {
    "id": "r49",
    "title": "Overnight oats med nøtter",
    "description": "Forberedes kvelden før",
    "timeMin": 5,
    "servings": 1,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Havregryn", "amount": "50 g" },
      { "name": "Mandelmelk", "amount": "1.5 dl" },
      { "name": "Nøtter", "amount": "20 g" }
    ],
    "steps": ["Bland og sett i kjøleskap over natten, topp med nøtter på morgenen"]
  },
  {
    "id": "r50",
    "title": "Peanut butter & banana sandwich (lunsj)",
    "description": "Enkelt og energitett",
    "timeMin": 5,
    "servings": 1,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Brød", "amount": "2 skiver" },
      { "name": "Peanøttsmør", "amount": "2 ss" },
      { "name": "Banan", "amount": "1/2" }
    ],
    "steps": ["Smør peanøttsmør og legg bananskiver mellom brød"]
  },
  {
    "id": "r51",
    "title": "Havregrøt med mandler og aprikos",
    "description": "Smaksrik frokost",
    "timeMin": 12,
    "servings": 1,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Havregryn", "amount": "50 g" },
      { "name": "Hakket mandel", "amount": "15 g" },
      { "name": "Tørket aprikos", "amount": "20 g" }
    ],
    "steps": ["Kok havre og tilsett mandel og aprikos før servering"]
  },
  {
    "id": "r52",
    "title": "Grillet ostesmørbrød med tomat (lunsj)",
    "description": "En varm og trøstende lunsj",
    "timeMin": 8,
    "servings": 1,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Brød", "amount": "2 skiver" },
      { "name": "Ost", "amount": "2 skiver" },
      { "name": "Tomat", "amount": "2 skiver" }
    ],
    "steps": ["Legg ost og tomat mellom brød og stek til gyllen"]
  },
  {
    "id": "r53",
    "title": "Cottage cheese med honning og nøtter",
    "description": "Lett frokost med protein",
    "timeMin": 3,
    "servings": 1,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Cottage cheese", "amount": "150 g" },
      { "name": "Honning", "amount": "1 ts" },
      { "name": "Nøtter", "amount": "15 g" }
    ],
    "steps": ["Bland og server"]
  },
  {
    "id": "r54",
    "title": "Grillet kyllingsandwich med avocado (lunsj)",
    "description": "Lett og smakfull",
    "timeMin": 12,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Brød", "amount": "2 skiver" },
      { "name": "Grillet kylling", "amount": "80 g" },
      { "name": "Avokado", "amount": "1/4" }
    ],
    "steps": ["Bygg sandwich og grill lett i panne"]
  },
  {
    "id": "r55",
    "title": "Müsli med kefir",
    "description": "Surt og friskt til frokost",
    "timeMin": 3,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Müsli", "amount": "50 g" },
      { "name": "Kefir", "amount": "150 ml" }
    ],
    "steps": ["Hell kefir over müsli og server"]
  },
  {
    "id": "r56",
    "title": "Søtpotet- og kikertbowl (lunsj)",
    "description": "Ovnsbakt søtpotet med kikerter",
    "timeMin": 40,
    "servings": 2,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Søtpotet", "amount": "400 g" },
      { "name": "Kikerter", "amount": "240 g" },
      { "name": "Olje", "amount": "2 ss" }
    ],
    "steps": ["Bak søtpotet i ovn, bland med ristede kikerter og server"]
  },
  {
    "id": "r57",
    "title": "Ristet rugbrød med brunost og eple",
    "description": "Norsk klassiker til frokost",
    "timeMin": 3,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Rugbrød", "amount": "2 skiver" },
      { "name": "Brunost", "amount": "2 skiver" },
      { "name": "Eple", "amount": "Noen skiver" }
    ],
    "steps": ["Rist brød, legg på brunost og epleskiver"]
  },
  {
    "id": "r58",
    "title": "Tomatsuppe med fullkornsbrød (lunsj)",
    "description": "Enkel hjemmelaget suppe",
    "timeMin": 25,
    "servings": 4,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Hermetiske tomater", "amount": "400 g" },
      { "name": "Løk (valgfri)", "amount": "1/2" },
      { "name": "Buljong", "amount": "500 ml" }
    ],
    "steps": ["Kok sammen ingredienser og kjør glatt med stavmikser"]
  },
  {
    "id": "r59",
    "title": "Cottage cheese-pannekaker",
    "description": "Lette pannekaker med cottage cheese",
    "timeMin": 15,
    "servings": 2,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Cottage cheese", "amount": "150 g" },
      { "name": "Egg", "amount": "2" },
      { "name": "Hvetemel", "amount": "2 ss" }
    ],
    "steps": ["Bland og stek til gyllen farge"]
  },
  {
    "id": "r60",
    "title": "Wrap med røkelaks og kremost (lunsj)",
    "description": "Lett og smakfull wrap",
    "timeMin": 8,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Tortilla", "amount": "1" },
      { "name": "Røkelaks", "amount": "60 g" },
      { "name": "Kremost", "amount": "1 ss" }
    ],
    "steps": ["Smør kremost på tortilla og legg på laks og salat, rull sammen"]
  },
  {
    "id": "r61",
    "title": "Havregryn med kakao og banan",
    "description": "Søt frokostvariant",
    "timeMin": 10,
    "servings": 1,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Havregryn", "amount": "50 g" },
      { "name": "Kakao", "amount": "1 ts" },
      { "name": "Banan", "amount": "1/2" }
    ],
    "steps": ["Kok havre med kakao, server med skivet banan"]
  },
  {
    "id": "r62",
    "title": "Grov wrapsalat med egg (lunsj)",
    "description": "Mettende lunsj med grove wraps",
    "timeMin": 12,
    "servings": 2,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Grove wraps", "amount": "2" },
      { "name": "Egg", "amount": "2" },
      { "name": "Salatmix", "amount": "80 g" }
    ],
    "steps": ["Kok egg, skjær og fordel i wraps med salat"]
  },
  {
    "id": "r63",
    "title": "Yoghurtparfait med muesli",
    "description": "Lagvis yoghurt og muesli",
    "timeMin": 5,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Yoghurt", "amount": "150 g" },
      { "name": "Muesli", "amount": "40 g" },
      { "name": "Honning", "amount": "1 ts" }
    ],
    "steps": ["Lag lag med yoghurt og muesli, topp med honning"]
  },
  {
    "id": "r64",
    "title": "Bønnesalat med feta (lunsj)",
    "description": "Proteinrik vegetarsalat",
    "timeMin": 10,
    "servings": 2,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Hvite bønner", "amount": "200 g" },
      { "name": "Feta", "amount": "50 g" },
      { "name": "Rødløk (valgfri)", "amount": "1/4" }
    ],
    "steps": ["Bland ingredienser og smak til med olje og sitron"]
  },
  {
    "id": "r65",
    "title": "Hjemmelaget granola til frokost",
    "description": "Sprø granola med honning",
    "timeMin": 30,
    "servings": 8,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Havregryn", "amount": "300 g" },
      { "name": "Honning", "amount": "3 ss" },
      { "name": "Nøtter", "amount": "100 g" }
    ],
    "steps": ["Bland og stek i ovn til gyllen"]
  },
  {
    "id": "r66",
    "title": "Sushi-salat (lunsj)",
    "description": "Rask salat med sushismaker",
    "timeMin": 15,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Sushiris", "amount": "1 dl" },
      { "name": "Agurk", "amount": "1/2" },
      { "name": "Laks", "amount": "50 g" }
    ],
    "steps": ["Kok ris og avkjøl, bland med grønnsaker og laks"]
  },
  {
    "id": "r67",
    "title": "Varm muesli (frokost)",
    "description": "Kokt muesli med melk",
    "timeMin": 10,
    "servings": 1,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Muesli", "amount": "60 g" },
      { "name": "Melk", "amount": "2 dl" }
    ],
    "steps": ["Kok muesli i melk raskt og server varm"]
  },
  {
    "id": "r68",
    "title": "Kikertwrap med tzatziki (lunsj)",
    "description": "Vegetarisk og smakfull",
    "timeMin": 12,
    "servings": 2,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Tortilla", "amount": "2" },
      { "name": "Kikerter", "amount": "240 g" },
      { "name": "Tzatziki", "amount": "4 ss" }
    ],
    "steps": ["Fyll tortillas med kikerter og tzatziki"]
  },
  {
    "id": "r69",
    "title": "Bananpannekaker (uten sukker)",
    "description": "Sunne pannekaker med banan",
    "timeMin": 12,
    "servings": 2,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Banan", "amount": "2" },
      { "name": "Egg", "amount": "2" },
      { "name": "Havregryn", "amount": "50 g" }
    ],
    "steps": ["Mos banan og bland med egg og havre, stek pannekaker"]
  },
  {
    "id": "r70",
    "title": "Kyllingsalatwrap (lunsj)",
    "description": "Rask lunsj i wrap-format",
    "timeMin": 10,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Tortilla", "amount": "1" },
      { "name": "Stekt kylling", "amount": "100 g" },
      { "name": "Salat", "amount": "30 g" }
    ],
    "steps": ["Fyll og rull sammen"]
  },
  {
    "id": "r71",
    "title": "Ristet havre med eple og kanel",
    "description": "Knasende frokost",
    "timeMin": 12,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Havregryn", "amount": "50 g" },
      { "name": "Eple", "amount": "1/2" },
      { "name": "Kanel", "amount": "0.5 ts" }
    ],
    "steps": ["Rist havre i panne, tilsett eple og kanel, server med melk"]
  },
  {
    "id": "r72",
    "title": "Wrap med falafel (lunsj)",
    "description": "Vegetarisk wrap med falafel",
    "timeMin": 15,
    "servings": 2,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Falafel", "amount": "6 stk" },
      { "name": "Tortilla", "amount": "2" },
      { "name": "Salat", "amount": "50 g" }
    ],
    "steps": ["Fyll wraps med falafel og salat"]
  },
  {
    "id": "r73",
    "title": "Havregrøt med kokos og bær",
    "description": "Aromatisk frokost",
    "timeMin": 12,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Havregryn", "amount": "50 g" },
      { "name": "Kokosflak", "amount": "10 g" },
      { "name": "Bær", "amount": "50 g" }
    ],
    "steps": ["Kok havre med melk, topp med kokos og bær"]
  },
  {
    "id": "r74",
    "title": "Lunsjbolle med quinoa og edamame",
    "description": "Proteinrik bolle med grønnsaker",
    "timeMin": 20,
    "servings": 2,
    "fodmap": "green",
    "ingredients": [
      { "name": "Quinoa", "amount": "1 dl" },
      { "name": "Edamame", "amount": "150 g" },
      { "name": "Salat", "amount": "50 g" }
    ],
    "steps": ["Kok quinoa og edamame, bland med salat og dressing"]
  },
  {
    "id": "r75",
    "title": "Yoghurt med chia og blåbær",
    "description": "Frisk frokost med antioksidanter",
    "timeMin": 5,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Yoghurt", "amount": "150 g" },
      { "name": "Chiafrø", "amount": "1 ss" },
      { "name": "Blåbær", "amount": "50 g" }
    ],
    "steps": ["Bland og server"]
  },
  {
    "id": "r76",
    "title": "Salat Nicoise (lunsj)",
    "description": "Klassisk fransk salat med tunfisk",
    "timeMin": 20,
    "servings": 2,
    "fodmap": "green",
    "ingredients": [
      { "name": "Tunfisk", "amount": "1 boks" },
      { "name": "Potet", "amount": "2 kokte" },
      { "name": "Egg", "amount": "2 kokte" }
    ],
    "steps": ["Bygg salaten med alle ingredienser og dressing"]
  },
  {
    "id": "r77",
    "title": "Grove vafler med syltetøy (frokost)",
    "description": "Fint å lage på helg",
    "timeMin": 25,
    "servings": 4,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Hvetemel", "amount": "150 g" },
      { "name": "Melk", "amount": "2 dl" },
      { "name": "Egg", "amount": "1" }
    ],
    "steps": ["Lag vaffelrøre og stek i vaffeljern, server med syltetøy"]
  },
  {
    "id": "r78",
    "title": "Wrap med kalkun og spinat (lunsj)",
    "description": "Lett wrap med fint fyll",
    "timeMin": 10,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Tortilla", "amount": "1" },
      { "name": "Kalkunpålegg", "amount": "70 g" },
      { "name": "Spinat", "amount": "30 g" }
    ],
    "steps": ["Fyll tortilla og rull sammen"]
  },
  {
    "id": "r79",
    "title": "Porridge med rosiner",
    "description": "Varm og søt frokost",
    "timeMin": 12,
    "servings": 1,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Havregryn", "amount": "50 g" },
      { "name": "Rosiner", "amount": "15 g" },
      { "name": "Melk", "amount": "2 dl" }
    ],
    "steps": ["Kok havre med melk, tilsett rosiner og server varm"]
  },
  {
    "id": "r80",
    "title": "Kikert- og spinatsalat (lunsj)",
    "description": "Sunnt og mettende",
    "timeMin": 10,
    "servings": 2,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Kikerter", "amount": "240 g" },
      { "name": "Spinat", "amount": "50 g" },
      { "name": "Sitron", "amount": "1 skvett" }
    ],
    "steps": ["Bland og smak til med olje og sitron"]
  },
  {
    "id": "r81",
    "title": "Smoothie med havre og jordbær",
    "description": "Frisk frokostsmoothie",
    "timeMin": 5,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Jordbær", "amount": "100 g" },
      { "name": "Havregryn", "amount": "30 g" },
      { "name": "Melk", "amount": "2 dl" }
    ],
    "steps": ["Kjør alt i blender til jevn konsistens"]
  },
  {
    "id": "r82",
    "title": "Kald pastasalat med tunfisk (lunsj)",
    "description": "Enkel matpakke",
    "timeMin": 15,
    "servings": 2,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Pasta", "amount": "150 g" },
      { "name": "Tunfisk", "amount": "1 boks" },
      { "name": "Mais", "amount": "50 g" }
    ],
    "steps": ["Kok pasta, avkjøl og bland med tunfisk og mais"]
  },
  {
    "id": "r83",
    "title": "Banan- og havresmoothie",
    "description": "Enkelt og mettende",
    "timeMin": 5,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Banan", "amount": "1" },
      { "name": "Havregryn", "amount": "30 g" },
      { "name": "Melk", "amount": "2 dl" }
    ],
    "steps": ["Kjør i blender og server umiddelbart"]
  },
  {
    "id": "r84",
    "title": "Linsepasta med tomatsaus (lunsj)",
    "description": "Proteinrik vegetarrett",
    "timeMin": 20,
    "servings": 2,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Linsepasta", "amount": "150 g" },
      { "name": "Tomatsaus", "amount": "200 g" },
      { "name": "Parmesan", "amount": "20 g" }
    ],
    "steps": ["Kok pasta og varm saus, bland og topp med parmesan"]
  },
  {
    "id": "r85",
    "title": "Havrewrap med frukt og nøtter",
    "description": "Søt frokostwrap",
    "timeMin": 5,
    "servings": 1,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Havretortilla", "amount": "1" },
      { "name": "Frukt", "amount": "100 g" },
      { "name": "Nøtter", "amount": "15 g" }
    ],
    "steps": ["Fyll og rull sammen"]
  },
  {
    "id": "r86",
    "title": "Kald quinoasalat med feta (lunsj)",
    "description": "Lett, proteinrik salat",
    "timeMin": 15,
    "servings": 2,
    "fodmap": "green",
    "ingredients": [
      { "name": "Quinoa", "amount": "1 dl" },
      { "name": "Feta", "amount": "60 g" },
      { "name": "Agurk", "amount": "1/2" }
    ],
    "steps": ["Kok quinoa, avkjøl og bland med resterende ingredienser"]
  },
  {
    "id": "r87",
    "title": "Kremet havre med pære og valnøtter",
    "description": "Luksusfrokost",
    "timeMin": 12,
    "servings": 1,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Havregryn", "amount": "50 g" },
      { "name": "Pære", "amount": "1/2" },
      { "name": "Valnøtter", "amount": "15 g" }
    ],
    "steps": ["Kok havre og rør inn pære og valnøtter før servering"]
  },
  {
    "id": "r88",
    "title": "Wrap med egg og pesto (lunsj)",
    "description": "Smaksrik og rask",
    "timeMin": 10,
    "servings": 1,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Tortilla", "amount": "1" },
      { "name": "Egg", "amount": "2" },
      { "name": "Pesto", "amount": "1 ss" }
    ],
    "steps": ["Lag egg og fyll i tortilla sammen med pesto"]
  },
  {
    "id": "r89",
    "title": "Havre- og proteinshake",
    "description": "Rask frokost før trening",
    "timeMin": 3,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Proteinpulver", "amount": "1 scoop" },
      { "name": "Havregryn", "amount": "30 g" },
      { "name": "Vann eller melk", "amount": "2 dl" }
    ],
    "steps": ["Kjør i blender eller shakertype til jevn"]
  },
  {
    "id": "r90",
    "title": "Salat med quinoa og kikerter (lunsj)",
    "description": "Næringsrik og mettende",
    "timeMin": 20,
    "servings": 2,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Quinoa", "amount": "1 dl" },
      { "name": "Kikerter", "amount": "240 g" },
      { "name": "Sitron", "amount": "1 skvett" }
    ],
    "steps": ["Kok quinoa, bland med kikerter og smak til"]
  },
  {
    "id": "r91",
    "title": "Havregrøt med blåbær og kokos",
    "description": "Smaksrik og lett frokost",
    "timeMin": 12,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Havregryn", "amount": "50 g" },
      { "name": "Blåbær", "amount": "50 g" },
      { "name": "Kokosflak", "amount": "5 g" }
    ],
    "steps": ["Kok havre og tilsett blåbær og kokos før servering"]
  },
  {
    "id": "r92",
    "title": "Sushi-ris bolle med egg (lunsj)",
    "description": "En enkel sushibolle variant",
    "timeMin": 20,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Sushiris", "amount": "1 dl" },
      { "name": "Egg", "amount": "1" },
      { "name": "Agurk", "amount": "1/4" }
    ],
    "steps": ["Kok ris, topp med kokt egg og agurk"]
  },
  {
    "id": "r93",
    "title": "Bakt eple med kanel (frokost)",
    "description": "Varm og søt frokost",
    "timeMin": 25,
    "servings": 2,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Epler", "amount": "2" },
      { "name": "Kanel", "amount": "1 ts" },
      { "name": "Honning", "amount": "1 ss" }
    ],
    "steps": ["Bak eplene i ovn med kanel og honning til møre"]
  },
  {
    "id": "r94",
    "title": "Salat med grillet grønnsaker (lunsj)",
    "description": "Sommerlig og fargerik salat",
    "timeMin": 25,
    "servings": 2,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Aubergine", "amount": "1/2" },
      { "name": "Paprika", "amount": "1" },
      { "name": "Squash", "amount": "1/2" }
    ],
    "steps": ["Grill grønnsaker, kutt og bland med salat og dressing"]
  },
  {
    "id": "r95",
    "title": "Havregryn med nøttesmør",
    "description": "Kremet frokost med smak av nøtter",
    "timeMin": 8,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Havregryn", "amount": "50 g" },
      { "name": "Nøttesmør", "amount": "1 ss" },
      { "name": "Melk", "amount": "1.5 dl" }
    ],
    "steps": ["Kok havre og rør inn nøttesmør før servering"]
  },
  {
    "id": "r96",
    "title": "Linsesalat med feta (lunsj)",
    "description": "Proteindrevet lunsj",
    "timeMin": 20,
    "servings": 2,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Kokte linser", "amount": "200 g" },
      { "name": "Feta", "amount": "50 g" },
      { "name": "Persille", "amount": "1 ss" }
    ],
    "steps": ["Bland linser og feta, smak til med olje og urter"]
  },
  {
    "id": "r97",
    "title": "Scones med ost (frokost)",
    "description": "Hjemmelaget scones til frokost",
    "timeMin": 30,
    "servings": 6,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Mel", "amount": "300 g" },
      { "name": "Smør", "amount": "75 g" },
      { "name": "Ost", "amount": "50 g" }
    ],
    "steps": ["Lag deig, form scones og stek til gyllne"]
  },
  {
    "id": "r98",
    "title": "Kyllingsalat med mango (lunsj)",
    "description": "Søt og frisk salat",
    "timeMin": 15,
    "servings": 2,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Kylling", "amount": "150 g" },
      { "name": "Mango", "amount": "1/2" },
      { "name": "Salat", "amount": "50 g" }
    ],
    "steps": ["Skjær og bland alle ingredienser, smak til"]
  },
  {
    "id": "r99",
    "title": "Havregrøt med peanøtt og banan",
    "description": "Søt og mettende frokost",
    "timeMin": 12,
    "servings": 1,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Havregryn", "amount": "50 g" },
      { "name": "Peanøttsmør", "amount": "1 ss" },
      { "name": "Banan", "amount": "1/2" }
    ],
    "steps": ["Kok havre og rør inn peanøttsmør, topp med banan"]
  },
  {
    "id": "r100",
    "title": "Linsesalatwrap (lunsj)",
    "description": "Wrap med linsesalat",
    "timeMin": 15,
    "servings": 2,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Tortilla", "amount": "2" },
      { "name": "Kokte linser", "amount": "200 g" },
      { "name": "Salat", "amount": "50 g" }
    ],
    "steps": ["Lag linsesalat og fyll wraps"]
  },
  {
    "id": "r101",
    "title": "Havregrøt med kanel og rosiner",
    "description": "Klassisk smakssettning",
    "timeMin": 12,
    "servings": 1,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Havregryn", "amount": "50 g" },
      { "name": "Kanel", "amount": "0.5 ts" },
      { "name": "Rosiner", "amount": "15 g" }
    ],
    "steps": ["Kok havre med vann, tilsett rosiner og kanel"]
  },
  {
    "id": "r102",
    "title": "Wrap med eggesalat og ruccola (lunsj)",
    "description": "Smakfull eggesalatwrap",
    "timeMin": 10,
    "servings": 2,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Tortilla", "amount": "2" },
      { "name": "Egg", "amount": "3 kokte" },
      { "name": "Ruccola", "amount": "40 g" }
    ],
    "steps": ["Lag eggesalat og fyll wraps"]
  },
  {
    "id": "r103",
    "title": "Yoghurt med müsli og kiwi",
    "description": "Frisk frokost med frukt",
    "timeMin": 5,
    "servings": 1,
    "fodmap": "green",
    "ingredients": [
      { "name": "Yoghurt", "amount": "150 g" },
      { "name": "Müsli", "amount": "40 g" },
      { "name": "Kiwi", "amount": "1/2" }
    ],
    "steps": ["Bland og server kald"]
  },
  {
    "id": "r104",
    "title": "Lun kornsalat med egg (lunsj)",
    "description": "Varm/kalde kombinasjon",
    "timeMin": 20,
    "servings": 2,
    "fodmap": "yellow",
    "ingredients": [
      { "name": "Bygg eller speltkorn", "amount": "1 dl" },
      { "name": "Egg", "amount": "2 kokte" },
      { "name": "Grønnsaker", "amount": "100 g" }
    ],
    "steps": ["Kok korn, bland med grønnsaker og halve egg, server lun eller kald"]
  }
];
