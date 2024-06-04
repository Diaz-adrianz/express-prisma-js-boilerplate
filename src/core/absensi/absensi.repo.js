import prismaDB from '../../config/prisma.config.js';

class AbsensiRepo {
  constructor() {}

  getGuru = async (user_id) => {
    const data = await prismaDB.ref_users.findFirst({
      where: {
        id: user_id,
        role_id: 6, // guru
      },
    });

    if (data == null) throw new Error('NOT_FOUND');
    return data;
  };
}

export default AbsensiRepo;
