import HomePage from "@/components/pages/HomePage";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Home",
};

export default async function Page() {
  return <HomePage />;
}
