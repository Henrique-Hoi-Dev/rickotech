import AccoutService from '../../service/AccoutService'

class AccountController {
  // create uma nova conta
  async storeAccount(req, res) {
    let response;     
    try {
      response = await AccoutService.storeAccount(req.body);
      console.log(response)
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro em cria uma nova conta'});
    }
  }
  // busca todas as accounts
  async getAccountDetails(req, res) {
    let response;      
    try {
      response = await AccoutService.getAccountDetails();
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro na busca'});
    }
  }
  // busca uma conta por Id
  async getAccountDetailsId(req, res) {
    let response;      
    try {
      response = await AccoutService.getAccountDetailsId(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro na busca'});
    }
  }
  // busca todas as contas vencidas
  async getAccountOverdueDetails(req, res) {
    let response;      
    try {
      response = await AccoutService.getAccountOverdueDetails();
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro na busca'});
    }
  }
  // atualiza conta por Id
  async updateAccountId(req, res) {
    let response;      
    try {
      response = await AccoutService.updateAccountId(req.params, req.body);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro no atualizar'});
    }
  }
  // excluir uma conta por Id
  async deleteAccountId(req, res) {
    let response;      
    try {
      response = await AccoutService.deleteAccountId(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro no excluir'});
    }
  }
}
export default new AccountController();
