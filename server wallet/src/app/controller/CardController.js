import CardService from '../../service/CardService'

class CardController {
  // busca total valores das contas CARD
  async getCardTotalDetails(req, res) {
    let response;      
    try {
      response = await CardService.getCardTotalDetails();
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro na busca'});
    }
  }
  // busca total valores vencido CARD
  async getCardOverdueDetails(req, res) {
    let response;      
    try {
      response = await CardService.getCardOverdueDetails();
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro na busca'});
    }
  }
  // busca total valores pagas CARD
  async getCardPaidDetails(req, res) {
    let response;      
    try {
      response = await CardService.getCardPaidDetails();
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro na busca'});
    }
  }
  // busca total valores pendentes CARD
  async getCardOwingDetails(req, res) {
    let response;      
    try {
      response = await CardService.getCardOwingDetails();
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro na busca'});
    }
  }
}

export default new CardController()