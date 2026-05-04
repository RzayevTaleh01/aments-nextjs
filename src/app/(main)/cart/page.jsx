import CartPage from "@/components/pages/CartPage/CartPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const metadata = {
  title: "Cart",
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  const isAuthenticated = Boolean(session?.token?.accessToken);
  if (!isAuthenticated) {
    redirect(`/login?callbackUrl=${encodeURIComponent("/cart")}`);
  }
  return <CartPage />;
}
