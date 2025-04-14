import jwt from 'jsonwebtoken';
import axios from 'axios';

require('dotenv').config();

const JWKS_URL = `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/certs`;
  
// Function to get the JWKS keys from Keycloak
async function getJWKS() {
	const response = await axios.get(JWKS_URL);
	return response.data.keys;
}
  
async function getPublicKey(kid: string) {
	const keys = await getJWKS();
	const key = keys.find((k: { kid: string }) => k.kid === kid);
  
	if (!key) {
		throw new Error("Public key not found.");
	}
  
	// The key is in x5c property, and you need to extract it and return it as a PEM string
	const cert = key.x5c[0];
	return `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----`;
}
  
const validateJWT = async (req: any, res: any, next: Function) => {
	const token = req.headers.authorization?.split(' ')[1];

	console.log("validating token...");

	if (!token) {
		console.error("No token provided");
		return res.status(400).json({ error: 'No token provided' });
	}
  
	try {
		const decodedHeader: any = jwt.decode(token, { complete: true });
  
	  	if (!decodedHeader || !decodedHeader.header.kid) {
			return res.status(400).json({ error: 'Invalid JWT header' });
	  	}
  
	  	const kid = decodedHeader.header.kid;
	  	const publicKey = await getPublicKey(kid);
  
	  	jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
		if (err) {
			return res.status(401).json({ error: 'unoutherized' });
		}
		req.user = decoded;
		next();
	})
	  
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'Failed to verify token' });
	}
};

export default validateJWT;
