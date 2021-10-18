import Account from "../app/models/Account";
import Portion from "../app/models/Portion";

export default {
  // busca total valores das contas CARD
  async getCardTotalDetails(req, res) {
    let result = {}
    try {
      const accounts = await Portion.findAll();

      const valid = accounts.filter(function (result) {
        return result.dataValues;
      });

      const venci = valid.map(function (result) {
        const valor = parseInt(result.dataValues.valor);

        return valor;
      });

      const totalContas = venci.reduce((acumulado, x) => {
        return acumulado + x;
      });
      
      result = {responseData: totalContas}      
      return result
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  // busca total valores pagas CARD
  async getCardPaidDetails(req, res) {
    let result = {}
    try {
      const accounts = await Portion.findAll();
  
      const valid = accounts.filter(function (result) {
        if (result.dataValues.pago == true) {
          return result.dataValues;
        }
      });
  
      const venci = valid.map(function (result) {
        const valor = parseInt(result.dataValues.valor);
  
        return valor;
      });
  
      const totalPagas = venci.reduce((acumulado, x) => {
        return acumulado + x;
      });
  
      result = {responseData: totalPagas}      
      return result;
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  // busca total valores pendente CARD
  async getCardOwingDetails(req, res) {
    let result = {}
    try {
      const accounts = await Portion.findAll();

      const valid = accounts.filter(function (result) {
        if (result.dataValues.pago == false) {
          return result.dataValues;
        }
      });

      const venci = valid.map(function (result) {
        const valor = parseInt(result.dataValues.valor);

        return valor;
      });

      const totalPendente = venci.reduce((acumulado, x) => {
        return acumulado + x;
      });

      result = {responseData: totalPendente}      
      return result
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  // busca total valores vencido CARD
  async getCardOverdueDetails(req, res) {
    let result = {}
    try {
      const accounts = await Account.findAll({
        include: [
          {
            model: Portion,
            as: 'parcela',
            attributes: [
              'accounts_id',
              'valor',
              'data_vencimento',
            ],
          },
        ],
      });
      const dataAtual = new Date();
    
      const valid = accounts.filter(function (result) {
        if (result.dataValues.data_vencimento <= dataAtual) {
          if (result.dataValues.status === 'pendente')
          return result.dataValues;
        }
      });

      const contasVencidas = valid.map(function (result) {
        const parValor = result.parcela.map(function (par) {
          const valor = parseInt(par.dataValues.valor);
          return valor
        })
        const total = parValor.reduce((acumulado, x) => {
          return acumulado + x;
        });
        return total   
      });
      console.log(contasVencidas)
      const totalVenvidas = contasVencidas.reduce((acumulado, x) => {
        return acumulado + x;
      });

      result = {responseData: totalVenvidas}      
      return result
    } catch (error) {
      return res.status(400).json(error)
    }
  },
}