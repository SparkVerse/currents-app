export async function getRates() {
  const res = await fetch(
    `https://v6.exchangerate-api.com/v6/${process.env.NEXT_PUBLIC_EXCHANGE_API_KEY}/latest/USD`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch rates");
  }

  return res.json();
}