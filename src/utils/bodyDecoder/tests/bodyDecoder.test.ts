import { describe, expect } from 'vitest'
import {
  loopThroughBodyParts,
  orderArrayPerType,
  placeInlineImage,
  prioritizeHTMLbodyObject,
} from '../bodyDecoder'

describe('placeInlineImage', () => {
  test('the function will return the same object structure as received', () => {
    const input = {
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
    expect(placeInlineImage(input)).toStrictEqual(input)
  })
  test('the function will replace the inline img tag with a fetched file', () => {
    const input = {
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
    const output = {
      emailHTML:
        '<img src="data:image/png;base64,testDecodedB64" alt="Test Alt" width="120" height="120" />',
      emailFileHTML: [],
    }
    expect(placeInlineImage(input)).toEqual(output)
  })
  test('the function will skip attachments that cannot be matched with inline images, and filter out unusable mime types', () => {
    const input = {
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
    const output = {
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
    expect(placeInlineImage(input)).toEqual(output)
  })
})

describe('orderArrayPerType', () => {
  test('the function will return the object as an ordered object', () => {
    const input = [
      '<html>Hej.<br />Bifogat finner ni lite resultat fr&aring;n div t&auml;vlingar och information om klubben.<br /><br />Jag &ouml;nskar er alla en trevlig midsommar och en fortsatt fin sommar!<br />Mvh Jens Maartmann<br /><br /><hr>Från <b>Boo KFUM IA</b> på <a href="http://www.sportadmin.se">www.sportadmin.se</a> - Föreningens bästa vän</html>',
      {
        mimeType: 'test',
        decodedB64: 'test',
        filename: 'test',
        contentID: 'test123',
      },
    ]

    const output = {
      emailHTML: [
        '<html>Hej.<br />Bifogat finner ni lite resultat fr&aring;n div t&auml;vlingar och information om klubben.<br /><br />Jag &ouml;nskar er alla en trevlig midsommar och en fortsatt fin sommar!<br />Mvh Jens Maartmann<br /><br /><hr>Från <b>Boo KFUM IA</b> på <a href="http://www.sportadmin.se">www.sportadmin.se</a> - Föreningens bästa vän</html>',
      ],
      emailFileHTML: [
        {
          mimeType: 'test',
          decodedB64: 'test',
          filename: 'test',
          contentID: 'test123',
        },
      ],
    }
    expect(orderArrayPerType(input)).toStrictEqual(output)
  })
})

describe('prioritizeHTMLbodyObject', () => {
  test('the function will return the highest value string', () => {
    const input = {
      emailHTML: [
        'Hej.<br />Bifogat finner ni lite resultat fr&aring;n div t&auml;vlingar och information om klubben.<br /><br />Jag &ouml;nskar er alla en trevlig midsommar och en fortsatt fin sommar!<br />Mvh Jens Maartmann<br /><br /><hr>Från <b>Boo KFUM IA</b> på <a href="http://www.sportadmin.se">www.sportadmin.se</a> - Föreningens bästa vän</b>',
        '<b>Hej.<br />Bifogat finner ni lite resultat fr&aring;n div t&auml;vlingar och information om klubben.<br /><br />Jag &ouml;nskar er alla en trevlig midsommar och en fortsatt fin sommar!<br />Mvh Jens Maartmann<br /><br /><hr>Från <b>Boo KFUM IA</b> på <a href="http://www.sportadmin.se">www.sportadmin.se</a> - Föreningens bästa vän</b>',
        '<html>Hej.<br />Bifogat finner ni lite resultat fr&aring;n div t&auml;vlingar och information om klubben.<br /><br />Jag &ouml;nskar er alla en trevlig midsommar och en fortsatt fin sommar!<br />Mvh Jens Maartmann<br /><br /><hr>Från <b>Boo KFUM IA</b> på <a href="http://www.sportadmin.se">www.sportadmin.se</a> - Föreningens bästa vän</html>',
      ],
      emailFileHTML: [
        {
          mimeType: 'test',
          decodedB64: 'test',
          filename: 'test',
          contentID: 'test123',
        },
      ],
    }

    const output = {
      emailHTML: [
        '<html>Hej.<br />Bifogat finner ni lite resultat fr&aring;n div t&auml;vlingar och information om klubben.<br /><br />Jag &ouml;nskar er alla en trevlig midsommar och en fortsatt fin sommar!<br />Mvh Jens Maartmann<br /><br /><hr>Från <b>Boo KFUM IA</b> på <a href="http://www.sportadmin.se">www.sportadmin.se</a> - Föreningens bästa vän</html>',
      ],
      emailFileHTML: [
        {
          mimeType: 'test',
          decodedB64: 'test',
          filename: 'test',
          contentID: 'test123',
        },
      ],
    }
    expect(prioritizeHTMLbodyObject(input)).toStrictEqual(output)
  })
})

describe('loopThroughBodyParts', () => {
  test('the function will loop over all the body and parts of the Gmail email message payload ', () => {
    const controller = new AbortController()
    const { signal } = controller
    const input = {
      partId: '',
      mimeType: 'multipart/alternative',
      filename: '',
      headers: [],
      body: {
        size: 0,
      },
      parts: [
        {
          partId: '0',
          mimeType: 'text/plain',
          filename: '',
          headers: [
            {
              name: 'Content-Type',
              value: 'text/plain; charset=utf-8',
            },
            {
              name: 'Content-Transfer-Encoding',
              value: 'quoted-printable',
            },
          ],
          body: {
            size: 5255,
            data: 'QW5kIG1vcmUgbmV3cywgdHV0b3JpYWxzIGFuZCBhcnRpY2xlcyBhYm91dCBSZWFjdCBpbiB0aGlzDQ0Kd2VlaydzIGlzc3VlLg0NCg0NCiMzNjQg4oCUIEp1bHkgMTEsIDIwMjINDQpWaWV3IGluIGJyb3dzZXIgKCBodHRwczovL3JlYWN0ZGlnZXN0Lm5ldC9kaWdlc3RzLzM2NCApDQ0KDQ0KKioqKioqKioqKioqDQ0KUmVhY3QgRGlnZXN0DQ0KKioqKioqKioqKioqDQ0KDQ0KU3ByZWFkIHRoZSB3b3JkLCBidWlsZCB0aGUgY29tbXVuaXR5LCBzaGFyZSB0aGUga25vd2xlZGdlDQ0Kd2l0aCB5b3VyIGZyaWVuZHMgKA0NCj9zdWJqZWN0PUNoZWNrJTIwUmVhY3QlMjBEaWdlc3QlMjBvdXQlMjAmYm9keT1IZWxsbyUyQyUwRCUwQSUwRCUwQVJlYWN0JTIwRGlnZXN0JTIwaXMlMjBhJTIwd2Vla2x5JTIwbmV3c2xldHRlciUyMHRoYXQlMjB5b3UlMjBtaWdodCUyMGxpa2UuJTIwQ2hlY2slMjBpdCUyMG91dCUyMGF0JTIwaHR0cHMlM0ElMkYlMkZyZWFjdGRpZ2VzdC5uZXQNDQopLg0NCg0NCi0tLS0tLS0NDQpzcG9uc29yDQ0KLS0tLS0tLQ0NCg0NClJlYWN0IEVkaXRvciBvciBUZXh0IEFyZWHigJRIb3cgVG8gQ2hvb3NlPyANDQooIGh0dHBzOi8vcmVhY3RkaWdlc3QubmV0L2xpbmtzLzEyMTI0L3JlZGlyZWN0P3N1YnNjcmliZXJfaWQ9YWE4MmUxZWMtZWFlNS00N2ZmLTlkOWMtNjQ1Zjk1MzhkMjgzJnV0bV9tZWRpdW09ZW1haWwgKQ0NCg0NCg0NCldvdWxkIHlvdXIgUmVhY3QgYXBwIHdvcmsgYmVzdCB3aXRoIGEgcmljaC10ZXh0IGVkaXRvciBvciBhDQ0KdGV4dCBhcmVhIHdoZXJlIHVzZXJzIGNhbiBpbnB1dCBpbmZvcm1hdGlvbj8gVGhpcyBwb3N0IGNhbiBoZWxwDQ0KeW91IGRlY2lkZSBhbmQgbGVhcm4gaG93IHRvIGltcGxlbWVudCB0aGUgYmVzdCBjaG9pY2UuDQ0KDQ0KLS0tLS0tLS0tLS0tLS0tLS0tLS0NDQp0aGlzIHdlZWsncyBmYXZvcml0ZQ0NCi0tLS0tLS0tLS0tLS0tLS0tLS0tDQ0KDQ0KSG93IHRvIGFuaW1hdGUgbXVsdGlwbGF5ZXIgY3Vyc29ycyANDQooIGh0dHBzOi8vcmVhY3RkaWdlc3QubmV0L2xpbmtzLzEyMTI2L3JlZGlyZWN0P3N1YnNjcmliZXJfaWQ9YWE4MmUxZWMtZWFlNS00N2ZmLTlkOWMtNjQ1Zjk1MzhkMjgzJnV0bV9tZWRpdW09ZW1haWwgKQ0NCg0NCg0NCk11bHRpcGxheWVyIGN1cnNvcnMgYXJlIGJlY29taW5nIGFuIGluY3JlYXNpbmdseSBjb21tb24gc2lnaHQNDQphY3Jvc3MgYWxsIHNvcnRzIG9mIGNvbGxhYm9yYXRpdmUgdG9vbHMsIGJ1dCBoYXZlIHlvdSBldmVyDQ0Kd29uZGVyZWQgaG93IHRoZXnigJlyZSBhbmltYXRlZD8gQW5pbWF0aW5nIHJlYWwtdGltZSBjdXJzb3JzIGlzDQ0KbW9yZSBjb21wbGV4IHRoYW4gaXQgZmlyc3QgbWF5IHNlZW0sIHRoYW5rcyB0byBuZXR3b3JrIGFuZA0NCmNvbm5lY3Rpb24gbGltaXRhdGlvbnMuIEhlcmXigJlzIGEgcXVpY2sgb3ZlcnZpZXcgb2YgYSBmZXcNDQpkaWZmZXJlbnQgbWV0aG9kcywgd2l0aCBzb21lIFJlYWN0IHNuaXBwZXRzIHRvIGdldCB5b3Ugc3RhcnRlZC4NDQpMZXTigJlzIGRpdmUgaW4hDQ0KDQ0KSG93IHRvIHJlZmFjdG9yIGxhcmdlIFJlYWN0IGNvbXBvbmVudHMgDQ0KKCBodHRwczovL3JlYWN0ZGlnZXN0Lm5ldC9saW5rcy8xMjEzMC9yZWRpcmVjdD9zdWJzY3JpYmVyX2lkPWFhODJlMWVjLWVhZTUtNDdmZi05ZDljLTY0NWY5NTM4ZDI4MyZ1dG1fbWVkaXVtPWVtYWlsICkNDQoNDQoNDQpXZSBhcmUgYWx3YXlzIGV4Y2l0ZWQgYWJvdXQgdGhlIG5ldyBzaGlueSB0aGluZ3MgdGhhdCBjb21lDQ0Kb3V0IGV2ZXJ5IHdlZWsgaW4gdGhlIHByb2dyYW1taW5nIHdvcmxkLCBmcm9tIG5ldyB3YXlzIHRvDQ0Kc3RydWN0dXJlIGNvbXBvbmVudHMgdG8gbmV3IHRlY2huaXF1ZXMgdG8gcmVkdWNlIHRob3NlIHR3byBsaW5lcw0NCm9mIGNvZGUuDQ0KDQ0KVGhlIG15c3Rlcnkgb2YgUmVhY3QgRWxlbWVudCwgY2hpbGRyZW4sIHBhcmVudHMgYW5kIHJlLXJlbmRlcnMNDQoNDQooIGh0dHBzOi8vcmVhY3RkaWdlc3QubmV0L2xpbmtzLzEyMTQyL3JlZGlyZWN0P3N1YnNjcmliZXJfaWQ9YWE4MmUxZWMtZWFlNS00N2ZmLTlkOWMtNjQ1Zjk1MzhkMjgzJnV0bV9tZWRpdW09ZW1haWwgKQ0NCg0NCg0NCkNoaWxkcmVuIGFyZSBub3QgY2hpbGRyZW4sIHBhcmVudHMgYXJlIG5vdCBwYXJlbnRzLA0NCm1lbW9pemF0aW9uIGRvZXNu4oCZdCB3b3JrIGFzIGl0IHNob3VsZCwgbGlmZSBpcyBtZWFuaW5nbGVzcywNDQpyZS1yZW5kZXJzIGNvbnRyb2wgb3VyIGxpZmUgYW5kIG5vdGhpbmcgY2FuIHN0b3AgdGhlbS4NDQoNDQp1c2VDb25maXJt4oCK4oCU4oCKQSBjdXN0b20gUmVhY3QgaG9vayB0byBwcm9tcHQgY29uZmlybWF0aW9uIGJlZm9yZQ0NCmFjdGlvbiANDQooIGh0dHBzOi8vcmVhY3RkaWdlc3QubmV0L2xpbmtzLzEyMTQ1L3JlZGlyZWN0P3N1YnNjcmliZXJfaWQ9YWE4MmUxZWMtZWFlNS00N2ZmLTlkOWMtNjQ1Zjk1MzhkMjgzJnV0bV9tZWRpdW09ZW1haWwgKQ0NCg0NCg0NCldoZW4gZGV2ZWxvcGluZyBXZWIgYXBwbGljYXRpb25zLCBzb21ldGltZXMgd2UgaGF2ZSB0byBwcm9tcHQNDQphIGNvbmZpcm1hdGlvbiBkaWFsb2cgdG8gdXNlciBiZWZvcmUgcGVyZm9ybWluZyBhbiBhY3Rpb24gKGUuZy4NDQpkZWxldGUgdXNlcikuIEl04oCZcyBpbmVmZmljaWVudCB0byBjcmVhdGUgbXVsdGlwbGUgZGlhbG9ncyBhbmQNDQppdOKAmXMgaGFyZCB0byBtYWludGFpbiBhIGJ1bmNoIG9mIGR1cGxpY2F0ZSBsb2dpY3MgYWNyb3NzDQ0KY29tcG9uZW50cy4gTGV04oCZcyBjcmVhdGUgb3VyIG93biB1c2VDb25maXJtIGhvb2sgZnJvbSBzY3JhdGNoLg0NCg0NCkFwb2xsbyBTdXBlcmdyYXBoOiBBIEdyYXBoUUwgc3RhY2sgZm9yIGV2ZXJ5dGhpbmcgDQ0KKCBodHRwczovL3JlYWN0ZGlnZXN0Lm5ldC9saW5rcy8xMjA5Mi9yZWRpcmVjdD9zdWJzY3JpYmVyX2lkPWFhODJlMWVjLWVhZTUtNDdmZi05ZDljLTY0NWY5NTM4ZDI4MyZ1dG1fbWVkaXVtPWVtYWlsICkNDQoNDQoNDQpUaGUgZm9sa3MgYXQgQXBvbGxvIGhhdmUgYmVlbiB3b3JraW5nIHdpdGggR3JhcGhRTCBzaW5jZQ0NCjIwMTYsIGJhY2sgd2hlbiB0aGV5IHdlcmUgc3RpbGwgTWV0ZW9yIFNvZnR3YXJlLiBWZXJzYXRpbGl0eSBoYXMNDQphbHdheXMgYmVlbiBhdCB0aGUgY29yZSBvZiBBcG9sbG8sIHdoZW4gdGhleSByZWxlYXNlZCB0aGVpcg0NCkdyYXBoUUwtYmFzZWQgZGF0YXN0YWNrIGluIDIwMTYgaXRzIGNhbGxpbmcgY2FyZCB3YXMg4oCYYW55DQ0KYmFja2VuZCwgYW55IGxhbmd1YWdlLCBhbnkgY2xpZW504oCZLiBUaGUgaWRlYSB3YXMgY2xlYXIsIHRvIGhhdmUNDQpvbmUgdG9vbCBmb3IgYnVpbGRpbmcgYSBHcmFwaFFMIGNsaWVudCBhbmQgc2VydmVyIHdoaWNoIGNhbiB0aGVuDQ0KYmUgdXNlZCB0byBlaXRoZXIgYnVpbGQgYSBuZXcgYXBwIGZyb20gc2NyYXRjaCBvciBmaXQgaW50byBhbg0NCmV4aXN0aW5nIHByb2plY3QsIHNvIHRoYXQgaXQgY2FuIHRha2UgZnVsbCBhZHZhbnRhZ2Ugb2YgdGhlIHBlcmtzDQ0Kb2YgR3JhcGhRTC4NDQoNDQotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tDQ0KaG93IGRpZCB5b3UgbGlrZSB0aGlzIGlzc3VlPw0NCi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0NDQoNDQoxID0gZGlkbid0IGxpa2UgaXQgYXQgYWxsIGFuZCA1ID0gbG92ZWQgaXQgYW5kIHNoYXJlZCBpdCB3aXRoDQ0KZXZlcnlvbmUgSSBrbm93DQ0KDQ0KKiAxIA0NCiggaHR0cHM6Ly9yZWFjdGRpZ2VzdC5uZXQvcmF0aW5ncy9uZXc_ZGlnZXN0PXJlYWN0Jmlzc3VlPTM2NCZyYXRpbmc9MSZzdWJzY3JpYmVyX2lkPWFhODJlMWVjLWVhZTUtNDdmZi05ZDljLTY0NWY5NTM4ZDI4MyApDQ0KDQ0KKiAyIA0NCiggaHR0cHM6Ly9yZWFjdGRpZ2VzdC5uZXQvcmF0aW5ncy9uZXc_ZGlnZXN0PXJlYWN0Jmlzc3VlPTM2NCZyYXRpbmc9MiZzdWJzY3JpYmVyX2lkPWFhODJlMWVjLWVhZTUtNDdmZi05ZDljLTY0NWY5NTM4ZDI4MyApDQ0KDQ0KKiAzIA0NCiggaHR0cHM6Ly9yZWFjdGRpZ2VzdC5uZXQvcmF0aW5ncy9uZXc_ZGlnZXN0PXJlYWN0Jmlzc3VlPTM2NCZyYXRpbmc9MyZzdWJzY3JpYmVyX2lkPWFhODJlMWVjLWVhZTUtNDdmZi05ZDljLTY0NWY5NTM4ZDI4MyApDQ0KDQ0KKiA0IA0NCiggaHR0cHM6Ly9yZWFjdGRpZ2VzdC5uZXQvcmF0aW5ncy9uZXc_ZGlnZXN0PXJlYWN0Jmlzc3VlPTM2NCZyYXRpbmc9NCZzdWJzY3JpYmVyX2lkPWFhODJlMWVjLWVhZTUtNDdmZi05ZDljLTY0NWY5NTM4ZDI4MyApDQ0KDQ0KKiA1IA0NCiggaHR0cHM6Ly9yZWFjdGRpZ2VzdC5uZXQvcmF0aW5ncy9uZXc_ZGlnZXN0PXJlYWN0Jmlzc3VlPTM2NCZyYXRpbmc9NSZzdWJzY3JpYmVyX2lkPWFhODJlMWVjLWVhZTUtNDdmZi05ZDljLTY0NWY5NTM4ZDI4MyApDQ0KDQ0KDQ0KLS0tLS0tLS0tLS0NDQpuZXdzbGV0dGVycw0NCi0tLS0tLS0tLS0tDQ0KDQ0KKiBEYWlseSBUZWNoIA0NCiggaHR0cHM6Ly9kYWlseXRlY2guZW1haWw_dXRtX3NvdXJjZT1yZWFjdCZ1dG1fbWVkaXVtPWVtYWlsJnV0bV9jYW1wYWlnbj1mb290ZXIgKQ0NCg0NCiogUHJvZ3JhbW1pbmcgRGlnZXN0IA0NCiggaHR0cHM6Ly9wcm9ncmFtbWluZ2RpZ2VzdC5uZXQ_dXRtX3NvdXJjZT1yZWFjdCZ1dG1fbWVkaXVtPWVtYWlsJnV0bV9jYW1wYWlnbj1mb290ZXIgKQ0NCg0NCiogVGVjaCBMZWFkIERpZ2VzdCANDQooIGh0dHBzOi8vdGVjaGxlYWRkaWdlc3QubmV0P3V0bV9zb3VyY2U9cmVhY3QmdXRtX21lZGl1bT1lbWFpbCZ1dG1fY2FtcGFpZ249Zm9vdGVyICkNDQoNDQoqIEMjIERpZ2VzdCANDQooIGh0dHBzOi8vY3NoYXJwZGlnZXN0Lm5ldD91dG1fc291cmNlPXJlYWN0JnV0bV9tZWRpdW09ZW1haWwmdXRtX2NhbXBhaWduPWZvb3RlciApDQ0KDQ0KDQ0KwqkgMjAyMiBCb25vYm8gUHJlc3MgKCBodHRwczovL2Jvbm9ib3ByZXNzLmNvbS8gKQ0NCg0NCldvdWxkIHlvdSBsaWtlIHRvIGFkdmVydGlzZSANDQooIGh0dHBzOi8vcmVhY3RkaWdlc3QubmV0L2FkdmVydGlzZSApIHdpdGggdXM_IENoZWNrIG91dCBvdXIgbGF0ZXN0DQ0KbWVkaWEga2l0ICggaHR0cHM6Ly9ib25vYm9wcmVzcy5jb20vbWVkaWEta2l0ICkgZm9yIG1vcmUNDQppbmZvcm1hdGlvbi4NDQoNDQpJZiB5b3Ugbm8gbG9uZ2VyIHdpc2ggdG8gcmVjZWl2ZSB0aGVzZSBlbWFpbHMsIGNsaWNrIHRvDQ0KdW5zdWJzY3JpYmUgDQ0KKCBodHRwczovL3JlYWN0ZGlnZXN0Lm5ldC9zdWJzY3JpYmVycy9hYTgyZTFlYy1lYWU1LTQ3ZmYtOWQ5Yy02NDVmOTUzOGQyODMvdW5zdWJzY3JpYmUgKQ0NCi4=',
          },
        },
        {
          partId: '1',
          mimeType: 'text/html',
          filename: '',
          headers: [
            {
              name: 'Content-Type',
              value: 'text/html; charset=utf-8',
            },
            {
              name: 'Content-Transfer-Encoding',
              value: 'quoted-printable',
            },
          ],
          body: {
            size: 10169,
            data: 'PCFET0NUWVBFIGh0bWw-DQ0KPGh0bWwgbGFuZz0iZW4iIHN0eWxlPSJtaW4taGVpZ2h0OiAxMDAlOyB0b3A6IDA7IGxlZnQ6IDA7IG1hcmdpbjogMDsgcGFkZGluZzogMDsiPg0NCiAgPGhlYWQ-DQ0KICA8bWV0YSBodHRwLWVxdWl2PSJDb250ZW50LVR5cGUiIGNvbnRlbnQ9InRleHQvaHRtbDsgY2hhcnNldD1VVEYtOCI-DQ0KICA8bWV0YSBjaGFyc2V0PSJ1dGYtOCI-DQ0KICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCI-DQ0KICANDQogIDxzdHlsZT5ib2R5IHsNDQptaW4taGVpZ2h0OiAxMDAlOyBtYXJnaW46IDA7IHBhZGRpbmc6IDA7IHRvcDogMDsgbGVmdDogMDsNDQp9DQ0KYm9keSB7DQ0KZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7IGNvbG9yOiAjMjIyOyB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5OyBoeXBoZW5zOiBhdXRvOyBsaW5lLWhlaWdodDogMTQ1JTsgZm9udC1zaXplOiAxNnB4Ow0NCn0NDQphOmhvdmVyIHsNDQp0ZXh0LWRlY29yYXRpb246IG5vbmU7DQ0KfQ0NCi5wcm9ncmFtbWluZyBhOnZpc2l0ZWQgew0NCmNvbG9yOiAjQ0MzNDJEOw0NCn0NDQoucHJvZ3JhbW1pbmcgYTphY3RpdmUgew0NCmNvbG9yOiAjQ0MzNDJEOw0NCn0NDQoucmVhY3QgYTp2aXNpdGVkIHsNDQpjb2xvcjogIzJGOTJDQzsNDQp9DQ0KLnJlYWN0IGE6YWN0aXZlIHsNDQpjb2xvcjogIzJGOTJDQzsNDQp9DQ0KLmNzaGFycCBhOnZpc2l0ZWQgew0NCmNvbG9yOiAjMDAwMGVlOw0NCn0NDQouY3NoYXJwIGE6YWN0aXZlIHsNDQpjb2xvcjogIzAwMDBlZTsNDQp9DQ0KLnRlY2hsZWFkIGE6dmlzaXRlZCB7DQ0KY29sb3I6IHNhbG1vbjsNDQp9DQ0KLnRlY2hsZWFkIGE6YWN0aXZlIHsNDQpjb2xvcjogc2FsbW9uOw0NCn0NDQouZGFpbHl0ZWNoIGE6dmlzaXRlZCB7DQ0KY29sb3I6IGNob2NvbGF0ZTsNDQp9DQ0KLmRhaWx5dGVjaCBhOmFjdGl2ZSB7DQ0KY29sb3I6IGNob2NvbGF0ZTsNDQp9DQ0KYm9keSB7DQ0KcGFkZGluZzogMWVtOyBtYXgtd2lkdGg6IDY0MHB4Ow0NCn0NDQpmb290ZXIgYTp2aXNpdGVkIHsNDQpjb2xvcjogIzY2NiAhaW1wb3J0YW50Ow0NCn0NDQpmb290ZXIgYTphY3RpdmUgew0NCmNvbG9yOiAjNjY2ICFpbXBvcnRhbnQ7DQ0KfQ0NCjwvc3R5bGU-DQ0KPC9oZWFkPg0NCjxib2R5IGNsYXNzPSJyZWFjdCIgc3R5bGU9Im1pbi1oZWlnaHQ6IDEwMCU7IHRvcDogMDsgbGVmdDogMDsgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7IGNvbG9yOiAjMjIyOyB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5OyBoeXBoZW5zOiBhdXRvOyBsaW5lLWhlaWdodDogMTQ1JTsgZm9udC1zaXplOiAxNnB4OyBtYXgtd2lkdGg6IDY0MHB4OyBtYXJnaW46IDA7IHBhZGRpbmc6IDFlbTsiPg0NCiAgPHAgc3R5bGU9ImRpc3BsYXk6IG5vbmU7IG1hcmdpbjogMWVtIDA7Ij5BbmQgbW9yZSBuZXdzLCB0dXRvcmlhbHMgYW5kIGFydGljbGVzIGFib3V0IFJlYWN0IGluIHRoaXMgd2VlaydzIGlzc3VlLjwvcD4NDQogIDx0YWJsZSBjbGFzcz0iaGVhZGVyIiBzdHlsZT0iZm9udC1zaXplOiA4NSU7IHdpZHRoOiAxMDAlOyBjb2xvcjogIzY2NjsiPg0NCiAgICA8dHI-DQ0KICAgICAgPHRkIHN0eWxlPSJ3aWR0aDogNTAlOyI-IzM2NCDigJQgSnVseSAxMSwgMjAyMjwvdGQ-DQ0KICAgICAgPHRkIHN0eWxlPSJ3aWR0aDogNTAlOyIgYWxpZ249InJpZ2h0Ij48YSBocmVmPSJodHRwczovL3JlYWN0ZGlnZXN0Lm5ldC9kaWdlc3RzLzM2NCIgc3R5bGU9ImNvbG9yOiAjMkY5MkNDOyI-VmlldyBpbiBicm93c2VyPC9hPjwvdGQ-DQ0KICAgIDwvdHI-DQ0KICA8L3RhYmxlPg0NCiAgPHAgc3R5bGU9Im1hcmdpbjogMWVtIDA7Ij48L3A-DQ0KICA8aDEgc3R5bGU9ImxpbmUtaGVpZ2h0OiAxMjUlOyBmb250LXdlaWdodDogYm9sZDsgZm9udC1zaXplOiAxLjVlbTsgY29sb3I6ICMyRjkyQ0M7IG1hcmdpbjogMC41ZW0gMCAxZW07Ij5SZWFjdCBEaWdlc3Q8L2gxPg0NCg0NCiAgICA8cCBzdHlsZT0ibWFyZ2luOiAxZW0gMDsiPlNwcmVhZCB0aGUgd29yZCwgYnVpbGQgdGhlIGNvbW11bml0eSwgPGEgaHJlZj0ibWFpbHRvOj9zdWJqZWN0PUNoZWNrJTIwUmVhY3QlMjBEaWdlc3QlMjBvdXQlMjAmYW1wO2JvZHk9SGVsbG8lMkMlMEQlMEElMEQlMEFSZWFjdCUyMERpZ2VzdCUyMGlzJTIwYSUyMHdlZWtseSUyMG5ld3NsZXR0ZXIlMjB0aGF0JTIweW91JTIwbWlnaHQlMjBsaWtlLiUyMENoZWNrJTIwaXQlMjBvdXQlMjBhdCUyMGh0dHBzJTNBJTJGJTJGcmVhY3RkaWdlc3QubmV0IiBzdHlsZT0iY29sb3I6ICMyRjkyQ0M7Ij5zaGFyZSB0aGUga25vd2xlZGdlIHdpdGggeW91ciBmcmllbmRzPC9hPi48L3A-DQ0KDQ0KDQ0KICAgIDxoMiBzdHlsZT0ibGluZS1oZWlnaHQ6IDEyNSU7IGZvbnQtd2VpZ2h0OiBib2xkOyBmb250LXNpemU6IDEuM2VtOyBtYXJnaW46IDFlbSAwOyI-c3BvbnNvcjwvaDI-DQ0KICAgICAgPGRpdiBjbGFzcz0iZGlnZXN0LWFydGljbGUgIj4NDQogIDxwIGNsYXNzPSJ0aXRsZSIgc3R5bGU9Im1hcmdpbjogMDsiPg0NCiAgPGEgdGFyZ2V0PSJfYmxhbmsiIHJlbD0ibm9mb2xsb3ciIGhyZWY9Imh0dHBzOi8vcmVhY3RkaWdlc3QubmV0L2xpbmtzLzEyMTI0L3JlZGlyZWN0P3N1YnNjcmliZXJfaWQ9YWE4MmUxZWMtZWFlNS00N2ZmLTlkOWMtNjQ1Zjk1MzhkMjgzJmFtcDt1dG1fbWVkaXVtPWVtYWlsIiBzdHlsZT0iY29sb3I6ICMyRjkyQ0M7Ij5SZWFjdCBFZGl0b3Igb3IgVGV4dCBBcmVh4oCUSG93IFRvIENob29zZT88L2E-DQ0KICA8L3A-DQ0KICAgIDxwIGNsYXNzPSJkZXNjcmlwdGlvbiIgc3R5bGU9ImxpbmUtaGVpZ2h0OiAxNDUlOyBtYXJnaW46IDAuM2VtIDAgMS41ZW07Ij5Xb3VsZCB5b3VyIFJlYWN0IGFwcCB3b3JrIGJlc3Qgd2l0aCBhIHJpY2gtdGV4dCBlZGl0b3Igb3IgYSB0ZXh0IGFyZWEgd2hlcmUgdXNlcnMgY2FuIGlucHV0IGluZm9ybWF0aW9uPyBUaGlzIHBvc3QgY2FuIGhlbHAgeW91IGRlY2lkZSBhbmQgbGVhcm4gaG93IHRvIGltcGxlbWVudCB0aGUgYmVzdCBjaG9pY2UuPC9wPg0NCjwvZGl2Pg0NCg0NCiAgICA8aDIgc3R5bGU9ImxpbmUtaGVpZ2h0OiAxMjUlOyBmb250LXdlaWdodDogYm9sZDsgZm9udC1zaXplOiAxLjNlbTsgbWFyZ2luOiAxZW0gMDsiPnRoaXMgd2VlaydzIGZhdm9yaXRlPC9oMj4NDQogICAgICA8ZGl2IGNsYXNzPSJkaWdlc3QtYXJ0aWNsZSAiPg0NCiAgPHAgY2xhc3M9InRpdGxlIiBzdHlsZT0ibWFyZ2luOiAwOyI-DQ0KICA8YSB0YXJnZXQ9Il9ibGFuayIgaHJlZj0iaHR0cHM6Ly9yZWFjdGRpZ2VzdC5uZXQvbGlua3MvMTIxMjYvcmVkaXJlY3Q_c3Vic2NyaWJlcl9pZD1hYTgyZTFlYy1lYWU1LTQ3ZmYtOWQ5Yy02NDVmOTUzOGQyODMmYW1wO3V0bV9tZWRpdW09ZW1haWwiIHN0eWxlPSJjb2xvcjogIzJGOTJDQzsiPkhvdyB0byBhbmltYXRlIG11bHRpcGxheWVyIGN1cnNvcnM8L2E-DQ0KICA8L3A-DQ0KICAgIDxwIGNsYXNzPSJkZXNjcmlwdGlvbiIgc3R5bGU9ImxpbmUtaGVpZ2h0OiAxNDUlOyBtYXJnaW46IDAuM2VtIDAgMS41ZW07Ij5NdWx0aXBsYXllciBjdXJzb3JzIGFyZSBiZWNvbWluZyBhbiBpbmNyZWFzaW5nbHkgY29tbW9uIHNpZ2h0IGFjcm9zcyBhbGwgc29ydHMgb2YgY29sbGFib3JhdGl2ZSB0b29scywgYnV0IGhhdmUgeW91IGV2ZXIgd29uZGVyZWQgaG93IHRoZXnigJlyZSBhbmltYXRlZD8gQW5pbWF0aW5nIHJlYWwtdGltZSBjdXJzb3JzIGlzIG1vcmUgY29tcGxleCB0aGFuIGl0IGZpcnN0IG1heSBzZWVtLCB0aGFua3MgdG8gbmV0d29yayBhbmQgY29ubmVjdGlvbiBsaW1pdGF0aW9ucy4gSGVyZeKAmXMgYSBxdWljayBvdmVydmlldyBvZiBhIGZldyBkaWZmZXJlbnQgbWV0aG9kcywgd2l0aCBzb21lIFJlYWN0IHNuaXBwZXRzIHRvIGdldCB5b3Ugc3RhcnRlZC4gTGV04oCZcyBkaXZlIGluIQ0NCjwvcD4NDQo8L2Rpdj4NDQoNDQogICAgICA8ZGl2IGNsYXNzPSJkaWdlc3QtYXJ0aWNsZSAiPg0NCiAgPHAgY2xhc3M9InRpdGxlIiBzdHlsZT0ibWFyZ2luOiAwOyI-DQ0KICA8YSB0YXJnZXQ9Il9ibGFuayIgaHJlZj0iaHR0cHM6Ly9yZWFjdGRpZ2VzdC5uZXQvbGlua3MvMTIxMzAvcmVkaXJlY3Q_c3Vic2NyaWJlcl9pZD1hYTgyZTFlYy1lYWU1LTQ3ZmYtOWQ5Yy02NDVmOTUzOGQyODMmYW1wO3V0bV9tZWRpdW09ZW1haWwiIHN0eWxlPSJjb2xvcjogIzJGOTJDQzsiPkhvdyB0byByZWZhY3RvciBsYXJnZSBSZWFjdCBjb21wb25lbnRzPC9hPg0NCiAgPC9wPg0NCiAgICA8cCBjbGFzcz0iZGVzY3JpcHRpb24iIHN0eWxlPSJsaW5lLWhlaWdodDogMTQ1JTsgbWFyZ2luOiAwLjNlbSAwIDEuNWVtOyI-V2UgYXJlIGFsd2F5cyBleGNpdGVkIGFib3V0IHRoZSBuZXcgc2hpbnkgdGhpbmdzIHRoYXQgY29tZSBvdXQgZXZlcnkgd2VlayBpbiB0aGUgcHJvZ3JhbW1pbmcgd29ybGQsIGZyb20gbmV3IHdheXMgdG8gc3RydWN0dXJlIGNvbXBvbmVudHMgdG8gbmV3IHRlY2huaXF1ZXMgdG8gcmVkdWNlIHRob3NlIHR3byBsaW5lcyBvZiBjb2RlLjwvcD4NDQo8L2Rpdj4NDQoNDQogICAgICA8ZGl2IGNsYXNzPSJkaWdlc3QtYXJ0aWNsZSAiPg0NCiAgPHAgY2xhc3M9InRpdGxlIiBzdHlsZT0ibWFyZ2luOiAwOyI-DQ0KICA8YSB0YXJnZXQ9Il9ibGFuayIgaHJlZj0iaHR0cHM6Ly9yZWFjdGRpZ2VzdC5uZXQvbGlua3MvMTIxNDIvcmVkaXJlY3Q_c3Vic2NyaWJlcl9pZD1hYTgyZTFlYy1lYWU1LTQ3ZmYtOWQ5Yy02NDVmOTUzOGQyODMmYW1wO3V0bV9tZWRpdW09ZW1haWwiIHN0eWxlPSJjb2xvcjogIzJGOTJDQzsiPlRoZSBteXN0ZXJ5IG9mIFJlYWN0IEVsZW1lbnQsIGNoaWxkcmVuLCBwYXJlbnRzIGFuZCByZS1yZW5kZXJzPC9hPg0NCiAgPC9wPg0NCiAgICA8cCBjbGFzcz0iZGVzY3JpcHRpb24iIHN0eWxlPSJsaW5lLWhlaWdodDogMTQ1JTsgbWFyZ2luOiAwLjNlbSAwIDEuNWVtOyI-Q2hpbGRyZW4gYXJlIG5vdCBjaGlsZHJlbiwgcGFyZW50cyBhcmUgbm90IHBhcmVudHMsIG1lbW9pemF0aW9uIGRvZXNu4oCZdCB3b3JrIGFzIGl0IHNob3VsZCwgbGlmZSBpcyBtZWFuaW5nbGVzcywgcmUtcmVuZGVycyBjb250cm9sIG91ciBsaWZlIGFuZCBub3RoaW5nIGNhbiBzdG9wIHRoZW0uPC9wPg0NCjwvZGl2Pg0NCg0NCiAgICAgIDxkaXYgY2xhc3M9ImRpZ2VzdC1hcnRpY2xlICI-DQ0KICA8cCBjbGFzcz0idGl0bGUiIHN0eWxlPSJtYXJnaW46IDA7Ij4NDQogIDxhIHRhcmdldD0iX2JsYW5rIiBocmVmPSJodHRwczovL3JlYWN0ZGlnZXN0Lm5ldC9saW5rcy8xMjE0NS9yZWRpcmVjdD9zdWJzY3JpYmVyX2lkPWFhODJlMWVjLWVhZTUtNDdmZi05ZDljLTY0NWY5NTM4ZDI4MyZhbXA7dXRtX21lZGl1bT1lbWFpbCIgc3R5bGU9ImNvbG9yOiAjMkY5MkNDOyI-dXNlQ29uZmlybeKAiuKAlOKAikEgY3VzdG9tIFJlYWN0IGhvb2sgdG8gcHJvbXB0IGNvbmZpcm1hdGlvbiBiZWZvcmUgYWN0aW9uPC9hPg0NCiAgPC9wPg0NCiAgICA8cCBjbGFzcz0iZGVzY3JpcHRpb24iIHN0eWxlPSJsaW5lLWhlaWdodDogMTQ1JTsgbWFyZ2luOiAwLjNlbSAwIDEuNWVtOyI-V2hlbiBkZXZlbG9waW5nIFdlYiBhcHBsaWNhdGlvbnMsIHNvbWV0aW1lcyB3ZSBoYXZlIHRvIHByb21wdCBhIGNvbmZpcm1hdGlvbiBkaWFsb2cgdG8gdXNlciBiZWZvcmUgcGVyZm9ybWluZyBhbiBhY3Rpb24gKGUuZy4gZGVsZXRlIHVzZXIpLiBJdOKAmXMgaW5lZmZpY2llbnQgdG8gY3JlYXRlIG11bHRpcGxlIGRpYWxvZ3MgYW5kIGl04oCZcyBoYXJkIHRvIG1haW50YWluIGEgYnVuY2ggb2YgZHVwbGljYXRlIGxvZ2ljcyBhY3Jvc3MgY29tcG9uZW50cy4gTGV04oCZcyBjcmVhdGUgb3VyIG93biB1c2VDb25maXJtIGhvb2sgZnJvbSBzY3JhdGNoLjwvcD4NDQo8L2Rpdj4NDQoNDQogICAgICA8ZGl2IGNsYXNzPSJkaWdlc3QtYXJ0aWNsZSAiPg0NCiAgPHAgY2xhc3M9InRpdGxlIiBzdHlsZT0ibWFyZ2luOiAwOyI-DQ0KICA8YSB0YXJnZXQ9Il9ibGFuayIgaHJlZj0iaHR0cHM6Ly9yZWFjdGRpZ2VzdC5uZXQvbGlua3MvMTIwOTIvcmVkaXJlY3Q_c3Vic2NyaWJlcl9pZD1hYTgyZTFlYy1lYWU1LTQ3ZmYtOWQ5Yy02NDVmOTUzOGQyODMmYW1wO3V0bV9tZWRpdW09ZW1haWwiIHN0eWxlPSJjb2xvcjogIzJGOTJDQzsiPkFwb2xsbyBTdXBlcmdyYXBoOiBBIEdyYXBoUUwgc3RhY2sgZm9yIGV2ZXJ5dGhpbmc8L2E-DQ0KICA8L3A-DQ0KICAgIDxwIGNsYXNzPSJkZXNjcmlwdGlvbiIgc3R5bGU9ImxpbmUtaGVpZ2h0OiAxNDUlOyBtYXJnaW46IDAuM2VtIDAgMS41ZW07Ij5UaGUgZm9sa3MgYXQgQXBvbGxvIGhhdmUgYmVlbiB3b3JraW5nIHdpdGggR3JhcGhRTCBzaW5jZSAyMDE2LCBiYWNrIHdoZW4gdGhleSB3ZXJlIHN0aWxsIE1ldGVvciBTb2Z0d2FyZS4gVmVyc2F0aWxpdHkgaGFzIGFsd2F5cyBiZWVuIGF0IHRoZSBjb3JlIG9mIEFwb2xsbywgd2hlbiB0aGV5IHJlbGVhc2VkIHRoZWlyIEdyYXBoUUwtYmFzZWQgZGF0YXN0YWNrIGluIDIwMTYgaXRzIGNhbGxpbmcgY2FyZCB3YXMg4oCYYW55IGJhY2tlbmQsIGFueSBsYW5ndWFnZSwgYW55IGNsaWVudOKAmS4gVGhlIGlkZWEgd2FzIGNsZWFyLCB0byBoYXZlIG9uZSB0b29sIGZvciBidWlsZGluZyBhIEdyYXBoUUwgY2xpZW50IGFuZCBzZXJ2ZXIgd2hpY2ggY2FuIHRoZW4gYmUgdXNlZCB0byBlaXRoZXIgYnVpbGQgYSBuZXcgYXBwIGZyb20gc2NyYXRjaCBvciBmaXQgaW50byBhbiBleGlzdGluZyBwcm9qZWN0LCBzbyB0aGF0IGl0IGNhbiB0YWtlIGZ1bGwgYWR2YW50YWdlIG9mIHRoZSBwZXJrcyBvZiBHcmFwaFFMLjwvcD4NDQo8L2Rpdj4NDQoNDQoNDQogIDxoMiBzdHlsZT0ibGluZS1oZWlnaHQ6IDEyNSU7IGZvbnQtd2VpZ2h0OiBib2xkOyBmb250LXNpemU6IDEuM2VtOyBtYXJnaW46IDFlbSAwOyI-aG93IGRpZCB5b3UgbGlrZSB0aGlzIGlzc3VlPzwvaDI-DQ0KICA8cCBzdHlsZT0ibWFyZ2luOiAxZW0gMDsiPjEgPSBkaWRuJ3QgbGlrZSBpdCBhdCBhbGwgYW5kIDUgPSBsb3ZlZCBpdCBhbmQgc2hhcmVkIGl0IHdpdGggZXZlcnlvbmUgSSBrbm93PC9wPg0NCiAgPHVsIGNsYXNzPSJyYXRpbmciIHN0eWxlPSJwYWRkaW5nLWxlZnQ6IDA7IGxpc3Qtc3R5bGUtdHlwZTogbm9uZTsiPg0NCiAgICA8bGkgc3R5bGU9ImRpc3BsYXk6IGlubGluZS1ibG9jazsgbWFyZ2luLXJpZ2h0OiAxZW07Ij48YSB0YXJnZXQ9Il9ibGFuayIgaHJlZj0iaHR0cHM6Ly9yZWFjdGRpZ2VzdC5uZXQvcmF0aW5ncy9uZXc_ZGlnZXN0PXJlYWN0JmFtcDtpc3N1ZT0zNjQmYW1wO3JhdGluZz0xJmFtcDtzdWJzY3JpYmVyX2lkPWFhODJlMWVjLWVhZTUtNDdmZi05ZDljLTY0NWY5NTM4ZDI4MyIgc3R5bGU9ImNvbG9yOiAjMkY5MkNDOyI-MTwvYT48L2xpPg0NCiAgICA8bGkgc3R5bGU9ImRpc3BsYXk6IGlubGluZS1ibG9jazsgbWFyZ2luLXJpZ2h0OiAxZW07Ij48YSB0YXJnZXQ9Il9ibGFuayIgaHJlZj0iaHR0cHM6Ly9yZWFjdGRpZ2VzdC5uZXQvcmF0aW5ncy9uZXc_ZGlnZXN0PXJlYWN0JmFtcDtpc3N1ZT0zNjQmYW1wO3JhdGluZz0yJmFtcDtzdWJzY3JpYmVyX2lkPWFhODJlMWVjLWVhZTUtNDdmZi05ZDljLTY0NWY5NTM4ZDI4MyIgc3R5bGU9ImNvbG9yOiAjMkY5MkNDOyI-MjwvYT48L2xpPg0NCiAgICA8bGkgc3R5bGU9ImRpc3BsYXk6IGlubGluZS1ibG9jazsgbWFyZ2luLXJpZ2h0OiAxZW07Ij48YSB0YXJnZXQ9Il9ibGFuayIgaHJlZj0iaHR0cHM6Ly9yZWFjdGRpZ2VzdC5uZXQvcmF0aW5ncy9uZXc_ZGlnZXN0PXJlYWN0JmFtcDtpc3N1ZT0zNjQmYW1wO3JhdGluZz0zJmFtcDtzdWJzY3JpYmVyX2lkPWFhODJlMWVjLWVhZTUtNDdmZi05ZDljLTY0NWY5NTM4ZDI4MyIgc3R5bGU9ImNvbG9yOiAjMkY5MkNDOyI-MzwvYT48L2xpPg0NCiAgICA8bGkgc3R5bGU9ImRpc3BsYXk6IGlubGluZS1ibG9jazsgbWFyZ2luLXJpZ2h0OiAxZW07Ij48YSB0YXJnZXQ9Il9ibGFuayIgaHJlZj0iaHR0cHM6Ly9yZWFjdGRpZ2VzdC5uZXQvcmF0aW5ncy9uZXc_ZGlnZXN0PXJlYWN0JmFtcDtpc3N1ZT0zNjQmYW1wO3JhdGluZz00JmFtcDtzdWJzY3JpYmVyX2lkPWFhODJlMWVjLWVhZTUtNDdmZi05ZDljLTY0NWY5NTM4ZDI4MyIgc3R5bGU9ImNvbG9yOiAjMkY5MkNDOyI-NDwvYT48L2xpPg0NCiAgICA8bGkgc3R5bGU9ImRpc3BsYXk6IGlubGluZS1ibG9jazsgbWFyZ2luLXJpZ2h0OiAxZW07Ij48YSB0YXJnZXQ9Il9ibGFuayIgaHJlZj0iaHR0cHM6Ly9yZWFjdGRpZ2VzdC5uZXQvcmF0aW5ncy9uZXc_ZGlnZXN0PXJlYWN0JmFtcDtpc3N1ZT0zNjQmYW1wO3JhdGluZz01JmFtcDtzdWJzY3JpYmVyX2lkPWFhODJlMWVjLWVhZTUtNDdmZi05ZDljLTY0NWY5NTM4ZDI4MyIgc3R5bGU9ImNvbG9yOiAjMkY5MkNDOyI-NTwvYT48L2xpPg0NCiAgPC91bD4NDQoNDQogIDxoMiBzdHlsZT0ibGluZS1oZWlnaHQ6IDEyNSU7IGZvbnQtd2VpZ2h0OiBib2xkOyBmb250LXNpemU6IDEuM2VtOyBtYXJnaW46IDFlbSAwOyI-bmV3c2xldHRlcnM8L2gyPg0NCiAgPHVsIGNsYXNzPSJvdGhlci1uZXdzbGV0dGVycyI-DQ0KICAgICAgPGxpPjxhIGhyZWY9Imh0dHBzOi8vZGFpbHl0ZWNoLmVtYWlsP3V0bV9zb3VyY2U9cmVhY3QmYW1wO3V0bV9tZWRpdW09ZW1haWwmYW1wO3V0bV9jYW1wYWlnbj1mb290ZXIiIHN0eWxlPSJjb2xvcjogIzJGOTJDQzsiPkRhaWx5IFRlY2g8L2E-PC9saT4NDQogICAgICA8bGk-PGEgaHJlZj0iaHR0cHM6Ly9wcm9ncmFtbWluZ2RpZ2VzdC5uZXQ_dXRtX3NvdXJjZT1yZWFjdCZhbXA7dXRtX21lZGl1bT1lbWFpbCZhbXA7dXRtX2NhbXBhaWduPWZvb3RlciIgc3R5bGU9ImNvbG9yOiAjMkY5MkNDOyI-UHJvZ3JhbW1pbmcgRGlnZXN0PC9hPjwvbGk-DQ0KICAgICAgPGxpPjxhIGhyZWY9Imh0dHBzOi8vdGVjaGxlYWRkaWdlc3QubmV0P3V0bV9zb3VyY2U9cmVhY3QmYW1wO3V0bV9tZWRpdW09ZW1haWwmYW1wO3V0bV9jYW1wYWlnbj1mb290ZXIiIHN0eWxlPSJjb2xvcjogIzJGOTJDQzsiPlRlY2ggTGVhZCBEaWdlc3Q8L2E-PC9saT4NDQogICAgICA8bGk-PGEgaHJlZj0iaHR0cHM6Ly9jc2hhcnBkaWdlc3QubmV0P3V0bV9zb3VyY2U9cmVhY3QmYW1wO3V0bV9tZWRpdW09ZW1haWwmYW1wO3V0bV9jYW1wYWlnbj1mb290ZXIiIHN0eWxlPSJjb2xvcjogIzJGOTJDQzsiPkMjIERpZ2VzdDwvYT48L2xpPg0NCiAgPC91bD4NDQoNDQogIDxmb290ZXIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyI-DQ0KICAgIDxwIHN0eWxlPSJtYXJnaW46IDFlbSAwOyI-wqkgMjAyMiA8YSBocmVmPSJodHRwczovL2Jvbm9ib3ByZXNzLmNvbS8iIHN0eWxlPSJjb2xvcjogIzY2NiAhaW1wb3J0YW50OyI-Qm9ub2JvIFByZXNzPC9hPjwvcD4NDQogICAgPHAgc3R5bGU9Im1hcmdpbjogMWVtIDA7Ij4NDQogICAgICA8c21hbGwgc3R5bGU9ImZvbnQtc2l6ZTogODAlOyI-V291bGQgeW91IGxpa2UgdG8gPGEgaHJlZj0iaHR0cHM6Ly9yZWFjdGRpZ2VzdC5uZXQvYWR2ZXJ0aXNlIiBzdHlsZT0iY29sb3I6ICM2NjYgIWltcG9ydGFudDsiPmFkdmVydGlzZTwvYT4gd2l0aCB1cz8gQ2hlY2sgb3V0IG91ciBsYXRlc3QgPGEgaHJlZj0iaHR0cHM6Ly9ib25vYm9wcmVzcy5jb20vbWVkaWEta2l0IiBzdHlsZT0iY29sb3I6ICM2NjYgIWltcG9ydGFudDsiPm1lZGlhIGtpdDwvYT4gZm9yIG1vcmUgaW5mb3JtYXRpb24uPC9zbWFsbD48YnI-DQ0KICAgICAgPHNtYWxsIHN0eWxlPSJmb250LXNpemU6IDgwJTsiPklmIHlvdSBubyBsb25nZXIgd2lzaCB0byByZWNlaXZlIHRoZXNlIGVtYWlscywgY2xpY2sgdG8gPGEgcmVsPSJub2ZvbGxvdyIgaHJlZj0iaHR0cHM6Ly9yZWFjdGRpZ2VzdC5uZXQvc3Vic2NyaWJlcnMvYWE4MmUxZWMtZWFlNS00N2ZmLTlkOWMtNjQ1Zjk1MzhkMjgzL3Vuc3Vic2NyaWJlIiBzdHlsZT0iY29sb3I6ICM2NjYgIWltcG9ydGFudDsiPnVuc3Vic2NyaWJlPC9hPi48L3NtYWxsPg0NCiAgICA8L3A-DQ0KICA8L2Zvb3Rlcj4NDQogIDxpbWcgYWx0PSIiIHNyYz0iaHR0cHM6Ly9yZWFjdGRpZ2VzdC5uZXQvYW5hbHl0aWNzL29wZW4uZ2lmP2RpZ2VzdF9pc3N1ZT0zNjQmYW1wO2RpZ2VzdF90eXBlPXJlYWN0JmFtcDtzdWJzY3JpYmVyX2lkPWFhODJlMWVjLWVhZTUtNDdmZi05ZDljLTY0NWY5NTM4ZDI4MyIgd2lkdGg9IjEiIGhlaWdodD0iMSI-DQ0KPC9ib2R5Pg0NCjwvaHRtbD4NDQo=',
          },
        },
      ],
    }
    expect(
      loopThroughBodyParts({
        inputObject: input,
        signal,
      })
    ).toMatchSnapshot()
  })
})
