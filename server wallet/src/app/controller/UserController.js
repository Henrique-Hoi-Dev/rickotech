import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      cpf: Yup.string(),
      data_nascimento: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }
    // fazendo verificação email
    const userExist = await User.findOne({ where: { email: req.body.email } });

    if (userExist) {
      return res.status(400).json({ error: 'This user email already exists' });
    }

    const { id, name, email, cpf, data_nascimento } = await User.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      cpf,
      data_nascimento,
    });
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
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExist = await User.findOne({ where: { email } });

      if (userExist) {
        return res
          .status(400)
          .json({ error: 'This user email already exists' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    await user.update(req.body);
    const { id, name, avatar } = await User.findByPk(req.userId, {
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
    });
  }

  async getAllUser(req, res) {
    try {
      let user = await User.findAll({
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        ],
      });

      const valid = user.filter(function (result) {
        return result.dataValues;
      });

      const data = valid.map(function (result) {
        const dataNascimento = result.dataValues.data_nascimento;
        var hoje = new Date();

        return Math.floor(
          Math.ceil(
            Math.abs(dataNascimento.getTime() - hoje.getTime()) /
              (1000 * 3600 * 24)
          ) / 365.25
        );
      });

      return res.status(200).json({
        user,
        data,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async getUserId(req, res) {
    try {
      let { id } = req.params;

      let {
        name,
        email,
        avatar,
        cpf,
        cidade,
        logradouro,
        cep,
        bairro,
        uf,
        numero,
        complemento,
      } = await User.findByPk(id, {
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        ],
      });

      return res.status(200).json({
        name,
        email,
        avatar,
        cpf,
        cidade,
        logradouro,
        cep,
        bairro,
        uf,
        numero,
        complemento,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
export default new UserController();
