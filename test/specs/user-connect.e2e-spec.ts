import { InternalDataUserConnectServiceClient } from '@halomeapis/halome-proto-files';
import { ulid } from 'ulid';

import { CreateUserConnectClients } from '../utils/create-user-connect-clients';

describe('UserConnectService', () => {
  let UserDataClient: InternalDataUserConnectServiceClient;

  beforeAll(async () => {
    [UserDataClient] = await CreateUserConnectClients();
  });

  const createUserConnect = async (userId: string, connectId: string) => {
    await new Promise<void>((resolve) => {
      UserDataClient.CreateDataUserConnect(
        {
          userId,
          connectId,
        },
        (err, result) => {
          expect(result?.ok).toEqual(true);
          expect(result?.data).toMatchObject({
            userId,
            connectId,
          });

          resolve();
        },
      );
    });
  };

  describe('.CreateDataUserConnect()', () => {
    it('should return validation errors', async () => {
      await new Promise<void>((resolve) => {
        UserDataClient.CreateDataUserConnect({}, (err, result) => {
          expect(result?.ok).toEqual(false);
          expect(result?.error?.code).toEqual(1000);
          expect(result?.error?.details).toEqual([
            'userId should not be null or undefined',
            'userId should not be empty',
            'userId must be a string',
            'connectId should not be null or undefined',
            'connectId should not be empty',
            'connectId must be a string',
          ]);

          resolve();
        });
      });
    });

    it('should return ok response', async () => {
      const userId = ulid();
      const connectId = ulid();

      await new Promise<void>((resolve) => {
        UserDataClient.CreateDataUserConnect(
          {
            userId,
            connectId,
          },
          (err, result) => {
            expect(result?.ok).toEqual(true);
            expect(result?.data).toMatchObject({
              userId,
              connectId,
            });

            resolve();
          },
        );
      });
    });
  });

  describe('.DeleteDataUserConnect()', () => {
    it('should return validation errors', async () => {
      await new Promise<void>((resolve) => {
        UserDataClient.DeleteDataUserConnect({}, (err, result) => {
          expect(result?.ok).toEqual(false);
          expect(result?.error?.code).toEqual(1000);
          expect(result?.error?.details).toEqual([
            'userId should not be null or undefined',
            'userId should not be empty',
            'userId must be a string',
            'connectId should not be null or undefined',
            'connectId should not be empty',
            'connectId must be a string',
          ]);

          resolve();
        });
      });
    });

    it('should return ok response', async () => {
      const userId = ulid();
      const connectId = ulid();

      await createUserConnect(userId, connectId);

      await new Promise<void>((resolve) => {
        UserDataClient.DeleteDataUserConnect(
          {
            userId,
            connectId,
          },
          (err, result) => {
            expect(result?.ok).toEqual(true);

            resolve();
          },
        );
      });

      await new Promise<void>((resolve) => {
        UserDataClient.GetDataUserConnect(
          {
            connectId,
          },
          (err, result) => {
            expect(result?.ok).toEqual(false);
            expect(result?.error).toMatchObject({
              details: [],
              code: 0,
              message: 'User connect not found',
            });

            resolve();
          },
        );
      });
    });
  });

  describe('.GetDataUserConnect()', () => {
    it('should return validation errors', async () => {
      await new Promise<void>((resolve) => {
        UserDataClient.GetDataUserConnect({}, (err, result) => {
          expect(result?.ok).toEqual(false);
          expect(result?.error?.code).toEqual(1000);
          expect(result?.error?.details).toEqual([
            'connectId should not be null or undefined',
            'connectId should not be empty',
            'connectId must be a string',
          ]);

          resolve();
        });
      });
    });

    it('should return ok response', async () => {
      const userId = ulid();
      const connectId = ulid();

      await createUserConnect(userId, connectId);

      await new Promise<void>((resolve) => {
        UserDataClient.GetDataUserConnect(
          {
            connectId,
          },
          (err, result) => {
            expect(result?.ok).toEqual(true);
            expect(result?.data).toMatchObject({
              userId,
              connectId,
            });

            resolve();
          },
        );
      });
    });
  });

  describe('.ListDataUserConnect()', () => {
    it('should return validation errors', async () => {
      await new Promise<void>((resolve) => {
        UserDataClient.ListDataUserConnect({}, (err, result) => {
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
      const connectId = ulid();

      await createUserConnect(userId, connectId);

      const connectId2 = ulid();

      await createUserConnect(userId, connectId2);

      await new Promise<void>((resolve) => {
        UserDataClient.ListDataUserConnect(
          {
            userId,
          },
          (err, result) => {
            expect(result?.ok).toEqual(true);
            expect(result?.data[1]).toMatchObject({
              userId,
              connectId,
            });

            expect(result?.data[0]).toMatchObject({
              userId,
              connectId: connectId2,
            });

            resolve();
          },
        );
      });
    });
  });
});
