export default async function fetcher<Payload = any>(
  url: string
): Promise<Payload> {
  const res = await fetch(url);
  return res.json();
}
