import { Photo } from "../../types/photos";

export const createPhotoFixture = (data?: Partial<Photo>): Photo => {
  const timestamp = Date.now().toString();
  return {
    id: timestamp,
    name: "new_photo",
    type: "jpg",
    size: 999,
    width: 512,
    height: 512,
    fileId: timestamp,
    previewId: `preview_${timestamp}`,
    previewUrl: `https://picsum.photos/300/300?random=${Math.random()}`,
    deviceId: `device_${timestamp}`,
    userId: `user_${timestamp}`,
    statusChangedAt: new Date(),
    hash: "xxx",
    takenAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...data,
  };
};
