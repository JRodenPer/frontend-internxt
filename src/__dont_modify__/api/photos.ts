import { Photo } from "../../types/photos";
import { createPhotoFixture } from "../fixtures/photos";
import { ApiError, maybeThrowErrorMaybeNot } from "./utils";

export interface GetPhotosParams {
  page: number;
}

export interface GetPhotosResponse {
  total: number;
  page: number;
  hasMore: boolean;
  photos: Photo[];
}

const TOTAL_PHOTOS = 96;
export const PHOTOS_PAGE_LIMIT = 24;

/**
 * Obtains a list of photos based on a given page, note that
 * the photos are limited for each page
 *
 * @param params Params to obtain the photos
 * @returns A Photos API result with the pagination and photos data
 */
const getPhotos = async (
  params: GetPhotosParams
): Promise<GetPhotosResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Throw an arbitrary error sometimes
        maybeThrowErrorMaybeNot();

        const { page } = params;
        const totalPages = TOTAL_PHOTOS / PHOTOS_PAGE_LIMIT;

        if (page > totalPages) {
          throw new ApiError(
            "PAGE_MISSING",
            "The page you are requesting doesnt exists"
          );
        }
        const photos: Photo[] = [];

        // Create a bunch of photos
        for (let i = 0; i < PHOTOS_PAGE_LIMIT; i++) {
          photos.push(createPhotoFixture());
        }

        resolve({
          total: TOTAL_PHOTOS,
          page: page,
          hasMore: page <= totalPages,
          photos,
        });
      } catch (e) {
        reject(e);
      }
    }, 1000);
  });
};

export const photosApi = {
  getPhotos,
};
