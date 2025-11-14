export function fileToBase64Raw(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const full = reader.result as string;
      const base64 = full.split(',')[1]; // remove "data:image/png;base64,"
      resolve(base64);
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function detectImageMime(base64: string): string {
  const signatures: Record<string, string> = {
    iVBORw0KGgo: 'image/png',
    '/9j/': 'image/jpeg',
    R0lGOD: 'image/gif',
    Qk: 'image/bmp',
    UklG: 'image/avif',
    AAAAIGZ0eXB3ZWJw: 'image/webp',
  };

  for (const sig in signatures) {
    if (base64.startsWith(sig)) {
      return signatures[sig];
    }
  }

  return 'application/octet-stream'; // fallback
}

export function base64ToFile(
  base64: string,
  fileName: string,
  mimeType: string
): File {
  const byteString = atob(base64); // decode base64 → binary
  const buffer = new ArrayBuffer(byteString.length);
  const uintArray = new Uint8Array(buffer);

  for (let i = 0; i < byteString.length; i++) {
    uintArray[i] = byteString.charCodeAt(i);
  }

  return new File([buffer], fileName, { type: mimeType });
}
