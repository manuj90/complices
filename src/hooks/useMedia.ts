import { useEffect, useState } from 'react';

function isMediaContentType(contentType: string) {
  return (
    contentType.includes('audio/') ||
    contentType.includes('video/') ||
    contentType.includes('octet-stream')
  );
}

export function useMediaExists(src?: string) {
  const [exists, setExists] = useState(false);

  useEffect(() => {
    if (!src) {
      setExists(false);
      return;
    }

    if (src.startsWith('http://') || src.startsWith('https://')) {
      setExists(true);
      return;
    }

    let cancelled = false;

    fetch(src, { method: 'HEAD' })
      .then((res) => {
        if (cancelled) return;
        const type = res.headers.get('content-type') ?? '';
        setExists(res.ok && isMediaContentType(type));
      })
      .catch(() => {
        if (!cancelled) setExists(false);
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  return exists;
}