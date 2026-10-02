import { redirect } from "next/navigation";

export default function Home() {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    redirect("/login");
  }
  return (
    <div>
      <h1>Home</h1>

    </div>
  );
}
