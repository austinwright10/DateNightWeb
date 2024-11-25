import type { NextApiRequest, NextApiResponse } from 'next'
const bcrypt = require('bcrypt')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { password } = req.body

  if (!password || typeof password !== 'string') {
    return res.status(400).json({ message: 'Invalid password' })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    return res.status(200).json({ hashedPassword })
  } catch (error) {
    console.error('Error hashing password:', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
