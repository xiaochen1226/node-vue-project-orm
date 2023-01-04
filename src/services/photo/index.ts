import Photo from "../../models/photo.model";

const getPhotoList = (id: number) => {
  return Photo.findAll({
    raw: true,
    where: {
      product_id: id,
    },
  });
};

export default { getPhotoList };
