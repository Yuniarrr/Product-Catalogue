import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import CreateProductDto from '../dto/create-product.dto';
import UpdateProductDto from '../dto/update-product.dto';
import { createSlug } from '../utlis/utlis';

export async function getAllProducts() {
  try {
    return await prisma.products.findMany();
  } catch (error) {
    console.error('Error fetching products in ProductService:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Error fetching products');
  }
}

export async function getAllProductsWithDetail() {
  try {
    return await prisma.products.findMany({
      include: {
        Categories: true,
        Product_assets: true,
      },
    });
  } catch (error) {
    console.error('Error fetching products in ProductService:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Error fetching products');
  }
}

export async function getAllProductsWithDetailAndOrder() {
  try {
    return await prisma.products.findMany({
      include: {
        Categories: true,
        Product_assets: true,
      },
      orderBy: {
        price: 'asc',
      },
    });
  } catch (error) {
    console.error('Error fetching products in ProductService:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Error fetching products');
  }
}

export async function deleteProductById(id: number) {
  try {
    const isProductExist = await getProductById(id);

    if (!isProductExist) {
      throw new Error('Product not found');
    }

    return await prisma.products.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error('Error deleting products in ProductService:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Error deleting products');
  }
}

export async function getProductById(id: number) {
  try {
    return await prisma.products.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error('Error fetching products in ProductService:', error);
    throw new Error('Product not found');
  }
}

export async function createProduct(data: CreateProductDto) {
  try {
    const isCategoryExist = await findCategoryById(data.category_id);

    if (!isCategoryExist) {
      throw new Error('Category not found');
    }

    const slug = createSlug(data.name);

    return await prisma.products.create({
      data: {
        name: data.name,
        slug: slug,
        price: data.price,
        category_id: data.category_id,
      },
    });
  } catch (error) {
    console.error('Error creating products in ProductService:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Error creating products');
  }
}

export async function updateProductById(id: number, data: UpdateProductDto) {
  try {
    const isProductExist = await getProductById(id);

    if (!isProductExist) {
      throw new Error('Product not found');
    }

    if (data.category_id) {
      const isCategoryExist = await findCategoryById(data.category_id);

      if (!isCategoryExist) {
        throw new Error('Category not found');
      }
    }

    if (data.name) {
      data.slug = createSlug(data.name);
    }

    return await prisma.products.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });
  } catch (error) {
    console.error('Error updating products in ProductService:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Error updating products');
  }
}

function findCategoryById(id: number) {
  return prisma.categories.findUnique({
    where: {
      id: id,
    },
  });
}
