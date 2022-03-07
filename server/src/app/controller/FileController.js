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
  async getId(req, res) {
    let response;      
    response = await FileService.getId();
    return res.send(response);
  }
  async delete(req, res) {
    let response;     
    response = await FileService.delete(req.params);
    return res.send(response);
  }
}
export default new FileController();
