import { afterEach, describe, expect, it, vi } from 'vitest'
import { placeInlineImage } from '../bodyDecoder'

describe('placeInlineImage', () => {
  test('the function will return the same object structure as received', () => {
    const testObject = {
      emailHTML: '',
      emailFileHTML: [
        {
          mimeType: 'test',
          decodedB64: 'test',
          filename: 'test',
          contentID: 'test123',
        },
      ],
    }
    expect(placeInlineImage(testObject)).toBe(testObject)
  })
  test('the function will replace the inline img tag with a fetched file', () => {
    const testInputObject = {
      emailHTML:
        '<img src="cid:525828e8-b3b0-48a2-819d-b7acee49451b" alt="Test Alt" width="120" height="120" />',
      emailFileHTML: [
        {
          mimeType: 'image/png',
          decodedB64: 'testDecodedB64',
          filename: '',
          contentID: '525828e8-b3b0-48a2-819d-b7acee49451b',
        },
      ],
    }
    const testOutputObject = {
      emailHTML:
        '<img src="data:image/png;base64,testDecodedB64" alt="Test Alt" width="120" height="120" />',
      emailFileHTML: [],
    }
    expect(placeInlineImage(testInputObject)).toEqual(testOutputObject)
  })
  test('the function will skip attachments that cannot be matched with inline images, and filter out unusable mime types', () => {
    const testInputObject = {
      emailHTML:
        '<img src="cid:525828e8-b3b0-48a2-819d-b7acee49451b" alt="Test Alt" width="120" height="120" />',
      emailFileHTML: [
        {
          mimeType: 'image/png',
          decodedB64: 'testDecodedB64',
          filename: '',
          contentID: '444444-b3b0-48a2-819d-b7acee49451b',
        },
        {
          mimeType: 'application/octet-stream',
          decodedB64: 'testDecodedB64',
          filename: 'test.pdf',
          contentID: '11111-b3b0-48a2-819d-b7acee49451b',
        },
      ],
    }
    const testOutputObject = {
      emailHTML:
        '<img src="cid:525828e8-b3b0-48a2-819d-b7acee49451b" alt="Test Alt" width="120" height="120" />',
      emailFileHTML: [
        {
          mimeType: 'image/png',
          decodedB64: 'testDecodedB64',
          filename: '',
          contentID: '444444-b3b0-48a2-819d-b7acee49451b',
        },
      ],
    }
    expect(placeInlineImage(testInputObject)).toEqual(testOutputObject)
  })
})
