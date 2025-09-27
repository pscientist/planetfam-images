import AsyncStorage from '@react-native-async-storage/async-storage';

const MANIFEST_URL = 'https://planetfam-practice.vercel.app/api/manifest';
const MANIFEST_KEY = 'planetfam_manifest';
const ETAG_KEY = 'planetfam_manifest_etag';

export async function loadManifest() {
  const etag = await AsyncStorage.getItem(ETAG_KEY);
  const headers: Record<string, string> = {};
  if (etag) headers['If-None-Match'] = etag;

  const res = await fetch(MANIFEST_URL, { headers });

  if (res.status === 304) {
    const cached = await AsyncStorage.getItem(MANIFEST_KEY);
    return cached ? JSON.parse(cached) : null;
  }

  if (!res.ok) throw new Error(`Manifest error: ${res.status}`);

  const body = await res.json();
  const newEtag = res.headers.get('etag');

  await AsyncStorage.setItem(MANIFEST_KEY, JSON.stringify(body));
  if (newEtag) await AsyncStorage.setItem(ETAG_KEY, newEtag);

  return body;
}
