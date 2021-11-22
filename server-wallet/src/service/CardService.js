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
      
      result = {totalContas}      
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
  
      result = {totalPagas}      
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

      result = {totalPendente}      
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
            attributes: [ 'accounts_id', 'valor' ]
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
      const contasVencidas = valid.map(function (par) {
        const parcelas = par.dataValues.parcela;
          const valoresParcelas = parcelas.map(function (valores) {
            return valores.valor
          })    
          const parcela = parseInt(valoresParcelas);         
          return parcela
      });
      const totalVenvidas = contasVencidas.reduce((acumulado, x) => {
        return acumulado + x;
      });

      result = {totalVenvidas}      
      return result
    } catch (error) {
      return res.status(400).json(error)
    }
  },
}