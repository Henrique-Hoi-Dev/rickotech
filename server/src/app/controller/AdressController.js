import Adress from "../models/Adress";
import User from "../models/User";

class AdressController {
  async store(req, res) {
    try {
      let { user_id } = req.params;
      let { cep, logradouro, complemento, numero, bairro, cidade, uf } = req.body;

      const user = await User.findByPk(user_id);

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      const adress = await Adress.create({
        user_id,
        cep, 
        logradouro, 
        complemento, 
        numero, 
        bairro, 
        cidade, 
        uf
      });

      return res.json(adress);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

}

export default new AdressController();