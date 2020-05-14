import * as crypto from 'crypto';

const SALT = 'iv10UoLFAZPm7YJJ3XWLSliiFsn8GonP1VRvooJA7hqmm4hdcL5LG2x4Qq4Q5yh';
const ENCRYPT_PASSWORD = 'oo46jqV6P99ZgyNTjeQmvNtqysChbLfVaEHNbTlfwuESq7ASrAgwo7elaiNhxXe';
const SITEKEY = genPKI(); //  The public key of it should be published and made available publicly

const raw = 'thisIsASECUREPA$$WORD, a very long password. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum nunc aliquet bibendum enim facilisis. Tristique senectus et netus et malesuada fames ac turpis. Semper risus in hendrerit gravida. Sed pulvinar proin gravida hendrerit lectus a. Nam libero justo laoreet sit amet. Viverra accumsan in nisl nisi scelerisque eu.';

const credentials: Credentials = {
  email: 'test@example.org',
  password: raw,
  t: Date.now(),
};

// Public key must be published, ideally at https://domain/pub.key
const transmitPayload = transmit(credentials, SITEKEY.publicKey);

console.log(`User's log in entry:`);
console.log(credentials);

console.log();

console.log('After client-side encryption, send the following over API:');
console.log(transmitPayload);

console.log();

console.log('Validate the transmission payload at server-side:');
const valid = isValidLogin(transmitPayload);
console.log(valid);


// ---------- Interfaces -------------

interface TransmissionPayload {
  ciphertext: string,
  key: string,
  iv: string,
}

interface PreAsyncEncryptedTransmissionPayload {
  ciphertext: Buffer,
  key: Buffer,
  iv: Buffer,
}

interface Credentials {
  email: string,
  password: string,
  t: number,
}


// -------------------- Utils --------------------

function genPKI() {
  const pki = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });
  return pki;
}

function hash(raw): string {
  return crypto.createHmac('sha256', SALT).update(raw).digest('hex');
}

function symEncrypt(credentials: Credentials): PreAsyncEncryptedTransmissionPayload {
  const buffer = Buffer.from(JSON.stringify(credentials), 'utf-8');
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  return {
    key,
    iv,
    ciphertext: Buffer.concat([cipher.update(buffer), cipher.final()]),
  };
}

function decrypt(payload: TransmissionPayload): Credentials {
  const key = crypto.privateDecrypt(SITEKEY.privateKey, Buffer.from(payload.key, 'base64'));
  const iv = crypto.privateDecrypt(SITEKEY.privateKey, Buffer.from(payload.iv, 'base64'));
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  const decrypted = Buffer.concat([decipher.update(Buffer.from(payload.ciphertext, 'base64')), decipher.final()]);
  return JSON.parse(decrypted.toString('utf-8'));
}


// -------------------- Transport --------------------

function transmit(credentials: Credentials, publicKey: string): TransmissionPayload {
  const enc = symEncrypt(credentials);

  const key = crypto.publicEncrypt(publicKey, enc.key).toString('base64');
  const iv = crypto.publicEncrypt(publicKey, enc.iv).toString('base64');

  return {
    ciphertext: enc.ciphertext.toString('base64'),
    key,
    iv,
  }
}

function isValidLogin(payload: TransmissionPayload): boolean {
  const { email, password, t } = decrypt(payload);
  const lookup = {};
  const hashFromDB = hash(password);

  if (lookup[`securelogin ${email} ${t.toString()}`]) { // can only use once, do a cache lookup
    return false;
  }

  if (Date.now() - t > 5000000) { // 5 seconds
    return false;
  }

  if (hash(password) !== hashFromDB) { // password mismatched
    return false;
  }

  return true;
}

