import { useState, useEffect, useRef, useCallback } from "react";
import { Photo } from "../types/photos";
import { photosApi } from "../__dont_modify__/api/photos";

export const usePhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loadedImages, setLoadedImages] = useState<number>(0);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastPhotoRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading || error || loadedImages < photos.length) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, error, hasMore, loadedImages, photos.length]
  );

  const fetchPhotos = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await photosApi.getPhotos({ page });
      setPhotos((prevPhotos) => [...prevPhotos, ...response.photos]);
      setHasMore(response.hasMore);
    } catch (e: any) {
      setError(e.code);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasMore && !error) {
      fetchPhotos(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };
  return { photos, loading, error, hasMore, lastPhotoRef, handleImageLoad };
};
