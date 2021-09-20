import { assert, assertUsage, cast, checkType, hasProp, isObject, isPromise } from '../../shared/utils'
import { injectAssets_internal } from './injectAssets'
import type { PageContextInjectAssets } from './injectAssets'
import { StreamReadableNode, StreamReadableWeb, StreamPipeWeb, StreamPipeNode } from './stream'

// Public
export { escapeInject }
export { dangerouslySkipEscape }
export { pipeToWebWritable }

// Private
export { isEscapeResult }
export { renderEscapeResult }
export type { EscapeResult }

type EscapeResult = string | StreamReadableWeb | StreamReadableNode | StreamPipeWeb | StreamPipeNode

function isEscapeResult(thing: unknown): thing is EscapedString | HtmlTemplateString {
  return isEscapedString(thing) || isTemplateString(thing)
}

async function renderEscapeResult(
  documentHtml: EscapedString | HtmlTemplateString,
  pageContext: PageContextInjectAssets
): Promise<EscapeResult> {
  let htmlString: string
  if (isEscapedString(documentHtml)) {
    htmlString = getEscapedString(documentHtml)
  } else if (isTemplateString(documentHtml)) {
    htmlString = renderTemplateString(documentHtml)
  } else {
    assert(false)
  }
  htmlString = await injectAssets_internal(htmlString, pageContext)
  return htmlString
}

const __template = Symbol('__template')
const __escaped = Symbol('__escaped')

type TemplateParts = TemplateStringsArray
type TemplateString = {
  [__template]: {
    templateParts: TemplateParts
    templateVariables: (
      | unknown
      | {
          [__escaped]: string
        }
    )[]
  }
}
function escapeInject(
  templateParts: TemplateParts,
  ...templateVariables: (string | ReadableStream | ReturnType<typeof dangerouslySkipEscape> | TemplateString)[]
): TemplateString {
  return {
    [__template]: {
      templateParts,
      templateVariables
    }
  }
}
type EscapedString = { [__escaped]: string } // todo: toString
function dangerouslySkipEscape(alreadyEscapedString: string): EscapedString {
  return _dangerouslySkipEscape(alreadyEscapedString)
}
function _dangerouslySkipEscape(arg: unknown): EscapedString {
  if (hasProp(arg, __escaped)) {
    assert(isEscapedString(arg))
    return arg
  }
  assertUsage(
    !isPromise(arg),
    `[dangerouslySkipEscape(str)] Argument \`str\` is a promise. It should be a string instead. Make sure to \`await str\`.`
  )
  assertUsage(
    typeof arg === 'string',
    `[dangerouslySkipEscape(str)] Argument \`str\` should be a string but we got \`typeof str === "${typeof arg}"\`.`
  )
  return { [__escaped]: arg }
}

function isEscapedString(something: unknown): something is EscapedString {
  if (hasProp(something, __escaped)) {
    assert(hasProp(something, __escaped, 'string'))
    checkType<EscapedString>(something)
    return true
  } else {
    return false
  }
}
function getEscapedString(escapedString: EscapedString): string {
  let htmlString: string
  assert(hasProp(escapedString, __escaped))
  htmlString = escapedString[__escaped]
  assert(typeof htmlString === 'string')
  return htmlString
}

function isTemplateString(something: unknown): something is HtmlTemplateString {
  return hasProp(something, __template)
}
function renderTemplateString(templateString: HtmlTemplateString): string {
  let htmlString: string
  if (__template in templateString) {
    htmlString = renderTemplate(templateString[__template])
  } else {
    assert(false)
  }
  assert(typeof htmlString === 'string')
  return htmlString
}

type HtmlTemplateString = {
  [__template]: HtmlTemplate
}
type HtmlTemplate = {
  templateParts: TemplateStringsArray
  templateVariables: unknown[]
}
function renderTemplate(htmlTemplate: HtmlTemplate) {
  const { templateParts, templateVariables } = htmlTemplate
  const templateVariablesUnwrapped: string[] = templateVariables.map((templateVar: unknown) => {
    // Process `dangerouslySkipEscape()`
    if (isEscapedString(templateVar)) {
      const val = templateVar[__escaped]
      assert(typeof val === 'string')
      // User used `dangerouslySkipEscape()` so we assume the string to be safe
      return val
    }

    // Process `escapeInject` tag composition
    if (hasProp(templateVar, __template)) {
      const htmlTemplate__segment = templateVar[__template]
      cast<HtmlTemplate>(htmlTemplate__segment)
      return renderTemplate(htmlTemplate__segment)
    }

    // Escape untrusted template variable
    return escapeHtml(toString(templateVar))
  })
  const htmlString = identityTemplateTag(templateParts, ...templateVariablesUnwrapped)
  return htmlString
}

function identityTemplateTag(parts: TemplateStringsArray, ...variables: string[]) {
  assert(parts.length === variables.length + 1)
  let str = ''
  for (let i = 0; i < variables.length; i++) {
    const variable = variables[i]
    assert(typeof variable === 'string')
    str += parts[i] + variable
  }
  return str + parts[parts.length - 1]
}

function toString(val: unknown): string {
  if (val === null || val === undefined) {
    return ''
  }
  return String(val)
}

function escapeHtml(unsafeString: string): string {
  // Source: https://stackoverflow.com/questions/6234773/can-i-escape-html-special-chars-in-javascript/6234804#6234804
  const safe = unsafeString
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
  return safe
}

const __pipeToWebWritable = Symbol('__pipeToWebWritable')
function pipeToWebWritable(pipe: StreamPipeWeb) {
  return { [__pipeToWebWritable]: pipe }
}
isPipeToWebWritable
function isPipeToWebWritable(thing: unknown): boolean {
  return isObject(thing) && __pipeToWebWritable in thing
}
