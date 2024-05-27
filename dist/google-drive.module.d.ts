import { DynamicModule } from '@nestjs/common';
import { GoogleDriveConfigType } from './types';
export declare class GoogleDriveModule {
    static register(googleDriveConfig: GoogleDriveConfigType): DynamicModule;
}
