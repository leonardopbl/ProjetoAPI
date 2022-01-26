import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import path from 'path';
import UsuariosRepository from '../typeorm/repositories/UsuariosRepository';
import UsuarioTokensRepository from '../typeorm/repositories/UsuarioTokensRepository';
import EtherealMail from '@config/mail/EtherealMail';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usuariosRepository = getCustomRepository(UsuariosRepository);
    const usuarioTokenRepository = getCustomRepository(UsuarioTokensRepository);

    const usuario = await usuariosRepository.findByEmail(email);

    if (!usuario) {
      throw new AppError('Email não encontrado.');
    }

    const { token } = await usuarioTokenRepository.generate(usuario.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await EtherealMail.sendMail({
      to: {
        name: usuario.nome,
        email: usuario.email,
      },
      subject: '[GRUPO ETHEC] Recuperação de Senha',
      templateData: {
        file: forgotPasswordTemplate,
        variaveis: {
          name: usuario.nome,
          link: `http://localhost:3333/reset_password?token=${token}`,
          //          link2: `http://localhost:3000/`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
