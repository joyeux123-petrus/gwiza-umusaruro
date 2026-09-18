const { PrismaClient } = require('@prisma/client');
const seedPrisma = new PrismaClient();

async function main() {
  // Create Admin User
  await seedPrisma.user.upsert({
    where: { email: 'admin@gwiza.rw' },
    update: {},
    create: {
      email: 'admin@gwiza.rw',
      name: 'Gwiza Admin',
      password: 'adminpassword123', // In real app, this MUST be hashed
      role: 'ADMIN',
    },
  });

  // Categories
  const catLivestock = await seedPrisma.category.upsert({
    where: { slug: 'veterinary' },
    update: { nameEn: "Medicine", nameRw: "Imiti" },
    create: {
      nameRw: "Imiti",
      nameEn: "Medicine",
      slug: 'veterinary',
      description: 'Veterinary medicines and animal care products.',
    },
  });

  const catSeeds = await seedPrisma.category.upsert({
    where: { slug: 'seeds' },
    update: { nameEn: "Seeds", nameRw: "Imbuto" },
    create: {
      nameRw: "Imbuto",
      nameEn: "Seeds",
      slug: 'seeds',
      description: 'High quality seeds for farming.',
    },
  });

  const catCropProtection = await seedPrisma.category.upsert({
    where: { slug: 'crop-protection' },
    update: { nameEn: "Crop Protection", nameRw: "Kurinda Imyaka" },
    create: {
      nameRw: "Kurinda Imyaka",
      nameEn: "Crop Protection",
      slug: 'crop-protection',
      description: 'Insecticides, fungicides and more.',
    },
  });

  const catFertilizers = await seedPrisma.category.upsert({
    where: { slug: 'fertilizers' },
    update: { nameEn: "Fertilizers & Soil Inputs", nameRw: "Inyongeramusaruro" },
    create: {
      nameRw: "Inyongeramusaruro",
      nameEn: "Fertilizers & Soil Inputs",
      slug: 'fertilizers',
      description: 'Soil nutrients and fertilizers.',
    },
  });

  const products = [
    // LIVESTOCK
    { nameEn: "Wormicid Liquid", categoryId: catLivestock.id, subCategoryEn: "Veterinary Medicines & Supplements", subCategoryRw: "Imiti n'inyongeramusaruro by'amatungo", animalType: "Livestock", image: "/images/products/wormicid-liquid.jpg" },
    { nameEn: "Multivit Bolus", categoryId: catLivestock.id, subCategoryEn: "Veterinary Medicines & Supplements", subCategoryRw: "Imiti n'inyongeramusaruro by'amatungo", animalType: "Livestock", image: "/images/products/multivit-bolus.jpg" },
    { nameEn: "Pig Booster", categoryId: catLivestock.id, subCategoryEn: "Veterinary Medicines & Supplements", subCategoryRw: "Imiti n'inyongeramusaruro by'amatungo", animalType: "Pig" },
    { nameEn: "Fer Forte 200", categoryId: catLivestock.id, subCategoryEn: "Veterinary Medicines & Supplements", subCategoryRw: "Imiti n'inyongeramusaruro by'amatungo", animalType: "Livestock" },
    { nameEn: "Enrosol-S", categoryId: catLivestock.id, subCategoryEn: "Veterinary Medicines & Supplements", subCategoryRw: "Imiti n'inyongeramusaruro by'amatungo", animalType: "Livestock" },
    { nameEn: "Lactomas Forte", categoryId: catLivestock.id, subCategoryEn: "Veterinary Medicines & Supplements", subCategoryRw: "Imiti n'inyongeramusaruro by'amatungo", animalType: "Livestock" },

    // FERTILIZERS
    { nameEn: "Coda Humus PK", categoryId: catFertilizers.id, subCategoryEn: "Fertilizers & Soil Inputs", subCategoryRw: "Inyongeramusaruro" },
    { nameEn: "Easy Gro", categoryId: catFertilizers.id, subCategoryEn: "Fertilizers & Soil Inputs", subCategoryRw: "Inyongeramusaruro", image: "/images/products/easy-gro.jpg" },
    { nameEn: "Pro-Dust", categoryId: catFertilizers.id, subCategoryEn: "Fertilizers & Soil Inputs", subCategoryRw: "Inyongeramusaruro" },

    // SEEDS
    { nameEn: "Carrots Orion", categoryId: catSeeds.id, subCategoryEn: "Carrot Seeds", subCategoryRw: "Imbuto z'amashu (Carrots)", productType: "Seed" },
    { nameEn: "Carrots Nantes", categoryId: catSeeds.id, subCategoryEn: "Carrot Seeds", subCategoryRw: "Imbuto z'amashu (Carrots)", productType: "Seed", image: "/images/products/carrots-nantes.jpg" },
    { nameEn: "Carrots Amazonia", categoryId: catSeeds.id, subCategoryEn: "Carrot Seeds", subCategoryRw: "Imbuto z'amashu (Carrots)", productType: "Seed" },
    { nameEn: "Celery Tall Utah", categoryId: catSeeds.id, subCategoryEn: "Celery Seeds", subCategoryRw: "Imbuto za Celery", productType: "Seed", image: "/images/products/celery-tall-utah.jpg" },
    { nameEn: "Celery Holland", categoryId: catSeeds.id, subCategoryEn: "Celery Seeds", subCategoryRw: "Imbuto za Celery", productType: "Seed" },
    { nameEn: "Onion Bombay Red", categoryId: catSeeds.id, subCategoryEn: "Onion Seeds", subCategoryRw: "Imbuto z'ibitunguru", productType: "Seed", image: "/images/products/onion-bombay-red.jpg" },
    { nameEn: "Seminis Amashu", categoryId: catSeeds.id, subCategoryEn: "Vegetable Seeds", subCategoryRw: "Imbuto z'imboga", productType: "Seed" },
    { nameEn: "Cabbage Copenhagen", categoryId: catSeeds.id, subCategoryEn: "Vegetable Seeds", subCategoryRw: "Imbuto z'imboga", productType: "Seed", image: "/images/products/cabbage-copenhagen.jpg" },

    // PEST CONTROL
    { nameEn: "Dudu Killer", categoryId: catCropProtection.id, subCategoryEn: "Insecticides & Pest Control", subCategoryRw: "Imiti yica udukoko", image: "/images/products/dudu-killer.jpg" },
    { nameEn: "Rocket", categoryId: catCropProtection.id, subCategoryEn: "Insecticides & Pest Control", subCategoryRw: "Imiti yica udukoko", image: "/images/products/rocket.jpg" },
    { nameEn: "Rozwali", categoryId: catCropProtection.id, subCategoryEn: "Insecticides & Pest Control", subCategoryRw: "Imiti yica udukoko" },
    { nameEn: "Profex Super", categoryId: catCropProtection.id, subCategoryEn: "Insecticides & Pest Control", subCategoryRw: "Imiti yica udukoko" },
    { nameEn: "Safari Zeb", categoryId: catCropProtection.id, subCategoryEn: "Insecticides & Pest Control", subCategoryRw: "Imiti yica udukoko" },
    { nameEn: "Warrior WP 250g", categoryId: catCropProtection.id, subCategoryEn: "Insecticides & Pest Control", subCategoryRw: "Imiti yica udukoko", variant: "250g", image: "/images/products/warrior.png" },
    { nameEn: "Warrior WP 100g", categoryId: catCropProtection.id, subCategoryEn: "Insecticides & Pest Control", subCategoryRw: "Imiti yica udukoko", variant: "100g", image: "/images/products/warrior.png" },
    { nameEn: "Cyper Force", categoryId: catCropProtection.id, subCategoryEn: "Insecticides & Pest Control", subCategoryRw: "Imiti yica udukoko" },

    // FUNGICIDES
    { nameEn: "Carbendazim 50% SC", categoryId: catCropProtection.id, subCategoryEn: "Fungicides", subCategoryRw: "Imiti yica uduhuvyi" },
    { nameEn: "Indofil M-45", categoryId: catCropProtection.id, subCategoryEn: "Fungicides", subCategoryRw: "Imiti yica uduhuvyi", image: "/images/products/indofil-m-45.jpg" },
    { nameEn: "Thiop", categoryId: catCropProtection.id, subCategoryEn: "Fungicides", subCategoryRw: "Imiti yica uduhuvyi" },

    // ADJUVANTS
    { nameEn: "Ecopoxy", categoryId: catCropProtection.id, subCategoryEn: "Adjuvants & Agricultural Support", subCategoryRw: "Ibindi bikoreshwa mu buhinzi" },
    { nameEn: "Ramsurf", categoryId: catCropProtection.id, subCategoryEn: "Adjuvants & Agricultural Support", subCategoryRw: "Ibindi bikoreshwa mu buhinzi" },
  ];

  for (const p of products) {
    const slug = p.nameEn.toLowerCase().replace(/ /g, '-').replace(/%/g, '');
    await seedPrisma.product.upsert({
      where: { slug: slug },
      update: {
        ...p,
        nameRw: p.nameEn,
      },
      create: {
        ...p,
        nameRw: p.nameEn,
        slug: slug,
        descriptionEn: `High quality ${p.nameEn} for your farming needs.`,
        descriptionRw: `${p.nameEn} nziza ku musaruro wawe.`,
        availability: 'AVAILABLE',
      }
    });
  }

  // Create Business Info Singleton
  await seedPrisma.businessInfo.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      phone: '0793408967',
      whatsapp: '0793408967',
      email: 'shemubruno98@gmail.com',
      address: 'Kamonyi, Mugina',
      mapsUrl: 'https://maps.app.goo.gl/Q2SHnrAYw94Yrrb18',
      openingHours: 'Mon-Sat: 8:00 AM - 6:00 PM',
      descriptionRw: 'Turagufasha kongera umusaruro.',
      descriptionEn: 'Helping you grow your productivity.',
    },
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await seedPrisma.$disconnect();
  });
