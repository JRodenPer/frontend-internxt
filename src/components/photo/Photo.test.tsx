import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Photo from "./Photo";
import { Photo as PhotoType } from "../../types/photos";

describe("Photo Component", () => {
  const mockPhoto: PhotoType = {
    previewUrl: "https://imgElement.jpg",
    name: "Test Photo",
    id: "",
    type: "",
    size: 0,
    width: 0,
    height: 0,
    fileId: "",
    previewId: "",
    deviceId: "",
    userId: "",
    statusChangedAt: new Date(),
    hash: "",
    takenAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockOnImageLoad = jest.fn();

  it("should render an image with the correct src and alt attributes", () => {
    render(<Photo photo={mockPhoto} onImageLoad={mockOnImageLoad} />);

    const imgElement = screen.getByAltText(mockPhoto.name) as HTMLImageElement;

    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", mockPhoto.previewUrl);
    expect(imgElement).toHaveAttribute("alt", mockPhoto.name);
  });

  it("should call onImageLoad when the image is loaded", () => {
    render(<Photo photo={mockPhoto} onImageLoad={mockOnImageLoad} />);

    const imgElement = screen.getByAltText(mockPhoto.name) as HTMLImageElement;
    fireEvent.load(imgElement);

    expect(mockOnImageLoad).toHaveBeenCalled();
  });

  it("should change the class from loading to loaded when the image is loaded", () => {
    render(<Photo photo={mockPhoto} onImageLoad={mockOnImageLoad} />);

    const imgElement = screen.getByAltText(mockPhoto.name) as HTMLImageElement;
    fireEvent.load(imgElement);

    expect(imgElement).toHaveClass("loaded");
  });

  it("should have the initial class of loading before the image loads", () => {
    render(<Photo photo={mockPhoto} onImageLoad={mockOnImageLoad} />);

    const imgElement = screen.getByAltText(mockPhoto.name) as HTMLImageElement;

    expect(imgElement).toHaveClass("loading");
  });
});
