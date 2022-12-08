import tpl from '../../templates'
import { stringify } from '../../utils'
import { ProjectStruct, TemplateConfigOptions } from '../../../types'

export default function ({ ts, lib, framework }: TemplateConfigOptions): ProjectStruct {
  let files = [['tsconfig.json', tpl.ts.node]]

  if (!ts) {
    return { files: [] }
  }

  if (lib) {
    files = [['tsconfig.json', tpl.ts.lib.node]]
  }

  if (framework) {
    files = [['tsconfig.json', tpl.ts.web]]

    if (['vue'].includes(framework)) {
      files = [['tsconfig.json', tpl.ts.vue]]
    }

    if (['nest'].includes(framework)) {
      files = [['tsconfig.json', tpl.ts.node]]
    }
  }

  if (lib && framework) {
    files = [['tsconfig.json', tpl.ts.lib.web]]

    if (['vue'].includes(framework)) {
      files = [
        ['tsconfig.json', tpl.ts.lib.vue],
        ['tsconfig.types.json', stringify({ include: ['src/**/*'] })]
      ]
    }

    if (['nest'].includes(framework)) {
      files = [['tsconfig.json', tpl.ts.lib.node]]
    }
  }

  return {
    files,
    devDependencies: { typescript: '4.8.4' }
  }
}
