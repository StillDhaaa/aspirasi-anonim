import { SignJWT, jwtVerify } from "jose";

const getSecretKey = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET belum di-set di file .env");
  }
  return new TextEncoder().encode(secret);
};

// Fungsi untuk MEMBUAT token (Digunakan saat Login)
export async function signToken(payload: { userId: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d") // Token berlaku 8 jam
    .sign(getSecretKey());
}

// Fungsi untuk MENGECEK token (Digunakan di proxy.ts atau Server Components)
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload;
  } catch (error) {
    return null;
  }
}
