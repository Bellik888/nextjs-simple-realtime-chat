import User from '@/server/models/user.model';

const findById = async (id: string) => {
  return await User.findById(id, '-_id -password');
};

const UserService = { findById };
export default UserService;
