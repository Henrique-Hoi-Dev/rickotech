import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';
import Adress from '../models/Adress';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      cpf: Yup.string(),
      data_nacimento: Yup.string(),
      cargo: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }
    // fazendo verificação email
    const userExist = await User.findOne({ where: { email: req.body.email } });

    if (userExist) {
      return res
        .status(400)
        .json({ error: 'Esse email de usuário já existe.' });
    }

    const users = await User.create(req.body);

    return res.json(users);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(8)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExist = await User.findOne({ where: { email } });

      if (userExist) {
        return res
          .status(400)
          .json({ error: 'Esse email de usuário já existe.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha não corresponde' });
    }

    await user.update(req.body);

    const {
      id,
      name,
      avatar,
      cargo,
      data_nacimento,
      cpf,
    } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      name,
      email,
      avatar,
      cargo,
      data_nacimento,
      cpf,
    });
  }
  async getAll(req, res) {
    const users = await User.findAll({
      attributes: [ 
        'name', 
        'email', 
        'provider', 
        'cargo', 
        'cpf', 
        'avatar_id', 
        'data_nascimento' 
      ],
      include: [
      {
        model: File,
        as: 'avatar',
        attributes:  [ 'id', 'path', 'url' ],
      },
      {
        model: Adress,
        as: 'adress',
        attributes:  [ 
          'cep', 
          'logradouro', 
          'complemento',
          'numero',
          'bairro',
          'cidade',
          'uf', 
        ],
      }
    ],  
    });
    return res.status(200).json(users);
  }
  catch(error) {
    return res.status(400).json(error);
  }
}
export default new UserController();
