import { getMatrix } from './getTestJobs.mjs'
import { expect, describe, it } from 'vitest'

/*/
const SKIP = true
/*/
const SKIP = false
//*/

describe('getMatrix()', () => {
  // We only use this `getMatrix()` test for developing the getMatrix() function. (Because, otherwise, the fixture down below would need to be updated everytime there is a new/(re)moved test file.)
  if (SKIP) {
    const msg = 'SKIPPED getMatrix() test'
    it(msg, () => {})
    return
  }

  it('basics', () => {
    const matrix = getMatrix()
    expect(matrix).toMatchInlineSnapshot(`
      [
        {
          "TEST_FILES": ".github/workflows/ci/getTestJobs.spec.ts test/renderPage.spec.ts vite-plugin-ssr/shared/route/deduceRouteStringFromFilesystemPath.spec.ts vite-plugin-ssr/shared/route/resolvePrecedence/overall.spec.ts vite-plugin-ssr/shared/route/resolvePrecedence/route-strings.spec.ts vite-plugin-ssr/shared/route/resolveRouteString.spec.ts vite-plugin-ssr/utils/parseUrl.spec.ts",
          "node_version": "14",
          "os": "windows-latest",
          "testCmd": "pnpm run test:units",
          "testName": "Unit Tests - Win - Node.js 14",
        },
        {
          "TEST_FILES": "",
          "node_version": "18",
          "os": "ubuntu-latest",
          "testCmd": "pnpm run test:types",
          "testName": "TypeScript - Ubuntu - Node.js 18",
        },
        {
          "TEST_FILES": "examples/base-url-cdn/.test.ts examples/base-url/.dev.test.ts examples/base-url/.preview.test.ts examples/custom-server-render-integration/.dev.test.ts examples/custom-server-render-integration/.prod.test.ts examples/file-structure-domain-driven/.dev.test.ts examples/file-structure-domain-driven/.preview.test.ts examples/graphql-apollo-react/.dev.test.ts examples/graphql-apollo-react/.prod.test.ts examples/i18n/.dev.test.ts examples/i18n/.preview.test.ts examples/layouts-react/.dev.test.ts examples/layouts-react/.preview.test.ts examples/path-aliases/.dev.test.ts examples/path-aliases/.prod-static.test.ts examples/path-aliases/.prod.test.ts examples/react-17/.dev.test.ts examples/react-17/.preview.test.ts examples/react-full/.dev.test.ts examples/react-full/.preview.test.ts examples/react-router/.test.ts examples/react/.dev.test.ts examples/react/.preview.test.ts examples/redux/.test.ts examples/render-modes/.dev.test.ts examples/render-modes/.preview.test.ts examples/urql/.dev.test.ts examples/urql/.preview.test.ts",
          "node_version": "16",
          "os": "ubuntu-latest",
          "testCmd": "pnpm run test:e2e",
          "testName": "Examples React - Ubuntu - Node.js 16",
        },
        {
          "TEST_FILES": "examples/base-url-cdn/.test.ts examples/base-url/.dev.test.ts examples/base-url/.preview.test.ts examples/custom-server-render-integration/.dev.test.ts examples/custom-server-render-integration/.prod.test.ts examples/file-structure-domain-driven/.dev.test.ts examples/file-structure-domain-driven/.preview.test.ts examples/graphql-apollo-react/.dev.test.ts examples/graphql-apollo-react/.prod.test.ts examples/i18n/.dev.test.ts examples/i18n/.preview.test.ts examples/layouts-react/.dev.test.ts examples/layouts-react/.preview.test.ts examples/path-aliases/.dev.test.ts examples/path-aliases/.prod-static.test.ts examples/path-aliases/.prod.test.ts examples/react-17/.dev.test.ts examples/react-17/.preview.test.ts examples/react-full/.dev.test.ts examples/react-full/.preview.test.ts examples/react-router/.test.ts examples/react/.dev.test.ts examples/react/.preview.test.ts examples/redux/.test.ts examples/render-modes/.dev.test.ts examples/render-modes/.preview.test.ts examples/urql/.dev.test.ts examples/urql/.preview.test.ts",
          "node_version": "14",
          "os": "windows-latest",
          "testCmd": "pnpm run test:e2e",
          "testName": "Examples React - Win - Node.js 14",
        },
        {
          "TEST_FILES": "examples/graphql-apollo-vue/.dev.test.ts examples/graphql-apollo-vue/.prod.test.ts examples/html-fragments/.test.ts examples/layouts-vue/.dev.test.ts examples/layouts-vue/.preview.test.ts examples/preact-client-routing/.dev.test.ts examples/preact-client-routing/.preview.test.ts examples/preact-server-routing/.dev.test.ts examples/preact-server-routing/.preview.test.ts examples/vue-full/.dev.test.ts examples/vue-full/.preview.test.ts examples/vue-pinia/.test.ts examples/vue-router/.test.ts examples/vue/.dev.test.ts examples/vue/.preview.test.ts examples/vuex/.test.ts",
          "node_version": "16",
          "os": "ubuntu-latest",
          "testCmd": "pnpm run test:e2e",
          "testName": "Examples Vue/Others - Ubuntu - Node.js 16",
        },
        {
          "TEST_FILES": "examples/graphql-apollo-vue/.dev.test.ts examples/graphql-apollo-vue/.prod.test.ts examples/html-fragments/.test.ts examples/layouts-vue/.dev.test.ts examples/layouts-vue/.preview.test.ts examples/preact-client-routing/.dev.test.ts examples/preact-client-routing/.preview.test.ts examples/preact-server-routing/.dev.test.ts examples/preact-server-routing/.preview.test.ts examples/vue-full/.dev.test.ts examples/vue-full/.preview.test.ts examples/vue-pinia/.test.ts examples/vue-router/.test.ts examples/vue/.dev.test.ts examples/vue/.preview.test.ts examples/vuex/.test.ts",
          "node_version": "14",
          "os": "windows-latest",
          "testCmd": "pnpm run test:e2e",
          "testName": "Examples Vue/Others - Win - Node.js 14",
        },
        {
          "TEST_FILES": "boilerplates/boilerplate-react-ts/.dev.test.ts boilerplates/boilerplate-react-ts/.prod.test.ts boilerplates/boilerplate-react/.dev.test.ts boilerplates/boilerplate-react/.prod.test.ts boilerplates/boilerplate-vue-ts/.dev.test.ts boilerplates/boilerplate-vue-ts/.prod.test.ts boilerplates/boilerplate-vue/.dev.test.ts boilerplates/boilerplate-vue/.prod.test.ts",
          "node_version": "17",
          "os": "macos-latest",
          "testCmd": "pnpm run test:e2e",
          "testName": "Boilerplates - Mac - Node.js 17",
        },
        {
          "TEST_FILES": "examples/cloudflare-workers-react-full/.dev.test.ts examples/cloudflare-workers-react-full/.wrangler.test.ts examples/cloudflare-workers-react/.dev.test.ts examples/cloudflare-workers-react/.preview.test.ts examples/cloudflare-workers-vue/.dev.test.ts examples/cloudflare-workers-vue/.wrangler.test.ts",
          "node_version": "16",
          "os": "ubuntu-latest",
          "testCmd": "pnpm run test:e2e",
          "testName": "Cloudflare - Ubuntu - Node.js 16",
        },
        {
          "TEST_FILES": "docs/.dev.test.ts docs/.preview.test.ts",
          "node_version": "17",
          "os": "ubuntu-latest",
          "testCmd": "pnpm run test:e2e",
          "testName": "https://vite-plugin-ssr.com - Ubuntu - Node.js 17",
        },
      ]
    `)
  })
})
