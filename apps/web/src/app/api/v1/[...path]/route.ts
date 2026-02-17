import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

function getUpstreamUrl(request: NextRequest): string {
  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/api\/v1/, '');
  const base = API_BASE.replace(/\/api\/v1\/?$/, '');
  return `${base}/api/v1${path}${url.search}`;
}

async function handler(request: NextRequest) {
  const upstream = getUpstreamUrl(request);
  const headers = new Headers(request.headers);
  headers.delete('host');

  try {
    const res = await fetch(upstream, {
      method: request.method,
      headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
      // @ts-expect-error duplex needed for streaming body
      duplex: 'half',
    });

    const responseHeaders = new Headers(res.headers);
    responseHeaders.delete('transfer-encoding');

    return new NextResponse(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: responseHeaders,
    });
  } catch {
    return NextResponse.json({ error: 'API unavailable' }, { status: 502 });
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
