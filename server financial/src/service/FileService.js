import File from "../app/models/File";
import httpStatus from 'http-status-codes';

export default {
  // busca o avatar do usuário por file Id 
  async getFileDetailsId(req, res) {
    try {
      let product = await File.findAll()
      return product;
    } catch (error) {
      return res.status(400).json(error)};
    },
  // exclui um registro do avatar do usuário
  async deleteFileId(req, res) {
    let result = {}
    try {
      const id  = req.id;
  
       const files = await File.destroy({
        where: {
          id: id,
        },
      });
  
      if (!files) {
         return res.status(400).json({ message: 'avatar not found' });
      }
  
      result = {httpStatus: httpStatus.OK, status: "successful", responseData: files}      
      return result
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}