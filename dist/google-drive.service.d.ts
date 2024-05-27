/// <reference types="multer" />
import { GoogleDriveConfigType } from './types';
export declare class GoogleDriveService {
    private readonly googleDriveConfig;
    private googleDriveConfigCustom;
    constructor(googleDriveConfig: GoogleDriveConfigType);
    setCustomConfig(googleDriveConfigCustom: GoogleDriveConfigType): GoogleDriveService;
    uploadFile(file: Express.Multer.File, folderId?: string): Promise<string>;
    deleteFile(fileId: string): Promise<void>;
    getFileURL(fileId: string): Promise<string>;
    private getAuth;
    private getDriveService;
    private bufferToStream;
}
