import { currentUser } from '@clerk/nextjs'
import db from '@/lib/db.js'

export async function GET() {
  const user = await currentUser();
  const wallets = db.fetchWallets(user.id);
  return wallets;
}
