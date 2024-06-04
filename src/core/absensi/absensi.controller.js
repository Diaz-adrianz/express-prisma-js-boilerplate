import AbsensiService from './absensi.service.js';
import BaseController from '../../base/controller.base.js';

class AbsensiController extends BaseController {
  constructor() {
    super();
    this.service = new AbsensiService();

    // methods
    this.createAbsensi = this.wrapWithCatch(this.createAbsensi);
  }

  createAbsensi = async (req, res) => {
    const guru = await this.service.createAbsensi(req.user.id);
    return this.responseSuccess(res, guru, 'Create Absensi success');
  };
}

export default AbsensiController;
