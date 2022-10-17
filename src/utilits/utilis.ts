import * as bcrypt from 'bcrypt';
export async function encodePassword(rawPassword: string): Promise<string> {
  const SALT = bcrypt.genSaltSync();
  return await bcrypt.hash(rawPassword, SALT);
}
