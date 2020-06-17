const BACKEND_URL = 'http://localhost:3000';

export async function fetchJson(path: string) {
  const url = `${BACKEND_URL}${path}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Response not OK: ${response.status}`);
  }
  return await response.json();
}

export async function sendJson(method: string, path: string, payload: any = {}) {
  const url = `${BACKEND_URL}${path}`;

  const response = await fetch(url, {
    method,
    body: JSON.stringify(payload),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Response not OK: ${response.status}`);
  }
  return await response.json();
}
