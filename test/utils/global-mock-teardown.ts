import process from 'process';

import { LIST_DB } from '../../src/constraint';
import { MongoDb } from '../../src/modules/store/mongo-db';

export default async function (): Promise<void> {
  if (process.env.NODE_ENV === 'test') {
    const mongodb = new MongoDb();

    for (let index = 0; index < LIST_DB.length; index++) {
      const dbConfig = LIST_DB[index];

      await mongodb
        .getCollection(dbConfig.dbName, dbConfig.collectionName)
        .drop();
    }

    await mongodb.closeConnection();
  }

  if (globalThis.__APP__) {
    await globalThis.__APP__.get<MongoDb>(MongoDb).client.close();
    await globalThis.__APP__.close();
  }
}
