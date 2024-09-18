import { renderHook, waitFor } from "@testing-library/react";
import { usePhotos } from "../hooks/usePhotos";
import { photosApi } from "../__dont_modify__/api/photos";
import { act } from "react";

interface MockIntersectionObserver extends IntersectionObserver {
  observe: jest.Mock;
  unobserve: jest.Mock;
  disconnect: jest.Mock;
}

jest.mock("../__dont_modify__/api/photos");

describe("usePhotos custom hook", () => {
  beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockImplementation(function (
      callback: IntersectionObserverCallback
    ) {
      const mockObserver = {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      } as unknown as MockIntersectionObserver;

      callback(
        [{ isIntersecting: true }] as IntersectionObserverEntry[],
        mockObserver
      );

      return mockObserver;
    });
    global.IntersectionObserver = mockIntersectionObserver;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with correct default values", async () => {
    const { result } = renderHook(() => usePhotos());

    await waitFor(() => expect(result.current.loading).toBe(true));

    expect(result.current.photos).toEqual([]);
    expect(result.current.error).toBeNull();
    expect(result.current.hasMore).toBe(true);
    expect(result.current.lastPhotoRef).toBeDefined();
  });

  it("should fetch photos on initial render", async () => {
    const mockPhotos = [{ id: 1, title: "Photo 1" }];
    (photosApi.getPhotos as jest.Mock).mockResolvedValueOnce({
      photos: mockPhotos,
      hasMore: true,
    });

    const { result } = renderHook(() => usePhotos());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.photos).toEqual(mockPhotos);
    expect(result.current.hasMore).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it("should handle API error correctly", async () => {
    (photosApi.getPhotos as jest.Mock).mockRejectedValueOnce({
      code: "500",
    });

    const { result } = renderHook(() => usePhotos());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("500");
    expect(result.current.hasMore).toBe(false);
  });

  it("should trigger fetching more photos when page changes", async () => {
    const mockPhotosPage1 = [{ id: 1, title: "Photo 1" }];
    const mockPhotosPage2 = [{ id: 2, title: "Photo 2" }];

    (photosApi.getPhotos as jest.Mock).mockResolvedValueOnce({
      photos: mockPhotosPage1,
      hasMore: true,
    });

    (photosApi.getPhotos as jest.Mock).mockResolvedValueOnce({
      photos: mockPhotosPage2,
      hasMore: false,
    });

    const { result } = renderHook(() => usePhotos());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.photos).toEqual(mockPhotosPage1);

    act(() => {
      result.current.handleImageLoad();
    });

    await act(async () => {
      result.current.lastPhotoRef(document.createElement("div"));
    });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.photos).toEqual([
      ...mockPhotosPage1,
      ...mockPhotosPage2,
    ]);
    expect(result.current.hasMore).toBe(false);
  });

  // test for IntersectionObserver mock
  it("should use IntersectionObserver mock", () => {
    const mockCallback = jest.fn();
    const observer = new IntersectionObserver(mockCallback);

    observer.observe(document.createElement("div"));

    expect(observer.observe).toBeDefined();
    expect(observer.observe).toHaveBeenCalled();
    expect(mockCallback).toHaveBeenCalled();
  });
});
