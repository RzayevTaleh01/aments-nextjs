import MyAccountPage from "@/components/pages/MyAccountPage/MyAccountPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const metadata = {
  title: "My Account",
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  const isAuthenticated = Boolean(session?.token?.accessToken);

  if (!isAuthenticated) {
    redirect(`/login?callbackUrl=${encodeURIComponent("/my-account")}`);
  }

  return (
    <div>
      <MyAccountPage />
    </div>
  );
}
