import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex h-[80vh] w-screen items-center justify-center">
      <SignIn signUpUrl="/sign-up" redirectUrl={"/start"} />
    </div>
  );
}
