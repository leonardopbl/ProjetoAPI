import { Router } from 'express';
import produtosRouter from '@modules/produtos/routes/produtos.routes';
import usuariosRouter from '@modules/usuarios/routes/usuarios.routes';
import sessionsRouter from '@modules/usuarios/routes/sessions.routes';
import isAuthenticated from '@shared/http/middleware/isAuthenticated';
import passwordRouter from '@modules/usuarios/routes/password.routes';
import perfilRouter from '@modules/usuarios/routes/perfil.routes';
import clienteRouter from '@modules/clientes/routes/clientes.routes';
import clienteJuridicoRouter from '@modules/clientes/routes/clientesjuridicos.routes';
import vendasRouter from '@modules/venda/routes/vendas.routes';

const routes = Router();

routes.use('/produtos', isAuthenticated, produtosRouter);
routes.use('/usuarios', usuariosRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/perfil', isAuthenticated, perfilRouter);
routes.use('/clientes', isAuthenticated, clienteRouter);
routes.use('/juridicos', isAuthenticated, clienteJuridicoRouter);
routes.use('/vendas', isAuthenticated, vendasRouter);

export default routes;
