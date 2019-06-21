import * as d from '../../../declarations';
import { convertValueToLiteral, createStaticGetter } from '../transform-utils';
import { formatComponentRuntimeMeta } from '../../app-core/format-component-runtime-meta';
import ts from 'typescript';
import { CMP_FLAGS } from '@utils';


export function addHydrateRuntimeCmpMeta(classMembers: ts.ClassElement[], cmp: d.ComponentCompilerMeta) {
  const compactMeta: d.ComponentRuntimeMetaCompact = formatComponentRuntimeMeta(cmp, true);
  const cmpMeta: d.ComponentRuntimeMeta = {
    $flags$: compactMeta[0],
    $tagName$: compactMeta[1],
    $members$: compactMeta[2],
    $listeners$: compactMeta[3],
    $attrsToReflect$: []
  };
  // We always need shadow-dom shim in hydrate runtime
  if (cmpMeta.$flags$ & CMP_FLAGS.shadowDomEncapsulation) {
    cmpMeta.$flags$ |=  CMP_FLAGS.needsShadowDomShim;
  }
  const staticMember = createStaticGetter('cmpMeta', convertValueToLiteral(cmpMeta));
  classMembers.push(staticMember);
}