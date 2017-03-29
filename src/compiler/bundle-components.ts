import { CompilerOptions, CompilerContext, ComponentMode, FileMeta } from './interfaces';
import { getTsModule, getTsScriptTarget, readFile, writeFile, copy, hashContent } from './util';
import * as path from 'path';
import * as fs from 'fs';
import * as ts from 'typescript';
import * as babel from 'babel-core';
import * as nodeUtil from 'util';
const rollup = require('rollup');


export function bundleComponents(opts: CompilerOptions, ctx: CompilerContext) {
  return createComponentFiles(opts, ctx).then(() => {
    return createIonicJs(opts, ctx);
  });
}


export function createIonicJs(opts: CompilerOptions, ctx: CompilerContext) {
  const fileName = 'ionic.js';
  const src = path.join(opts.ionicCoreDir, fileName);
  const dest = path.join(opts.destDir, fileName);

  const fileNameMin = 'ionic.min.js';
  const srcMin = path.join(opts.ionicCoreDir, fileNameMin);
  const destMin = path.join(opts.destDir, fileNameMin);

  const components: {[tag: string]: any[]} = {};

  ctx.files.forEach(file => {
    if (file.cmpMeta && file.cmpMeta.modes) {
      const component: any[] = components[file.cmpMeta.tag] = [];

      const cmpModes: {[mode: string]: string} = {};

      Object.keys(file.cmpMeta.modes).forEach(mode => {
        cmpModes[mode] = file.cmpMeta.modes[mode].id;
      });

      component.push(cmpModes);

      if (file.cmpMeta.props) {
        component.push(file.cmpMeta.props);
      }
    }
  });

  const cmpStr = nodeUtil.inspect(components, false, null).replace(/\s/g, '');

  const componentJs = `window.Ionic=window.Ionic||{};window.Ionic.components=${cmpStr};`;


  return createIonicCoreJs(opts, ctx).then((results: any[]) => {
    const ionicCoreJsHash = results[0];

    return Promise.all([
      readFile(src).then(ionicJsContent => {
        ionicJsContent = ionicJsContent.replace('core', ionicCoreJsHash);
        ionicJsContent = `${componentJs}\n${ionicJsContent}`;
        return writeFile(dest, ionicJsContent);
      }),

      readFile(srcMin).then(ionicJsContent => {
        ionicJsContent = ionicJsContent.replace('core', ionicCoreJsHash);
        ionicJsContent = `${componentJs}${ionicJsContent}`;
        return writeFile(destMin, ionicJsContent);
      })
    ]);

  });
}


function createIonicCoreJs(opts: CompilerOptions, ctx: CompilerContext) {
  const src = path.join(opts.ionicCoreDir, `ionic.core.js`);
  const srcMin = path.join(opts.ionicCoreDir, `ionic.core.min.js`);
  const srcEs5 = path.join(opts.ionicCoreDir, `ionic.core.es5.js`);
  const srcEs5Min = path.join(opts.ionicCoreDir, `ionic.core.es5.min.js`);


  return readFile(src).then(content => {
    const componentJsHash = hashContent(content).substr(0, 8);

    const dest = path.join(opts.destDir, `ionic.${componentJsHash}.js`);
    const destMin = path.join(opts.destDir, `ionic.${componentJsHash}.min.js`);
    const destEs5 = path.join(opts.destDir, `ionic.${componentJsHash}.es5.js`);
    const destEs5Min = path.join(opts.destDir, `ionic.${componentJsHash}.es5.min.js`);

    return Promise.all([
      Promise.resolve(componentJsHash),
      copy(src, dest),
      copy(srcMin, destMin),
      copy(srcEs5, destEs5),
      copy(srcEs5Min, destEs5Min)
    ]);
  });
}


function createComponentFiles(opts: CompilerOptions, ctx: CompilerContext) {
  return transpileComponentFiles(opts, ctx).then(() => {
    return bundleComponentFiles(opts, ctx);
  });
}


function transpileComponentFiles(opts: CompilerOptions, ctx: CompilerContext) {
  return new Promise(resolve => {
    const files: string[] = [];

    ctx.files.forEach(file => {
      if (file.isTransformable && file.isTsSourceFile) {
        files.push(file.filePath);
      }
    });

    const orgTsReadFile = ts.sys.readFile;

    ts.sys.readFile = function(filePath: string, encoding?: string): string {
      const file = ctx.files.get(filePath);
      if (file) {
        if (file.srcTextWithoutDecorators) {
          return file.srcTextWithoutDecorators;
        }
        if (file.srcText) {
          return file.srcText;
        }
      }

      return fs.readFileSync(filePath, 'utf-8');
    };

    const program = ts.createProgram(files, {
      target: getTsScriptTarget(opts.scriptTarget),
      module: getTsModule(opts.module)
    });

    program.emit(undefined, (filePath: string, data: string) => {
      let file = getFileMeta(filePath, ctx);
      if (file) {
        file.transpiledText = data;

      } else {
        file = {
          fileName: path.basename(filePath),
          filePath: filePath,
          srcText: data,
          srcTextWithoutDecorators: data,
          transpiledText: data,
          isTsSourceFile: false,
          isTransformable: false
        };
        ctx.files.set(filePath, file);
      }
    });

    ts.sys.readFile = orgTsReadFile;

    resolve();
  });
}


function bundleComponentFiles(opts: CompilerOptions, ctx: CompilerContext) {
  const promises: Promise<any>[] = [];

  ctx.files.forEach(file => {
    if (file.cmpMeta && file.cmpMeta.modes) {
      promises.push(bundleComponentJs(file, opts, ctx));
    }
  });

  return Promise.all(promises);
}


function bundleComponentJs(file: FileMeta, opts: CompilerOptions, ctx: CompilerContext) {
  const paths = file.filePath.split('.');
  paths[paths.length - 1] = 'js';

  const jsFilePath = paths.join('.');

  return rollup.rollup({
    entry: jsFilePath,
    plugins: [rollupFS(ctx)]

  }).then((bundle: any) => {

    const result = bundle.generate({
      format: 'cjs'
    });

    let code: string = result.code;

    code = code.replace(`Object.defineProperty(exports, '__esModule', { value: true });`, '');

    code = `function __importModuleFn(exports) {
      ${code};
    }`

    const plugins = [
      'transform-es2015-arrow-functions',
      'transform-es2015-block-scoped-functions',
      'transform-es2015-block-scoping',
      'transform-es2015-destructuring',
      'transform-es2015-parameters',
      'transform-es2015-shorthand-properties',
      'transform-es2015-template-literals',
    ];

    const presets = [
      ['babili', {
        removeConsole: true,
        removeDebugger: true
      }]
    ];

    const transpileResult = babel.transform(code, {
      presets: presets,
      plugins: plugins,
      ast: false,
      babelrc: false
    });

    let moduleFn = transpileResult.code;
    moduleFn = moduleFn.replace('function __importModuleFn(', 'function(');

    const promises: Promise<any>[] = [];

    Object.keys(file.cmpMeta.modes).forEach(mode => {
      const cmpMode = file.cmpMeta.modes[mode];
      promises.push(bundleComponentMode(file, mode, cmpMode, moduleFn, opts, ctx));
    });

    return Promise.all(promises);
  });
}


function bundleComponentMode(file: FileMeta, mode: string, cmpMode: ComponentMode, moduleFn: string, opts: CompilerOptions, ctx: CompilerContext) {
  let styles = cmpMode.styles || '';
  styles = styles.replace(/\'/g, '"');
  styles = styles.replace(/\n/g, '');

  cmpMode.hash = hashContent(`${file.cmpMeta.tag}${mode}${styles}${moduleFn}`);
  cmpMode.id = cmpMode.hash.substr(0, 8);
  cmpMode.fileName = `${file.cmpMeta.tag}.${mode}.${cmpMode.id}.js`;

  const output = `Ionic.loadComponent('${file.cmpMeta.tag}','${mode}','${cmpMode.id}','${styles}',${moduleFn});`;

  const outfile = path.join(opts.destDir, cmpMode.fileName);

  return writeFile(outfile, output);
}


function rollupFS(ctx: CompilerContext) {
  return {
    resolveId: function(importee: string, importer: string) {
      const file = getFileMeta(importee, ctx);
      if (file) {
        if (file.transpiledText) {
          return importee;
        }
      }
    },
    load: function(filePath: string) {
      const file = getFileMeta(filePath, ctx);
      if (file) {
        if (file.transpiledText) {
          return file.transpiledText;
        }
      }
    }
  };
}


function getFileMeta(filePath: string, ctx: CompilerContext) {
  const file = ctx.files.get(filePath);
  if (file) {
    return file;
  }

  const paths = filePath.split('.');
  paths[paths.length - 1] = 'ts';

  const tsFilePath = paths.join('.');

  return ctx.files.get(tsFilePath);
}
