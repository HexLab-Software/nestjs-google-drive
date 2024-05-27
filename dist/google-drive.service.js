"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleDriveService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const googleapis_1 = require("googleapis");
const google_drive_constant_1 = require("./google-drive.constant");
let GoogleDriveService = class GoogleDriveService {
    constructor(googleDriveConfig) {
        this.googleDriveConfig = googleDriveConfig;
        this.getDriveService = (googleDriveConfigCustom) => {
            const auth = this.getAuth(googleDriveConfigCustom);
            const DRIVE_VERSION = 'v3';
            return googleapis_1.google.drive({ version: DRIVE_VERSION, auth });
        };
    }
    async uploadFile(file, folderId, googleDriveConfigCustom) {
        try {
            const fileMetadata = {
                name: file.filename,
                parents: [folderId],
            };
            const media = {
                mimeType: file.mimetype,
                body: this.bufferToStream(file),
            };
            const driveService = this.getDriveService(googleDriveConfigCustom);
            const response = await driveService.files.create({
                requestBody: fileMetadata,
                media,
                fields: 'id',
            });
            const { id: fileId } = response.data;
            return await this.getFileURL(fileId);
        }
        catch (err) {
            throw err;
        }
    }
    async deleteFile(fileId) {
        try {
            const drive = this.getDriveService();
            await drive.files.delete({
                fileId,
            });
        }
        catch (err) {
            throw err;
        }
    }
    async getFileURL(fileId) {
        const drive = this.getDriveService();
        await drive.permissions.create({
            fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });
        const result = await drive.files.get({
            fileId,
            fields: 'webViewLink, webContentLink',
        });
        const fileUrl = result.data.webContentLink;
        return fileUrl;
    }
    getAuth(googleDriveConfigCustom) {
        try {
            const { clientId, clientSecret, redirectUrl, refreshToken } = this.googleDriveConfig;
            const auth = new googleapis_1.google.auth.OAuth2(clientId, clientSecret, redirectUrl);
            auth.setCredentials({ refresh_token: (googleDriveConfigCustom === null || googleDriveConfigCustom === void 0 ? void 0 : googleDriveConfigCustom.refreshToken) || refreshToken });
            return auth;
        }
        catch (err) {
            throw err;
        }
    }
    bufferToStream(file) {
        const stream = fs.createReadStream(file.path);
        return stream;
    }
};
GoogleDriveService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(google_drive_constant_1.GOOGLE_DRIVE_CONFIG)),
    __metadata("design:paramtypes", [Object])
], GoogleDriveService);
exports.GoogleDriveService = GoogleDriveService;
//# sourceMappingURL=google-drive.service.js.map