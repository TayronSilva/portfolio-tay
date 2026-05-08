// Standalone storage helpers.
// Modified to be independent of Manus Forge API.

export async function storagePut(
  relKey: string,
  _data: Buffer | Uint8Array | string,
  _contentType = "application/octet-stream",
): Promise<{ key: string; url: string }> {
  // Placeholder implementation for standalone mode
  const key = relKey.replace(/^\/+/, "");
  return { key, url: `/storage/${key}` };
}

export async function storageGet(relKey: string): Promise<{ key: string; url: string }> {
  const key = relKey.replace(/^\/+/, "");
  return { key, url: `/storage/${key}` };
}

export async function storageGetSignedUrl(relKey: string): Promise<string> {
  const key = relKey.replace(/^\/+/, "");
  return `/storage/${key}`;
}
