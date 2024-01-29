import { transform } from '@babel/standalone'
import { TranspiledCodeType } from '../types'
import { importsRegex, pureRegex, replace } from './format'

export function transplieCode(code: string): TranspiledCodeType {
  // ignore imports
  const codeToTransplie = replace(code, importsRegex)
  const options = { presets: ['es2015-loose', 'react'] }
  const { code: transpiledCode } = transform(codeToTransplie, options)

  if (!transpiledCode) {
    throw new Error(`Something went wrong transpilign ${codeToTransplie}`)
  }

  const hasImports = Boolean(code.match(importsRegex))
  const imports = code.match(importsRegex)?.join('\n') ?? ''

  return {
    iframeCode: hasImports ? `${imports}\n${transpiledCode}` : transpiledCode,
    // ignore /*#__PURE__*/ from transpiled output to reduce noise
    sourceCode: replace(transpiledCode, pureRegex),
  }
}
