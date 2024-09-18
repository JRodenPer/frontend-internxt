export declare type FileId = string;
export declare type PhotoId = string;
export declare type DeviceId = string;

export interface Photo {
    id: PhotoId;
    name: string;
    type: string;
    size: number;
    width: number;
    height: number;
    fileId: FileId;
    previewId: FileId;
    previewUrl: string;
    previews?: {
        width: number;
        height: number;
        size: number;
        fileId: FileId;
    }[];
    deviceId: DeviceId;
    userId: string;
    statusChangedAt: Date;
    hash: string;
    takenAt: Date;
    createdAt: Date;
    updatedAt: Date;
}