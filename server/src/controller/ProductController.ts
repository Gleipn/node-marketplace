import { prisma } from "./../database/prisma";
import { Request, Response } from "express";

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, amount } = req.body;
  const { storeId } = req.params;

  const Product = await prisma.product.create({
    data: {
      name,
      price,
      amount,
      Store: {
        connect: {
          id: storeId,
        },
      },
    },
  });

  return res.json(Product);
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, amount } = req.body;
    const { productId } = req.params;
    const { id } = req.user;

    const isProduct = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        Store: true,
      },
    });

    if (!isProduct) {
      return res.status(400).json({ message: "Produto não encontrado" });
    }

    if (id !== isProduct?.Store?.userId) {
      return res
        .status(400)
        .json({ message: "Este produto não pertence a esse usuário" });
    }

    const Product = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        price,
        amount,
      },
    });

    return res.status(200).json(Product);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  const Products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      amount: true,
      Store: {
        select: {
          name: true,
        },
      },
    },
  });

  return res.json(Products);
};

export const getUniqueProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      select: {
        id: true,
        name: true,
        price: true,
        amount: true,
      },
    });

    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { id } = req.user;

    const isProduct = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        Store: true,
      },
    });

    if (!isProduct) {
      return res.status(400).json({ message: "Produto não encontrado" });
    }

    if (id !== isProduct?.Store?.userId) {
      return res
        .status(400)
        .json({ message: "Este produto não pertence a esse usuário" });
    }

    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return res.status(204).json({message: "Produto deletado com sucesso!"});
  } catch (error) {
    return res.status(400).json(error);
  }
};
