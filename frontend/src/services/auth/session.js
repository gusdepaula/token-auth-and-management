import { useRouter } from "next/router";
import React from "react";
import { authService } from "./authService";

export function withSession(fn) {
  return async (ctx) => {
    try {
      const session = await authService.getSession(ctx);
      const modifiedCtx = {
        ...ctx,
        req: {
          ...ctx.req,
          session: {
            name: "Nome do usuário",
          },
        },
      };
      return fn(modifiedCtx);
    } catch (err) {
      return {
        redirect: {
          permament: false,
          destination: "/?error=401",
        },
      };
    }
  };
}

export function useSession() {
  const [session, setSession] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    authService
      .getSession()
      .then((userSession) => {
        setSession(userSession);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    data: {
      session,
    },
    error,
    loading,
  };
}

export function withSessionHOC(Component) {
  return function Wrapper(props) {
    const session = useSession();
    const router = useRouter();
    if (session.loading && session.error) {
      console.log("redireciona o usuário para home");
      router.push("/?error=401");
    }
    const modifiedProps = {
      ...props,
      session: session.data,
    };
    return <Component {...modifiedProps} />;
  };
}
