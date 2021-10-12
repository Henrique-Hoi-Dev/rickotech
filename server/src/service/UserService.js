import * as Yup from 'yup';
import Adress from '../app/models/Adress';
import File from '../app/models/File';
import User from "../app/models/User";

export default {
  async storeUser(req, res) {
    try {
      let user = req

      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(6),
        cpf: Yup.string(),
        data_nacimento: Yup.string(),
        cargo: Yup.string(),
      });
  
      if (!(await schema.isValid(user))) {
        return res.status(400).json({ error: 'Falha na validação' });
      }
      // fazendo verificação email
      const userExist = await User.findOne({ where: { email: user.email } });
  
      if (userExist) {
        return res.status(400).json({ error: 'Esse email de usuário já existe.'});
      }
  
      const users = await User.create(user);
  
      return users;
    } catch (error)  {
      return res.status(400).json(error);
    }
  },

  async getUserDetails(req, res) {
    try {
      const users = await User.findAll({
        attributes: [ 'name', 'email', 'provider', 'cargo', 
                      'cpf', 'avatar_id', 'data_nascimento' ],
        include: [
        {
          model: File,
          as: 'avatar',
          attributes:  [ 'id', 'path', 'url' ],
        },
        {
          model: Adress,
          as: 'adress',
          attributes:  [ 'cep', 'logradouro', 'complemento', 
                          'numero', 'bairro', 'cidade', 'uf' ],
        }
      ],  
    });
      return users;
    } catch (error) {
      return res.status(400).json(error)
    }
  },

  async getUserDetailsId(req, res) {
    try {
      let user = await User.findByPk(req.id, {
        attributes: [ 'name', 'email', 'provider', 'cargo', 
                      'cpf', 'avatar_id', 'data_nascimento' ],
        include: [
        {
          model: File,
          as: 'avatar',
          attributes:  [ 'id', 'path', 'url' ],
        },
        {
          model: Adress,
          as: 'adress',
          attributes:  [ 'cep', 'logradouro', 'complemento', 
                          'numero', 'bairro', 'cidade', 'uf' ],
        }
      ],  
    });
      return user;
    } catch (error) {
      return res.status(400).json(error)
    }
  },

  async updateUserId(req, res) {    
    try {
      let userId = res.id
      let users = req

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
  
      if (!(await schema.isValid(users))) {
        return res.status(400).json({ error: 'Falha na validação' });
      }
  
      const { email, oldPassword } = users ;
      
      const user = await User.findByPk(userId);
      
      if (email !== user.dataValues.email) {
        const userExist = await User.findOne({ where: { email } });
  
        if (userExist) {
          return res.status(400).json({ error: 'Esse email de usuário já existe.'});
        }
      }
  
      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res.status(401).json({ error: 'Senha não corresponde' });
      }
      
      await user.update(users);

      const result = await User.findByPk(userId, {
        attributes: ['id', 'name', 'email', 'cargo', 'cpf', 'data_nascimento' ],
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        ],
      });

      return result
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}