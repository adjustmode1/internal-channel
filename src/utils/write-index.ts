import { glob } from 'glob';
import { parse, resolve, join } from 'path';
import { writeFileSync } from 'fs';

const ROOT_DIR = 'src/typings';
const INDEX_PATH = resolve(join(ROOT_DIR, 'index.ts'));

let content = '';

glob(`${ROOT_DIR}/**/**/*.ts`, {}, function (er, files) {
  for (const file of files) {
    const {dir, name} = parse(file);
    const importPath = `.${dir.replace(ROOT_DIR, '')}/${name}`;
    content += `export *${dir === ROOT_DIR ? ` as ${name}` : ''} from "${importPath}";\n`;
  }
  writeFileSync(INDEX_PATH, content)
})
