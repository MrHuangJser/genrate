import tpl from '../templates'
import { ProjectStruct, TemplateConfigOptions } from '../../types'

export default function (templateConfig: TemplateConfigOptions): ProjectStruct {
  const devDependencies = { typescript: '4.8.4' }
  const { ts = false, lib = false, framework = '' } = templateConfig

  if (!ts) {
    return { files: [] }
  }

  if (lib && framework) {
    switch (framework) {
      case 'web':
        return { devDependencies, files: [['tsconfig.json', tpl.ts('webpack')]] }
    }
  }

  if (framework) {
    switch (framework) {
      case 'web':
        return { devDependencies, files: [['tsconfig.json', tpl.ts('web')]] }
    }
  }

  if (lib) {
    return { devDependencies, files: [['tsconfig.json', tpl.ts('nodepack')]] }
  }

  return { devDependencies, files: [['tsconfig.json', tpl.ts()]] }
}
