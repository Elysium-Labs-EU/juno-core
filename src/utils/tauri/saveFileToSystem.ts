import type { SaveDialogOptions } from '@tauri-apps/api/dialog'
import { save } from '@tauri-apps/api/dialog'
import { writeBinaryFile } from '@tauri-apps/api/fs'

/**
 * Saves a file to the filesystem.
 * @param {Blob} data - The data of the file to save.
 * @param {string} fileName - The suggested name of the file to save.
 * @throws {Error} If there is an error saving the file.
 */

export default async function saveFileToFilesystem(
  data: Blob,
  fileName: string
) {
  try {
    const array = new Uint8Array(await data.arrayBuffer())
    const options: SaveDialogOptions = {
      defaultPath: `~/Downloads/${fileName}`,
    }
    const filePath = await save(options)
    if (filePath) {
      await writeBinaryFile(filePath, array)
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error saving file:', err)
  }
}
