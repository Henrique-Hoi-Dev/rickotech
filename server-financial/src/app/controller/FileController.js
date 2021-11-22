import FileService from '../../service/FileService';
import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });
    return res.json(file);
  }
  async getFileDetails(req, res) {
    let response;      
    try {
      response = await FileService.getFileDetailsId();
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async deleteFileId(req, res) {
    let response;     
    try {
      response = await FileService.deleteFileId(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: "Erro no excluir"});
    }
  }
}
export default new FileController();
