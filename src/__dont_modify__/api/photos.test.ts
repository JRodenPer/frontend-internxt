import {photosApi, PHOTOS_PAGE_LIMIT} from './photos';
import { ApiError } from './utils';
describe('Photos API tests', () => {
  describe('Get the photos by pages',  () => {
    it('Should fail if we request a page that doesnt exists', async () => {
      try {
        await photosApi.getPhotos({page:1000})
        expect(true).toBeFalsy();
      } catch(err) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(err).toBeInstanceOf(ApiError)
      }
    })

    it('Should return a list of photos', async () => {
      
      const result = await photosApi.getPhotos({page:1})
      expect(result.page).toBe(1);
      expect(result.hasMore).toBeTruthy()
      expect(result.photos).toHaveLength(PHOTOS_PAGE_LIMIT);
      
    })
  })
});