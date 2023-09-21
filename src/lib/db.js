import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class Database {

  static async createUser(id, email) {
    const user = await prisma.user.create({
      data: {
        id: id,
        email: email
      }
    })
    return user;
  }

  static async deleteUser(id) {
    const deletedWallets = await prisma.userWallet.deleteMany({
      where: {
        userId: id
      }
    })
    console.log(deletedWallets);

    const deletedUser = await prisma.user.delete({
      where: {
        id: id
      }
    })

    return deletedUser;
  }

  static async addWallet(wallet, id) {

    let existingWallet = await prisma.wallet.findUnique({
      where: {
        address: wallet
      }
    })

    if (!existingWallet) {
      existingWallet = await prisma.wallet.create({
        data: {
          address: wallet
        }
      })
    }

    const addedWallet = await prisma.userWallet.create({
      data: {
        userId: id,
        walletId: existingWallet.id
      }
    })

    return addedWallet;
  }

  static async removeWallet(wallet, id) {

    const walletData = await prisma.wallet.findUnique({
      where: {
        address: wallet
      }
    })

    const deletedWallet = await prisma.userWallet.delete({
      where: {
        userId: id,
        walletId: walletData.id
      }
    })

    return deletedWallet;
  }
}