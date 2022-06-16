import { assert, describe, expect, test } from 'vitest'
// import { setup, $fetch } from '@nuxt/test-utils-edge'

describe('demo-test', () => {
  test('Math.sqrt()', () => {
    expect(Math.sqrt(4)).toBe(2)
    expect(Math.sqrt(144)).toBe(12)
    expect(Math.sqrt(2)).toBe(Math.SQRT2)
  })

  test('JSON', () => {
    const input = {
      foo: 'hello',
      bar: 'world',
    }

    const output = JSON.stringify(input)

    expect(output).eq('{"foo":"hello","bar":"world"}')
    assert.deepEqual(JSON.parse(output), input, 'matches original')
  })
})
// import { describe, it } from 'vitest'
// import { fileURLToPath } from 'node:url'
// import { setup, $fetch } from '@nuxt/test-utils-edge'

// describe('ssr', async () => {
//   await setup({
//     rootDir: fileURLToPath(new URL('./fixture', import.meta.url)),
//   })

//   it('renders the index page', async () => {
//     // Get response to a server-rendered page with `$fetch`.
//     const html = await $fetch('/')

//     expect(html).toContain('<a>A Link</a>')
//   })
// })
