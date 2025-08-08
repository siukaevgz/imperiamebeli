import {
  category,
  categoryChild,
  categoryChildChild,
  productPhoto,
  products,
  story,
  storyItem,
} from "./constants";
import prisma from "./prisma-client";

async function up() {
  await prisma.category.createMany({
    data: category,
  });

  await prisma.categoryChild.createMany({
    data: categoryChild,
  });

  await prisma.categoryChildChild.createMany({
    data: categoryChildChild,
  });

  await prisma.product.createMany({
    data: products,
  });

  await prisma.productPhoto.createMany({
    data: productPhoto,
  });

  await prisma.story.createMany({
    data: story,
  });

  await prisma.storyItem.createMany({
    data: storyItem,
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CategoryChild" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CategoryChildChild" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductPhoto" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "StoryItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.error(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
