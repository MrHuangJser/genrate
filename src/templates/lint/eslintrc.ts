import { JSONObject } from 'types-json'
import { TemplateConfigOptions } from '../../../types'

export default function (templateConfig: TemplateConfigOptions) {
  const config: JSONObject = {
    root: true,
    plugins: [],
    extends: ['eslint:recommended'],
    rules: {
      'no-case-declarations': 'off'
    },
    env: getEnv(templateConfig)
  }

  if (templateConfig.lint?.includes('stylelint')) {
    config.plugins = [...(<Array<string>>config.plugins), 'prettier']
    config.rules = Object.assign({}, config.rules, { 'prettier/prettier': 'error' })
    config.extends = [...(<Array<string>>config.extends), 'plugin:prettier/recommended']
  }

  if (templateConfig.ts) {
    config.parser = '@typescript-eslint/parser'
    config.parserOptions = { project: './tsconfig.json' }
    config.plugins = [...(<Array<string>>config.plugins), '@typescript-eslint']
    config.rules = Object.assign({}, config.rules, {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-floating-promises': ['error', { ignoreIIFE: true }]
    })
    config.extends = [
      ...(<Array<string>>config.extends),
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking'
    ]
  } else {
    config.parserOptions = { ecmaVersion: 'latest', sourceType: 'module' }
  }

  return config
}

function getEnv(templateConfig: TemplateConfigOptions) {
  const env: JSONObject = {
    node: undefined,
    browser: undefined
  }

  if (templateConfig.framework) {
    env.node = true
    env.browser = true
  }

  if (templateConfig.framework === 'nest') {
    env.browser = false
  }

  if (templateConfig.lib) {
    env.node = true
  }

  return env
}
