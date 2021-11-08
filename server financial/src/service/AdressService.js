import Adress from "../app/models/Adress";
import User from "../app/models/User";
import httpStatus from 'http-status-codes';

export default {
  // create de um endereço de usuário
  async storeAdress(req, res) {
    let adresses = req;
    let user_id = res.user_id

    try {
      let { cep, logradouro, complemento, numero, bairro, cidade, uf } = adresses;

      const user = await User.findByPk(user_id);

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      const adress = await Adress.create({  cep, logradouro, complemento, 
                                            numero, bairro, cidade, uf, user_id  });

      return adress;
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  // atualiza o endereço do usuário
  async updateAdressId(req, res) {
    try {
      let adresses = res

      const adress = await Adress.findByPk(req.id);
      let adressUpdated = await adress.update(adresses);

      return adressUpdated;
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  // exclui o endereço do usuário
  async deleteAdress(req, res) {
    let result = {}
    try {
      const id  = req.id;

      const adress = await Adress.destroy({
        where: {
          id: id,
        },
      });

      if (!adress) {
        return res.status(400).json({ message: 'adress not found' });
      }

      result = {httpStatus: httpStatus.OK, status: "successful", responseData: adress}      
      return result
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  }
}