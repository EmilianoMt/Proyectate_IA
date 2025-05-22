import Header from "@/components/Home/Header";
import { getUserNameFromCookie } from "./action";
import HomeClient from "@/components/Home/HomeCLient";

export default async function Home() {
  const userName = await getUserNameFromCookie();

  return (
    <>
      <Header userName={userName ?? "Invitado"} />
      <HomeClient userName={userName ?? "Invitado"} />
    </>
  );
}