import { auth } from "../_libs/auth";

async function Page() {
  const session = await auth();
  return (
    <div>
      <h1>Welcome {session.user?.name} 👋</h1>
    </div>
  );
}

export default Page;
