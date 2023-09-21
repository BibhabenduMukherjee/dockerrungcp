const { google } = require('googleapis');
// Initialize the Compute Engine API
const compute = google.compute('v1');
const authClient = new google.auth.GoogleAuth({
    credentials : {
      "type": "service_account",
      "project_id": "pacific-diode-396304",
      "private_key_id": "80632df3e4e93d14253cb1537e2ffd5182a0ee98",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCyTA72/PJIVn8H\nirN+b+KW5xxFCAeRPlknJT1k2LxeWA40BTO5V/Rtwb0KOiITvmh40k0HL09zbXO9\nJKP8JQyWaYnpGM9Va3haT48F4CXVh0ENW8bZZL4jHHNNxBQSk1xL4DCoTVX2KOAz\nz44ovkclRnBZc++Z0d3C+q7JHu0EyY236HSZOZ2Tsqqymc4R+vN0qpgKkRuyrJZu\nSmy+Iw1RtfhyXzkqnFpliYsbyRREAwfstipcK8p5S4lMFEMiyzj4744CUr+iT1bS\nKVw5OxQ7vj4+Q6XL5uz83efEwJo3IsBCOsWr4/c/y9UVrkCdD2mMAYvHj9zcaFrA\nDFa/EY7hAgMBAAECggEAAIN5hakOtoCUR74bKTP/wFBGW5ilZlWHN3af0oXRMuLe\n5WcdIhpDuwC0Vd57Jf9cVboov8qfuGNr2MzAsauQJmTdR85hdrUmaoX6sYLdQDwU\nk7bZPLVRwTAvt1bA7L95EOliiBhf7rBC50QaHFn7woeNSYt5uLtUmV9BCC7sy+c0\nMSBZZAI4pGG8Ogrndu9kNuCvL6+bGx9u4WrMWddat1IAozxvmyQnR17MW++Np+uQ\nhniTqpIn1Wa960CZZLnviYfr+gzfFV8VE/KU5eIZrByMRKRAw48YEGn9tCJtSnht\nnzFqoIdcepCqjURKM4W4qA2zCNL7mDJHL/cb0/w8SQKBgQDZ/tAv/IxfNjdGhpeO\nV45M9rSb5vRt6e3tSN+7FQNIkPvOQYopKXnFDIiFZFqmKQDPuLn4QAoQ3chv6Lsy\nFzCLdJ0MEDndBDLI7NbplzAjZ/lnwKoHR8WnQL06Az8m3rQJ3RIINPn4fpaYFe7I\nR9LjVS4ocQn7V32s/1x2dVL/SQKBgQDRYYCHqT0O5aqSjAwjiR8diF7t1qnPaSdZ\nGespN1bRGAkdFfuwQo3+hA7H5kSjo9ix3apwfnzq29vloFksijENXxW1nharbv/F\njrirtIWpT2s5+cHjY/IMZPTi4YCaPE0XZWmI9JuIq2Ggw52cUjjs5+0RmbHlNXxY\n3n4vBLva2QKBgC+468SFiglR6hnjXwxHOJy6qWEz1zC0tGRsvqXK/NQHAUju6hsG\nvGSZ0M064elcMpRGwVeKVWnJ05ZEIa7eir8MwVChwLkUsTVxO78ZXO1zVpMTB2Xe\nnXN25bXsfge5WzqJjegECPEQbVFQA90OdClWPWuXC3NdfOLBaHF6T7gZAoGBAKjn\nwsutVrghxYwateAkyZkFXa73sFzFMxzJr867+akLfq6cAUGbLvjWhyXzOAPaNQCn\nFMtS/mpnmeiPheBMSm3C+rxcH2WEUYiJLag2JG0EyDcop6RMCAK/nl04FIpXgskQ\n4iW9TYre1g7ePtLP8WQLZE8CcWO51enK8nfzladhAoGAdux4z70VBBtju0GH/MMY\nsxeX0ywI9tDHjGXpbXhbhoa6g324ZqC1H7XyEInZsP2XP71vuekbn+S0ies6ba/a\nFr/l2XnAum3igDwNWW1A9JrzNBVJvKHiBsnVPqxWGq3INb9fKbJfcTMJpoUBEo4d\nfnisqMxffg/pDNgyzd1wXRs=\n-----END PRIVATE KEY-----\n",
      "client_email": "bibhabendu@pacific-diode-396304.iam.gserviceaccount.com",
      "client_id": "102388486900081108530",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/bibhabendu%40pacific-diode-396304.iam.gserviceaccount.com",
      "universe_domain": "googleapis.com"
    },
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  })

async function getClient(){
    const auth = await authClient.getClient();
    return auth
}
module.exports = getClient