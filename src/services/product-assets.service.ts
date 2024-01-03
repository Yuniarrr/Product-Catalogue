import { PrismaClient } from '@prisma/client';
import CreateProductAssetDto from '../dto/create-product-asset.dto';
import UpdateProductAssetDto from '../dto/update-product-asset.dto';
const prisma = new PrismaClient();

export async function getAllProductAssets() {
  try {
    return await prisma.product_assets.findMany();
  } catch (error) {
    console.error(
      'Error fetching product-assets in ProductAssetsService:',
      error
    );
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Error fetching product-assets');
  }
}

export async function deleteProductAssetById(id: number) {
  try {
    const isProductAssetExist = await getProductAssetById(id);

    if (!isProductAssetExist) {
      throw new Error('product-assets not found');
    }

    return await prisma.product_assets.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error(
      'Error deleting product-assets in ProductAssetsService:',
      error
    );
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Error deleting product-assets');
  }
}

export async function getProductAssetById(id: number) {
  try {
    return await prisma.product_assets.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error(
      'Error fetching product-assets in ProductAssetsService:',
      error
    );
    throw new Error('product-assets not found');
  }
}

export async function createProductAsset(data: CreateProductAssetDto) {
  try {
    const isProductExist = await findProductById(data.product_id);

    if (!isProductExist) {
      throw new Error('Product not found');
    }

    return await prisma.product_assets.create({
      data: {
        image: data.image,
        product_id: data.product_id,
      },
    });
  } catch (error) {
    console.error(
      'Error creating product-assets in ProductAssetsService:',
      error
    );
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Error creating product-assets');
  }
}

export async function updateProductAssetById(
  id: number,
  data: UpdateProductAssetDto
) {
  try {
    const isProductAssetExist = await getProductAssetById(id);

    if (!isProductAssetExist) {
      throw new Error('product-assets not found');
    }

    if (data.product_id) {
      const isProductExist = await findProductById(data.product_id);

      if (!isProductExist) {
        throw new Error('Product not found');
      }
    }

    return await prisma.product_assets.update({
      where: {
        id: id,
      },
      data: {
        image: data.image,
        product_id: data.product_id,
      },
    });
  } catch (error) {
    console.error(
      'Error updating product-assets in ProductAssetsService:',
      error
    );
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Error updating product-assets');
  }
}

function findProductById(id: number) {
  return prisma.products.findUnique({
    where: {
      id: id,
    },
  });
}
