import babel from '@babel/core'
import { test, expect } from 'vitest'
import plugin from '../babel'
import env from '@babel/preset-env'
import syntaxImportAssertions from '@babel/plugin-syntax-import-attributes'

test('babel', () => {
    const result = babel.transformSync(
        "import json from './test.json' with { type: 'json' };",
        {
            presets: [env],
            plugins: [plugin, syntaxImportAssertions],
        }
    )
    expect(result?.code).matchSnapshot()
})
