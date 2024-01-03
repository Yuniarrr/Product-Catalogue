import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllCategories() {
  try {
    return await prisma.categories.findMany();
  } catch (error) {
    console.error('Error fetching categories in CategoriesService:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Error fetching categories');
  }
}

export async function deleteCategoryById(id: number) {
  try {
    const isProductExist = await getCategoryById(id);

    if (!isProductExist) {
      throw new Error('Category not found');
    }

    return await prisma.categories.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error('Error deleting category in CategoriesService:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Error deleting category');
  }
}

export async function getCategoryById(id: number) {
  try {
    return await prisma.categories.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error('Error fetching category in CategoriesService:', error);
    throw new Error('Category not found');
  }
}

export async function createCategory(name: string) {
  try {
    return await prisma.categories.create({
      data: {
        name: name,
      },
    });
  } catch (error) {
    console.error('Error creating category in CategoriesService:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Error creating category');
  }
}

export async function updateCategoryById(id: number, name: string) {
  try {
    const isProductExist = await getCategoryById(id);

    if (!isProductExist) {
      throw new Error('Category not found');
    }

    return await prisma.categories.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
  } catch (error) {
    console.error('Error updating category in CategoriesService:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Error updating category');
  }
}
