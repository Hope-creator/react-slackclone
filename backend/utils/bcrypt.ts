import bcrypt from "bcrypt";
import { promisify } from "util";

const { genSalt, hash, compare } = bcrypt;

const promisifyGenSalt = promisify(genSalt);
const promisifyHash = promisify(hash);
const promisifyCompare = promisify(compare);

const hashText = (plainTextPw: string) => promisifyGenSalt().then((salt) => promisifyHash(plainTextPw, salt));

export { promisifyCompare, hashText };
