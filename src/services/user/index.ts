import User from "../../models/user.modle";
import Avatar from "../../models/avatar.model";
import { IRegisterUser } from "./type";

const selectUser = () => {
  return User.findAndCountAll({ raw: true });
};

const getUserByName = (name: string) => {
  return User.findAll({
    raw: true,
    where: {
      name: name,
    },
  });
};

const registerUser = (user: IRegisterUser) => {
  return User.create({ ...user });
};

const uploadAvatar = (
  filename: string,
  mimetype: string,
  size: number,
  id: number
) => {
  return Avatar.create({
    filename: filename,
    mimetype: mimetype,
    size: size,
    user_id: id,
  });
};

const updateAvatarUrlById = (avatar: string, id: number) => {
  return User.update({ avatar_url: avatar }, { where: { id } });
};

const getAvatarByUserId = (userId: string) => {
  return Avatar.findAll({
    raw: true,
    where: {
      user_id: userId,
    },
  });
};

export default {
  selectUser,
  getUserByName,
  registerUser,
  uploadAvatar,
  updateAvatarUrlById,
  getAvatarByUserId,
};
