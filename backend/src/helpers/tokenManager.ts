import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

// accessTokens
export function generateAccessToken(email: string, name: string) {
  const encoded = jwt.sign(
    {data: {email: email, name: name}},
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: '15m',
    },
  )
  const decoded = jwt.verify(encoded, process.env.ACCESS_TOKEN_SECRET!)
  console.log(decoded)
  return encoded
}
// refreshTokens
let refreshTokens = []
export function generateRefreshToken(email: string, name: string) {
  const refreshToken = jwt.sign(
    {email: email, name: name},
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: '20m',
    },
  )
  refreshTokens.push(refreshToken)
  return refreshToken
}

export function verifyToken(token: string) {
  try {
    var decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!)
    return decoded
  } catch (error) {
    console.log(error)
    return undefined
  }
}
