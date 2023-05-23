import * as jose from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
const alg = 'HS256';

export const generateToken = async (payload: any) => {
  const token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setExpirationTime('1h')
    .sign(secret);

  return token;
};

export const verifyToken = async (token: string) => {
  const a = await jose.jwtVerify(token, secret);
  return !!a;
};
