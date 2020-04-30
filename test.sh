#!/bin/bash

function pause(){
   read -p "$*"
}

## See https://jwt.io/
## Secret = SECRET!!! (see src\core\config\config-token.provider.ts)
## "sub" should be "123" or "321" to provide the user data (see src\core\auth\auth.service.ts)

URL_BASE=http://localhost:8080

USER123_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJuYW1lIjoiVXNlcjEyMyBOYW1lIiwiaWF0IjoxNTE2MjM5MDIyfQ.TuVOX2A5J-Ymbv4T8Cw9GR1Aoi5RAGOS4hrEA_LyZ_Y
USER321_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMjEiLCJuYW1lIjoiVXNlcjMyMSBOYW1lIiwiaWF0IjoxNTE2MjM5MDIyfQ.7YRetuWtAfGaGlWY4LKUa-TAZcuJKTPspfJdMo-gKSc

USER123_INVALID_SECRET_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJuYW1lIjoiVXNlcjEyMyBOYW1lIiwiaWF0IjoxNTE2MjM5MDIyfQ.gDzkdWFNy7sqmLjgY6ygGj1RZBeXUqgCBpAR9V617Ng
INVALID_JWT_TOKEN=A.B.C

echo "=== FALSE POSITIVE TESTS: INVALID TOKENS..."
echo

TOKEN=${USER123_INVALID_SECRET_TOKEN}
echo GET /test/name -- with VALID_JWT_TOKEN but INVALID_SECRET
curl -sb -H 'Accept: application/json' -H "Authorization: Bearer ${TOKEN}" "${URL_BASE}/test/name"
echo

TOKEN=${INVALID_JWT_TOKEN}
echo GET /test/name -- with INVALID_JWT_TOKEN
curl -sb -H 'Accept: application/json' -H "Authorization: Bearer ${TOKEN}" "${URL_BASE}/test/name"
echo

echo
echo "=== TRUE POSITIVE TESTS: VALID TOKENS..."
echo

## Take an correct user: User123
TOKEN=${USER123_TOKEN}

# curl -H 'Accept: application/json' -H "Authorization: Bearer ${TOKEN}" "${URL_BASE}/test/name"

echo GET /test/drop-all -- with USER123_TOKEN
curl -sb -H 'Accept: application/json' -H "Authorization: Bearer ${TOKEN}" "${URL_BASE}/test/drop-all"
echo

echo GET /test/new -- with USER123_TOKEN
curl -sb -H 'Accept: application/json' -H "Authorization: Bearer ${TOKEN}" "${URL_BASE}/test/new"
echo

echo GET /test/list -- with USER321_TOKEN
curl -sb -H 'Accept: application/json' -H "Authorization: Bearer ${TOKEN}" "${URL_BASE}/test/list"
echo

## Switch an user: User321
TOKEN=${USER321_TOKEN}

echo GET /test/new -- with USER321_TOKEN
curl -sb -H 'Accept: application/json' -H "Authorization: Bearer ${TOKEN}" "${URL_BASE}/test/new"
echo

echo GET /test/list -- with USER321_TOKEN
curl -sb -H 'Accept: application/json' -H "Authorization: Bearer ${TOKEN}" "${URL_BASE}/test/list"
echo

echo
pause 'Press [Enter] key to continue...'
