/// <reference types="multer" />
import { GoogleDriveConfigType } from './types';
export declare class GoogleDriveService {
    private readonly googleDriveConfig;
    constructor(googleDriveConfig: GoogleDriveConfigType);
    uploadFile(file: Express.Multer.File, folderId?: string, googleDriveConfigCustom?: GoogleDriveConfigType): Promise<string>;
    deleteFile(fileId: string): Promise<void>;
    getFileURL(fileId: string): Promise<string>;
    private getAuth;
    private getDriveService;
    private bufferToStream;
}
