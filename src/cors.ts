export const corsOrigins: string[] = [
  '*',

  'http://localhost:8080',
  'https://localhost:8080',

  'http://localhost:4200',
  'https://localhost:4200',

  'http://localhost',
  'https://localhost',

  'http://localhost:80',
  'https://localhost:443',
];

export const corsMethods: string[] = [
  'GET', //
  'POST',
  'PUT',
  'DELETE',
  'HEAD',
  'OPTIONS',
  'PATCH',
];

export const corsRequestHeaders: string[] = [
  '*',

  'Cache-Control',
  'Content-Language',
  'Content-Length',
  'Content-Type',
  'Expires',
  'Last-Modified',
  'Pragma',

  'host',
  'origin',

  'referer',

  'accept',
  'accept-encoding',
  'accept-language',

  'sec-fetch-dest',
  'sec-fetch-mode',
  'sec-fetch-site',

  'user-agent',

  ':authority:',
  ':method:',
  ':path:',
  ':scheme:',

  'x-requested-with',
  'x-client-data',

  'DNT',
];

// exposed
export const corsResponseHeaders: string[] = [
  'Location', //

  'alt-svc',
  'date',
  'etag',
  'server',
  'status',
  'vary',

  'x-cloud-trace-context',
  'x-powered-by',
  'x-guploader-uploadid',

  ...corsRequestHeaders,
];
