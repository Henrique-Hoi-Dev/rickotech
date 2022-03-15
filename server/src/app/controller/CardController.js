import CardService from "../../service/CardService";

class CardController {
  async index(req, res) {
    let response;      
    response = await CardService.index();
    return res.send(response);
  }
}

export default new CardController()