const test = require('ava')

const {
  getVanillaFingerPrint,
  getStealthFingerPrint
} = require('../../test/util')
const Plugin = require('.')

test('vanilla: empty plugins, empty mimetypes', async t => {
  const { plugins, mimeTypes } = await getVanillaFingerPrint()
  t.is(plugins.length, 0)
  t.is(mimeTypes.length, 0)
})

test('stealth: has plugin, has mimetypes', async t => {
  const { plugins, mimeTypes } = await getStealthFingerPrint(Plugin, page => page.evaluate(() => {
    for (const mimeType of navigator.mimeTypes) {
      const { enabledPlugin } = mimeType;
    }
  }))
  t.is(plugins.length, 3)
  t.is(mimeTypes.length, 4)
  for (const mimeType of mimeTypes) {
    const { description, suffixes, type, enabledPlugin } = mimeType;
    console.log(typeof mimeType)
    console.log({ description, suffixes, type, enabledPlugin })
  }
})
