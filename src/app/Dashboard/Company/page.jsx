import { headers } from "next/headers";
// import { auth } from "@/lib/auth";
import CompanyProfile from "./CompanyProfile";
import { auth } from "@/app/lib/auth";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div>
      <CompanyProfile session={session} />
    </div>
  );
};

export default Page;