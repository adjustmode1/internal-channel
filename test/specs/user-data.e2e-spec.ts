import {
  InternalDataUserProfileServiceClient,
  MediaPermissionSettingEnum,
  UserTypeEnum,
} from '@halomeapis/halome-proto-files';
import { ulid } from 'ulid';

import { createUserDataClients } from '../utils/create-user-data-clients';

describe('UserDataService', () => {
  let UserDataClient: InternalDataUserProfileServiceClient;

  const createUserData = async (
    userId: string,
    username: string,
  ): Promise<void> => {
    return new Promise<void>((resolve) => {
      UserDataClient.CreateDataUserProfile(
        {
          geocode: 'VN',
          userId,
          username,
        },
        (err, result) => {
          expect(result?.ok).toEqual(true);
          expect(result?.data).toMatchObject({
            geocode: 'VN',
            userId,
            username,
            state: 'active',
            userType: UserTypeEnum.USER_TYPE_ENUM_DEFAULT,
            metrics: {
              reports: 0,
            },
          });

          resolve();
        },
      );
    });
  };

  beforeAll(async () => {
    [UserDataClient] = await createUserDataClients();
  });

  describe('.CreateNewUserDataRecord()', () => {
    it('should return validation errors', async () => {
      await new Promise<void>((resolve) => {
        UserDataClient.CreateDataUserProfile({}, (err, result) => {
          expect(result?.ok).toEqual(false);
          expect(result?.error?.code).toEqual(1000);
          expect(result?.error?.details).toEqual([
            'geocode should not be null or undefined',
            'geocode should not be empty',
            'geocode must be a string',
            'userId should not be null or undefined',
            'userId should not be empty',
            'userId must be a string',
            'username should not be null or undefined',
            'username should not be empty',
            'username must be a string',
          ]);

          resolve();
        });
      });
    });

    it('should return ok response', async () => {
      const userId = ulid();
      const username = ulid();

      await new Promise<void>((resolve) => {
        UserDataClient.CreateDataUserProfile(
          {
            geocode: 'VN',
            userId,
            username,
          },
          (err, result) => {
            expect(result?.ok).toEqual(true);
            expect(result?.data).toMatchObject({
              geocode: 'VN',
              userId,
              username,
              state: 'active',
              userType: UserTypeEnum.USER_TYPE_ENUM_DEFAULT,
              metrics: {
                reports: 0,
              },
            });

            resolve();
          },
        );
      });
    });
  });

  describe('.ListDataUserProfile()', () => {
    it('should return validation errors', async () => {
      await new Promise<void>((resolve) => {
        UserDataClient.ListDataUserProfiles({}, (err, result) => {
          expect(result?.ok).toEqual(false);
          expect(result?.error?.code).toEqual(1000);
          expect(result?.error?.details).toEqual([
            'userIds must contain at least 1 elements',
            'userIds must be an array',
          ]);

          resolve();
        });
      });
    });

    it('should return ok response', async () => {
      const userId = ulid();
      const username = ulid();

      await createUserData(userId, username);

      const userId2 = ulid();
      const username2 = ulid();

      await createUserData(userId2, username2);

      await new Promise<void>((resolve) => {
        UserDataClient.ListDataUserProfiles(
          { userIds: [userId, userId2] },
          (err, result) => {
            expect(result?.ok).toEqual(true);
            expect(result?.data.length).toEqual(2);
            expect(result?.data[0]).toMatchObject({
              geocode: 'VN',
              userId,
              username,
              state: 'active',
              userType: UserTypeEnum.USER_TYPE_ENUM_DEFAULT,
              metrics: {
                reports: 0,
              },
            });

            expect(result?.data[1]).toMatchObject({
              geocode: 'VN',
              userId: userId2,
              username: username2,
              state: 'active',
              userType: UserTypeEnum.USER_TYPE_ENUM_DEFAULT,
              metrics: {
                reports: 0,
              },
            });

            resolve();
          },
        );
      });
    });
  });

  describe('.GetDataUserProfile()', () => {
    it('should return validation errors', async () => {
      await new Promise<void>((resolve) => {
        UserDataClient.GetDataUserProfile({}, (err, result) => {
          expect(result?.ok).toEqual(false);
          expect(result?.error?.code).toEqual(1000);
          expect(result?.error?.details).toEqual([
            'userId should not be null or undefined',
            'userId should not be empty',
            'userId must be a string',
          ]);

          resolve();
        });
      });
    });

    it('should return ok response', async () => {
      const userId = ulid();
      const username = ulid();

      await createUserData(userId, username);

      await new Promise<void>((resolve) => {
        UserDataClient.GetDataUserProfile({ userId }, (err, result) => {
          expect(result?.ok).toEqual(true);
          expect(result?.data).toMatchObject({
            geocode: 'VN',
            userId,
            username,
            state: 'active',
            userType: UserTypeEnum.USER_TYPE_ENUM_DEFAULT,
            metrics: {
              reports: 0,
            },
          });

          resolve();
        });
      });
    });
  });

  describe('.UpdateDataUserProfile()', () => {
    it('should return validation errors', async () => {
      await new Promise<void>((resolve) => {
        UserDataClient.UpdateDataUserProfile({}, (err, result) => {
          expect(result?.ok).toEqual(false);
          expect(result?.error?.code).toEqual(1000);
          expect(result?.error?.details).toEqual([
            'userId should not be null or undefined',
            'userId should not be empty',
            'userId must be a string',
          ]);
          resolve();
        });
      });
    });

    it('should return ok response', async () => {
      const userId = ulid();
      const originalAvatar = ulid();
      const cover = ulid();
      const username = ulid();

      await createUserData(userId, username);

      await new Promise<void>((resolve) => {
        UserDataClient.UpdateDataUserProfile(
          {
            userId,
            profile: { originalAvatar, cover },
            setting: {
              globalNotificationStatus: true,
              security: { recoveryCode: { enable: true } },
            },
            username,
            metrics: { reports: 10 },
          },
          (err, result) => {
            expect(result?.ok).toEqual(true);
            expect(result?.data).toMatchObject({
              geocode: 'VN',
              userId,
              username,
              state: 'active',
              userType: 0,
              profile: {
                originalAvatar,
                cover,
              },
              setting: {
                globalNotificationStatus: true,
                security: {
                  smartOTP: {
                    enable: false,
                  },
                  recoveryCode: {
                    enable: true,
                  },
                },
                globalMediaPermissionSetting:
                  MediaPermissionSettingEnum.MEDIA_PERMISSION_SETTING_ENUM_NOT_ALLOW,
              },
            });
            resolve();
          },
        );
      });
    });
  });

  describe('.DeleteDataUserProfile()', () => {
    it('should return validation errors', async () => {
      await new Promise<void>((resolve) => {
        UserDataClient.DeleteDataUserProfile({}, (err, result) => {
          expect(result?.ok).toEqual(false);
          expect(result?.error?.code).toEqual(1000);
          expect(result?.error?.details).toEqual([
            'userId should not be null or undefined',
            'userId should not be empty',
            'userId must be a string',
          ]);
          resolve();
        });
      });
    });

    it('should return ok response', async () => {
      const userId = ulid();
      const username = ulid();

      await createUserData(userId, username);

      await new Promise<void>((resolve) => {
        UserDataClient.DeleteDataUserProfile({ userId }, (err, result) => {
          expect(result?.ok).toEqual(true);
          resolve();
        });
      });
    });
  });
});
