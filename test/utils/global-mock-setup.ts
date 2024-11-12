import { INestMicroservice } from '@nestjs/common';

import { createAppServer } from './create-app-server';

declare global {
  // eslint-disable-next-line no-var
  var __APP__: INestMicroservice;
}

export default async function (): Promise<void> {
  globalThis.__APP__ = await createAppServer();
}
