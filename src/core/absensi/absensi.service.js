import AbsensiRepo from './absensi.repo.js';

class AbsensiService {
  constructor() {
    this.repo = new AbsensiRepo();
  }
  createAbsensi = async (id) => {
    return await this.repo.getGuru(id);
  };
}

export default AbsensiService;
