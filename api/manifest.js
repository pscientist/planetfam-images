import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'public', 'manifest.json');
  const body = fs.readFileSync(filePath);
  const etag = '"' + crypto.createHash('sha1').update(body).digest('hex') + '"';

  const ifNone = req.headers['if-none-match'];
  if (ifNone && ifNone.trim() === etag) {
    res.setHeader('ETag', etag);
    res.status(304).end();
    return;
  }

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('ETag', etag);
  res.status(200).send(body);
}
