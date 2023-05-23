import { connect, set } from 'mongoose';

set('strictQuery', false);

const uri = process.env.URI_DB || '';

if (!uri) throw new Error('MONGO_URI is not defined.');

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null };

export const db = async () => {
  if (cached.conn) return cached.conn;

  cached.conn = await connect(uri);

  return cached.conn;
};

export default db;
