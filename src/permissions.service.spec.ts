import { PermissionsService } from './permissions.service';

describe('Permissions Service', () => {
    it('should create an instance', () => {
        const service = new PermissionsService();
        expect(service).toBeTruthy();
    });
});
