export default function getTodo() {
  const baseUrl = process.env.BACKEND_URL;

  return fetch(`${baseUrl}/api/v1/get-all-todos`);
}
