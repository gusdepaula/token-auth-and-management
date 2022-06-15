import { HttpClient } from "../../infra/HttpClient/HttpClient";
import { tokenService } from "./tokenService";

export const authService = {
    async login ({username, password}) {
        return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login` , {
            method: 'POST',
            body: { username, password }
        })
        .then(async (res) => {
            if(!res.ok) throw new Error('Usuário ou senha inválidos')
            const body = await res.body;
            
            tokenService.save(body.data.access_token);
        })
    },
    async getSession(ctx) {
        const token = tokenService.get(ctx);

        return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/session` , {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => {
            if(!res.ok) throw new Error('Não autorizado');
            return res.body.data;
        });
    }
}