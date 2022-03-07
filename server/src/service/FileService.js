import File from "../app/models/File";
import httpStatus from 'http-status-codes';

export default {
  async getId(req, res) {
    let product = await File.findAll()
    return product;
  },
  async delete(req, res) {
    let result = {}
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
  }
}