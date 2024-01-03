import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding Product Catalogue');
  try {
    await prisma.product_assets.deleteMany();
    await prisma.products.deleteMany();
    await prisma.categories.deleteMany();

    await prisma.categories.createMany({
      data: [
        {
          name: 'Elektronik',
        },
        {
          name: 'Fashion Pria',
        },
        {
          name: 'Fashion Wanita',
        },
        {
          name: 'Handphone & Tablet',
        },
        {
          name: 'Olahraga',
        },
      ],
    });

    await prisma.products.createMany({
      data: [
        {
          name: 'Logitech H111 Headset Stereo Single Jack 3.5mm',
          price: 80000,
          slug: 'logitech-h111-headset-stereo-single-jack-3-5mm',
          category_id: 1,
        },
        {
          name: 'Philips Rice Cooker - Inner Pot 2L Bakuhanseki - HD3110/33',
          slug: 'philips-rice-cooker -inner-pot-2l-bakuhanseki-hd3110-33',
          price: 249000,
          category_id: 1,
        },
        {
          name: 'Iphone 12 64Gb/128Gb/256Gb Garansi Resmi IBOX/TAM - Hitam, 64Gb',
          slug: 'iphone-12-64gb-128gb-256gb-garansi-resmi-ibox-tam-hitam-64gb',
          price: 11340000,
          category_id: 4,
        },
        {
          name: 'Papan alat bantu Push Up Rack Board Fitness Workout Gym',
          slug: 'papan-alat-bantu-push-up-rack-board-fitness-workout-gym',
          price: 90000,
          category_id: 5,
        },
        {
          name: 'Jim Joker - Sandal Slide Kulit Pria Bold 2S Hitam - Hitam',
          slug: 'jim-joker-sandal-slide-kulit-pria-bold-2s-hitam-hitam',
          price: 305000,
          category_id: 2,
        },
      ],
    });

    await prisma.product_assets.createMany({
      data: [
        {
          image: 'logitech-h111.png',
          product_id: 1,
        },
        {
          image: 'logitech-h111-headset-stereo-single-jack-3-5mm.png',
          product_id: 1,
        },
        {
          image: 'philips-rice-cooker-inner-pot-2l-bakuhanseki-hd3110-33.png',
          product_id: 2,
        },
        {
          image: 'philips.png',
          product_id: 2,
        },
        {
          image: 'philips-rice-cooker.png',
          product_id: 2,
        },
        {
          image: 'iphone-12-64gb-128gb-256gb.png',
          product_id: 3,
        },
        {
          image: 'papan-alat-bantu-push-up.png',
          product_id: 4,
        },
        {
          image: 'jim-joker-sandal-slide-kulit-pria-bold-2s-hitam-hitam.png',
          product_id: 5,
        },
      ],
    });
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    // console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
