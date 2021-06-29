import { Button } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/client";

export default function Page() {
  const [session, loading] = useSession();

  return (
    <>
      {!session && (
        <>
          Not signed in
          <Button onClick={() => signIn()}>Sign in</Button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email}
          <Button onClick={() => signOut()}>Sign out</Button>
        </>
      )}
    </>
  );
}
