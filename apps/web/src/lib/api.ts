const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

// Server-side fetch uses internal Docker URL when available
const SERVER_API_BASE = process.env.INTERNAL_API_URL || API_BASE;

export async function fetchApi<T = any>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `API error: ${res.status}`);
  }

  return res.json();
}

/** Server-side fetch with short timeout — fails fast during Docker build when API is unreachable. */
export async function serverFetch<T = any>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${SERVER_API_BASE}${path}`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return fallback;
    const data: any = await res.json();
    return data.data ?? fallback;
  } catch {
    return fallback;
  }
}
