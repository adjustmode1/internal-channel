import {
  AddOrIncreaseDataUserVisitedProfileRequest,
  ClearDataUserVisitedProfileRequest,
  DeleteDataUserVisitedProfileRequest,
  InternalDataUserVisitedProfileServiceClient,
} from '@halomeapis/halome-proto-files';
import { ulid } from 'ulid';

import { createUserVisitedProfileClients } from '../utils/create-user-visited-profile-clients';

describe('UserVisitedProfileService', () => {
  let UserVisitedProfileClient: InternalDataUserVisitedProfileServiceClient;

  beforeAll(async () => {
    [UserVisitedProfileClient] = await createUserVisitedProfileClients();
  });

  describe('.AddOrIncreaseDataUserVisitedProfile()', () => {
    it('should return validation errors', async () => {
      await new Promise<void>((resolve) => {
        UserVisitedProfileClient.AddOrIncreaseDataUserVisitedProfile(
          {},
          (err, result) => {
            expect(result?.ok).toEqual(false);
            expect(result?.error?.code).toEqual(1000);
            expect(result?.error?.details).toEqual([
              'actorId should not be null or undefined',
              'actorId should not be empty',
              'actorId must be a string',
              'userId should not be null or undefined',
              'userId should not be empty',
              'userId must be a string',
            ]);

            resolve();
          },
        );
      });
    });

    it('should return validation errors with empty object', async () => {
      await new Promise<void>((resolve) => {
        UserVisitedProfileClient.AddOrIncreaseDataUserVisitedProfile(
          {
            userId: '',
            actorId: '',
          },
          (err, result) => {
            expect(result?.ok).toEqual(false);
            expect(result?.error?.code).toEqual(1000);
            expect(result?.error?.details).toEqual([
              'actorId should not be empty',
              'userId should not be empty',
            ]);

            resolve();
          },
        );
      });
    });

    it('should return validation errors with undefined object', async () => {
      await new Promise<void>((resolve) => {
        UserVisitedProfileClient.AddOrIncreaseDataUserVisitedProfile(
          {
            userId: undefined,
            actorId: undefined,
          },
          (err, result) => {
            expect(result?.ok).toEqual(false);
            expect(result?.error?.code).toEqual(1000);
            expect(result?.error?.details).toEqual([
              'actorId should not be null or undefined',
              'actorId should not be empty',
              'actorId must be a string',
              'userId should not be null or undefined',
              'userId should not be empty',
              'userId must be a string',
            ]);

            resolve();
          },
        );
      });
    });

    it('should return validation errors with null object', async () => {
      await new Promise<void>((resolve) => {
        UserVisitedProfileClient.AddOrIncreaseDataUserVisitedProfile(
          {
            userId: null,
            actorId: null,
          } as unknown as AddOrIncreaseDataUserVisitedProfileRequest,
          (err, result) => {
            expect(result?.ok).toEqual(false);
            expect(result?.error?.code).toEqual(1000);
            expect(result?.error?.details).toEqual([
              'actorId should not be null or undefined',
              'actorId should not be empty',
              'actorId must be a string',
              'userId should not be null or undefined',
              'userId should not be empty',
              'userId must be a string',
            ]);

            resolve();
          },
        );
      });
    });

    it('should return true result', async () => {
      const userId = ulid();
      const actorId = ulid();

      await new Promise<void>((resolve) => {
        UserVisitedProfileClient.AddOrIncreaseDataUserVisitedProfile(
          {
            userId,
            actorId,
          },
          (err, result) => {
            expect(result?.ok).toEqual(true);
            expect(result?.data?.userId).toEqual(userId);
            expect(result?.data?.userVisitedId).toEqual(actorId);
            expect(result?.data?.count).toEqual(1);
            expect(result?.data?.month).toEqual(new Date().getMonth() + 1);

            resolve();
          },
        );
      });
    });
  });

  describe('.DeleteDataUserVisitedProfile()', () => {
    it('should return validation errors', async () => {
      await new Promise<void>((resolve) => {
        UserVisitedProfileClient.DeleteDataUserVisitedProfile(
          {},
          (err, result) => {
            expect(result?.ok).toEqual(false);
            expect(result?.error?.code).toEqual(1000);
            expect(result?.error?.details).toEqual([
              'actorId should not be null or undefined',
              'actorId should not be empty',
              'actorId must be a string',
              'userId should not be null or undefined',
              'userId should not be empty',
              'userId must be a string',
            ]);

            resolve();
          },
        );
      });
    });

    it('should return validation errors with empty object', async () => {
      await new Promise<void>((resolve) => {
        UserVisitedProfileClient.DeleteDataUserVisitedProfile(
          {
            userId: '',
            actorId: '',
          },
          (err, result) => {
            expect(result?.ok).toEqual(false);
            expect(result?.error?.code).toEqual(1000);
            expect(result?.error?.details).toEqual([
              'actorId should not be empty',
              'userId should not be empty',
            ]);

            resolve();
          },
        );
      });
    });

    it('should return validation errors with undefined object', async () => {
      await new Promise<void>((resolve) => {
        UserVisitedProfileClient.DeleteDataUserVisitedProfile(
          {
            userId: undefined,
            actorId: undefined,
          },
          (err, result) => {
            expect(result?.ok).toEqual(false);
            expect(result?.error?.code).toEqual(1000);
            expect(result?.error?.details).toEqual([
              'actorId should not be null or undefined',
              'actorId should not be empty',
              'actorId must be a string',
              'userId should not be null or undefined',
              'userId should not be empty',
              'userId must be a string',
            ]);

            resolve();
          },
        );
      });
    });

    it('should return validation errors with null object', async () => {
      await new Promise<void>((resolve) => {
        UserVisitedProfileClient.DeleteDataUserVisitedProfile(
          {
            userId: null,
            actorId: null,
          } as unknown as DeleteDataUserVisitedProfileRequest,
          (err, result) => {
            expect(result?.ok).toEqual(false);
            expect(result?.error?.code).toEqual(1000);
            expect(result?.error?.details).toEqual([
              'actorId should not be null or undefined',
              'actorId should not be empty',
              'actorId must be a string',
              'userId should not be null or undefined',
              'userId should not be empty',
              'userId must be a string',
            ]);

            resolve();
          },
        );
      });
    });

    it('should return false result with not found user visited profile', async () => {
      const userId = ulid();
      const actorId = ulid();

      return new Promise<void>((resolve) => {
        UserVisitedProfileClient.DeleteDataUserVisitedProfile(
          {
            userId,
            actorId,
          },
          (err, result) => {
            expect(result?.ok).toEqual(false);
            expect(result?.error).toMatchObject({
              details: [],
              code: 0,
              message: 'Not found user visited profile',
            });

            resolve();
          },
        );
      });
    });

    it('should return true result', async () => {
      const userId = ulid();
      const actorId = ulid();

      await new Promise<void>((resolve) => {
        UserVisitedProfileClient.AddOrIncreaseDataUserVisitedProfile(
          {
            userId,
            actorId,
          },
          (err, result) => {
            expect(result?.ok).toEqual(true);
            expect(result?.data?.userId).toEqual(userId);
            expect(result?.data?.userVisitedId).toEqual(actorId);
            expect(result?.data?.count).toEqual(1);
            expect(result?.data?.month).toEqual(new Date().getMonth() + 1);

            resolve();
          },
        );
      });

      return new Promise<void>((resolve) => {
        UserVisitedProfileClient.DeleteDataUserVisitedProfile(
          {
            userId,
            actorId,
          },
          (err, result) => {
            expect(result?.ok).toEqual(true);

            resolve();
          },
        );
      });
    });
  });

  describe('.GetDataUserVisitedProfile()', () => {
    it('should return validation errors', async () => {
      await new Promise<void>((resolve) => {
        UserVisitedProfileClient.GetDataUserVisitedProfile(
          {},
          (err, result) => {
            expect(result?.ok).toEqual(false);
            expect(result?.error?.code).toEqual(1000);
            expect(result?.error?.details).toEqual([
              'actorId should not be null or undefined',
              'actorId should not be empty',
              'actorId must be a string',
              'userId should not be null or undefined',
              'userId should not be empty',
              'userId must be a string',
            ]);

            resolve();
          },
        );
      });
    });

    it('should return validation errors with empty object', async () => {
      await new Promise<void>((resolve) => {
        UserVisitedProfileClient.GetDataUserVisitedProfile(
          {
            userId: '',
            actorId: '',
          },
          (err, result) => {
            expect(result?.ok).toEqual(false);
            expect(result?.error?.code).toEqual(1000);
            expect(result?.error?.details).toEqual([
              'actorId should not be empty',
              'userId should not be empty',
            ]);

            resolve();
          },
        );
      });
    });

    it('should return validation errors with undefined object', async () => {
      await new Promise<void>((resolve) => {
        UserVisitedProfileClient.GetDataUserVisitedProfile(
          {
            userId: undefined,
            actorId: undefined,
          },
          (err, result) => {
            expect(result?.ok).toEqual(false);
            expect(result?.error?.code).toEqual(1000);
            expect(result?.error?.details).toEqual([
              'actorId should not be null or undefined',
              'actorId should not be empty',
              'actorId must be a string',
              'userId should not be null or undefined',
              'userId should not be empty',
              'userId must be a string',
            ]);

            resolve();
          },
        );
      });
    });

    it('should return validation errors with null object', async () => {
      await new Promise<void>((resolve) => {
        UserVisitedProfileClient.GetDataUserVisitedProfile(
          {
            userId: null,
            actorId: null,
          } as unknown as DeleteDataUserVisitedProfileRequest,
          (err, result) => {
            expect(result?.ok).toEqual(false);
            expect(result?.error?.code).toEqual(1000);
            expect(result?.error?.details).toEqual([
              'actorId should not be null or undefined',
              'actorId should not be empty',
              'actorId must be a string',
              'userId should not be null or undefined',
              'userId should not be empty',
              'userId must be a string',
            ]);

            resolve();
          },
        );
      });
    });

    it('should return false result with not found user visited profile', async () => {
      const userId = ulid();
      const actorId = ulid();

      return new Promise<void>((resolve) => {
        UserVisitedProfileClient.GetDataUserVisitedProfile(
          {
            userId,
            actorId,
          },
          (err, result) => {
            expect(result?.ok).toEqual(false);
            expect(result?.error).toMatchObject({
              details: [],
              code: 0,
              message: 'Not found user visited profile',
            });

            resolve();
          },
        );
      });
    });

    it('should return true result', async () => {
      const userId = ulid();
      const actorId = ulid();

      await new Promise<void>((resolve) => {
        UserVisitedProfileClient.AddOrIncreaseDataUserVisitedProfile(
          {
            userId,
            actorId,
          },
          (err, result) => {
            expect(result?.ok).toEqual(true);
            expect(result?.data?.userId).toEqual(userId);
            expect(result?.data?.userVisitedId).toEqual(actorId);
            expect(result?.data?.count).toEqual(1);
            expect(result?.data?.month).toEqual(new Date().getMonth() + 1);

            resolve();
          },
        );
      });

      return new Promise<void>((resolve) => {
        UserVisitedProfileClient.GetDataUserVisitedProfile(
          {
            userId,
            actorId,
          },
          (err, result) => {
            expect(result?.ok).toEqual(true);
            expect(result?.data?.userId).toEqual(userId);
            expect(result?.data?.userVisitedId).toEqual(actorId);
            expect(result?.data?.count).toEqual(1);
            expect(result?.data?.month).toEqual(new Date().getMonth() + 1);

            resolve();
          },
        );
      });
    });
  });

  describe('.ListDataUserVisitedProfile()', () => {
    it('should return validation errors', async () => {
      await new Promise<void>((resolve) => {
        UserVisitedProfileClient.ListDataUserVisitedProfile(
          {},
          (err, result) => {
            expect(result?.ok).toEqual(false);
            expect(result?.error?.code).toEqual(1000);
            expect(result?.error?.details).toEqual([
              'userId should not be null or undefined',
              'userId should not be empty',
              'userId must be a string',
            ]);

            resolve();
          },
        );
      });
    });

    it('should return validation errors with empty object', async () => {
      await new Promise<void>((resolve) => {
        UserVisitedProfileClient.ListDataUserVisitedProfile(
          {
            userId: '',
          },
          (err, result) => {
            expect(result?.ok).toEqual(false);
            expect(result?.error?.code).toEqual(1000);
            expect(result?.error?.details).toEqual([
              'userId should not be empty',
            ]);

            resolve();
          },
        );
      });
    });

    it('should return validation errors with undefined object', async () => {
      await new Promise<void>((resolve) => {
        UserVisitedProfileClient.ListDataUserVisitedProfile(
          {
            userId: undefined,
          },
          (err, result) => {
            expect(result?.ok).toEqual(false);
            expect(result?.error?.code).toEqual(1000);
            expect(result?.error?.details).toEqual([
              'userId should not be null or undefined',
              'userId should not be empty',
              'userId must be a string',
            ]);

            resolve();
          },
        );
      });
    });

    it('should return validation errors with null object', async () => {
      await new Promise<void>((resolve) => {
        UserVisitedProfileClient.ListDataUserVisitedProfile(
          {
            userId: null,
          } as unknown as DeleteDataUserVisitedProfileRequest,
          (err, result) => {
            expect(result?.ok).toEqual(false);
            expect(result?.error?.code).toEqual(1000);
            expect(result?.error?.details).toEqual([
              'userId should not be null or undefined',
              'userId should not be empty',
              'userId must be a string',
            ]);

            resolve();
          },
        );
      });
    });

    it('should return true result', async () => {
      const userId = ulid();
      const actorId = ulid();

      await new Promise<void>((resolve) => {
        UserVisitedProfileClient.AddOrIncreaseDataUserVisitedProfile(
          {
            userId,
            actorId,
          },
          (err, result) => {
            expect(result?.ok).toEqual(true);
            expect(result?.data?.userId).toEqual(userId);
            expect(result?.data?.userVisitedId).toEqual(actorId);
            expect(result?.data?.count).toEqual(1);
            expect(result?.data?.month).toEqual(new Date().getMonth() + 1);

            resolve();
          },
        );
      });

      return new Promise<void>((resolve) => {
        UserVisitedProfileClient.ListDataUserVisitedProfile(
          {
            userId,
          },
          (err, result) => {
            expect(result?.ok).toEqual(true);
            expect(result?.data.length).toEqual(1);
            expect(result?.data[0].userId).toEqual(userId);
            expect(result?.data[0].userVisitedId).toEqual(actorId);
            expect(result?.data[0].count).toEqual(1);
            expect(result?.data[0].month).toEqual(new Date().getMonth() + 1);

            resolve();
          },
        );
      });
    });
  });

  describe('.ClearDataUserVisitedProfile()', () => {
    it('should return validation errors', async () => {
      await new Promise<void>((resolve) => {
        UserVisitedProfileClient.ClearDataUserVisitedProfile(
          {},
          (err, result) => {
            expect(result?.ok).toEqual(false);
            expect(result?.error?.code).toEqual(1000);
            expect(result?.error?.details).toEqual([
              'userId should not be null or undefined',
              'userId should not be empty',
              'userId must be a string',
              'notInMonth should not be null or undefined',
              'notInMonth must be a number conforming to the specified constraints',
            ]);

            resolve();
          },
        );
      });
    });

    it('should return validation errors with empty object', async () => {
      await new Promise<void>((resolve) => {
        UserVisitedProfileClient.ClearDataUserVisitedProfile(
          {
            userId: '',
            notInMonth: new Date().getMonth() + 1,
          },
          (err, result) => {
            expect(result?.ok).toEqual(false);
            expect(result?.error?.code).toEqual(1000);
            expect(result?.error?.details).toEqual([
              'userId should not be empty',
            ]);

            resolve();
          },
        );
      });
    });

    it('should return validation errors with undefined object', async () => {
      await new Promise<void>((resolve) => {
        UserVisitedProfileClient.ClearDataUserVisitedProfile(
          {
            userId: undefined,
            notInMonth: undefined,
          },
          (err, result) => {
            expect(result?.ok).toEqual(false);
            expect(result?.error?.code).toEqual(1000);
            expect(result?.error?.details).toEqual([
              'userId should not be null or undefined',
              'userId should not be empty',
              'userId must be a string',
              'notInMonth should not be null or undefined',
              'notInMonth must be a number conforming to the specified constraints',
            ]);

            resolve();
          },
        );
      });
    });

    it('should return validation errors with null object', async () => {
      await new Promise<void>((resolve) => {
        UserVisitedProfileClient.ClearDataUserVisitedProfile(
          {
            userId: null,
            notInMonth: null,
          } as unknown as ClearDataUserVisitedProfileRequest,
          (err, result) => {
            expect(result?.ok).toEqual(false);
            expect(result?.error?.code).toEqual(1000);
            expect(result?.error?.details).toEqual([
              'userId should not be null or undefined',
              'userId should not be empty',
              'userId must be a string',
              'notInMonth should not be null or undefined',
              'notInMonth must be a number conforming to the specified constraints',
            ]);

            resolve();
          },
        );
      });
    });

    it('should return true result', async () => {
      const userId = ulid();
      const actorId = ulid();

      await new Promise<void>((resolve) => {
        UserVisitedProfileClient.AddOrIncreaseDataUserVisitedProfile(
          {
            userId,
            actorId,
          },
          (err, result) => {
            expect(result?.ok).toEqual(true);
            expect(result?.data?.userId).toEqual(userId);
            expect(result?.data?.userVisitedId).toEqual(actorId);
            expect(result?.data?.count).toEqual(1);
            expect(result?.data?.month).toEqual(new Date().getMonth() + 1);

            resolve();
          },
        );
      });

      return new Promise<void>((resolve) => {
        UserVisitedProfileClient.ClearDataUserVisitedProfile(
          {
            userId,
            notInMonth: new Date().getMonth(), // previous month
          },
          (err, result) => {
            expect(result?.ok).toEqual(true);

            resolve();
          },
        );
      });
    });
  });
});
