import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { showError } from "src/utils/notifications";
import { PageAuth } from "src/utils/types";
import urls from "src/utils/urls";
import PageLoadingIndicator from "./PageLoadingIndicator";

interface Props {
  pageAuth: PageAuth | undefined;
  children: React.ReactChild;
}

function Auth({ pageAuth, children }: Props) {
  const router = useRouter();
  const [session, isLoading] = useSession();
  const user = session?.user;

  useEffect(() => {
    if (!pageAuth || !pageAuth.requireSession || isLoading) return;

    if (
      !user ||
      (pageAuth.roles &&
        !pageAuth.roles.some((role) => user.roles.includes(role)))
    ) {
      router.replace(urls.pages.login).catch((e) => {
        const error = e as Error;
        showError(error.message);
      });
    }
  }, [pageAuth, user, isLoading, router]);

  if (pageAuth && pageAuth.requireSession && isLoading) {
    return <PageLoadingIndicator />;
  }

  return <>{children}</>;
}

export default Auth;
