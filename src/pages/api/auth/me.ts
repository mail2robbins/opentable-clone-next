import { NextApiRequest, NextApiResponse } from "next"
import validator from "validator";
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import * as jose from "jose"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const bearerToken = req.headers["authorization"] as string

    if (!bearerToken) {
        return res.status(401).json({ errorMessage: "Unauthorized request" })
    }

    const token = bearerToken.split(" ")[1] as string

    if (!token) {
        return res.status(401).json({ errorMessage: "token not found" })
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET)

    try {
        await jose.jwtVerify(token, secret)
    }
    catch (error) {
        return res.status(401).json({ errorMessage: "invalid token" })
    }

    const payload = jwt.decode(token) as { email: string }

    if (!payload?.email) {
        return res.status(401).json({ errorMessage: "invalid payload in token" })
    }

    const userWithEmail = await prisma.user.findUnique({
        where: {
            email: payload.email
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
            city: true
        }
    })

    return res.status(200).json({ me: userWithEmail })
}