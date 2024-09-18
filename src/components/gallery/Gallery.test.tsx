import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Gallery from "./Gallery";
import { usePhotos } from "../../hooks/usePhotos";

jest.mock("../../hooks/usePhotos");

describe("Gallery Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render Loading component when loading is true", () => {
    (usePhotos as jest.Mock).mockReturnValue({
      photos: [],
      loading: true,
      error: null,
      hasMore: true,
      lastPhotoRef: null,
      handleImageLoad: jest.fn(),
    });

    render(<Gallery />);

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it('should render error message when error is "UNKNOWN_ERROR"', () => {
    (usePhotos as jest.Mock).mockReturnValue({
      photos: [],
      loading: false,
      error: "UNKNOWN_ERROR",
      hasMore: true,
      lastPhotoRef: null,
      handleImageLoad: jest.fn(),
    });

    render(<Gallery />);

    expect(
      screen.getByText(
        "Something went wrong. Please try again to charge pictures."
      )
    ).toBeInTheDocument();
  });

  it("should render end of gallery message when no more photos are available", () => {
    (usePhotos as jest.Mock).mockReturnValue({
      photos: [],
      loading: false,
      error: null,
      hasMore: false,
      lastPhotoRef: null,
      handleImageLoad: jest.fn(),
    });

    render(<Gallery />);

    expect(
      screen.getByText("This is the end of the gallery")
    ).toBeInTheDocument();
  });

  it("should render Photo components for each photo in the array", () => {
    const mockPhotos = [
      { id: 1, previewUrl: "photo1.jpg" },
      { id: 2, previewUrl: "photo2.jpg" },
    ];
    (usePhotos as jest.Mock).mockReturnValue({
      photos: mockPhotos,
      loading: false,
      error: null,
      hasMore: true,
      lastPhotoRef: null,
      handleImageLoad: jest.fn(),
    });

    render(<Gallery />);

    mockPhotos.forEach(async (photo) => {
      await waitFor(() => {
        expect(screen.getByAltText(photo.previewUrl)).toBeInTheDocument();
      });
    });
  });

  it("should correctly assign ref to the last photo", async () => {
    const mockPhotos = [
      { id: 1, previewUrl: "photo1.jpg" },
      { id: 2, previewUrl: "photo2.jpg" },
    ];
    const mockRef = jest.fn();
    (usePhotos as jest.Mock).mockReturnValue({
      photos: mockPhotos,
      loading: false,
      error: null,
      hasMore: true,
      lastPhotoRef: mockRef,
      handleImageLoad: jest.fn(),
    });

    render(<Gallery />);

    await waitFor(() => {
      expect(mockRef).toHaveBeenCalled();
    });
  });
});
