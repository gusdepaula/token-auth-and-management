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
                        name: 'Nome do usuário'
                    }
                }
            };
            return fn(modifiedCtx);
        } catch (err) {
            return {
                redirect: {
                    permament: false,
                    destination: '/?error=401'
                }
            }
        }    
    }
}