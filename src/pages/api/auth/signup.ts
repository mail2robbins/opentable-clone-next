import { NextApiRequest, NextApiResponse } from "next"
import validator from "validator";
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import * as jose from "jose"
import { setCookie } from "cookies-next"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {

        const errors: string[] = [];
        try {
            const { firstName, lastName, email, password, phone, city } = req.body;

            const validationSchema = [
                { valid: validator.isLength(firstName, { min: 1, max: 20 }), errorMessage: "First Name is invalid" },
                { valid: validator.isLength(lastName, { min: 1, max: 20 }), errorMessage: "Last Name is invalid" },
                { valid: validator.isEmail(email), errorMessage: "Email is invalid" },
                { valid: validator.isStrongPassword(password), errorMessage: "Password is not strong" },
                { valid: validator.isMobilePhone(phone), errorMessage: "Phone Number is invalid" },
                { valid: validator.isLength(city, { min: 1, max: 50 }), errorMessage: "City is invalid" }
            ]

            validationSchema.forEach((check) => {
                if (!check.valid) {
                    errors.push(check.errorMessage)
                }
            })

            if (errors.length) {
                return res.status(400).json({ errorMessage: errors[0] })
            }

            const userWithEmail = await prisma.user.findUnique({
                where: {
                    email
                }
            })

            if (userWithEmail) {
                return res.status(400).json({ errorMessage: "User already exists" })
            }

            const hashedPassword = await bcrypt.hash(password, 10)


            const user = await prisma.user.create({
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    phone,
                    city,
                    password: hashedPassword
                }
            })

            const algorithm = "HS256"
            const secret = new TextEncoder().encode(process.env.JWT_SECRET)
            const token = await new jose.SignJWT({ email: user.email })
                .setProtectedHeader({ alg: algorithm })
                .setExpirationTime("24h")
                .sign(secret)


            setCookie("opentablejwt", token, { req, res, maxAge: 60 * 6 * 24 })

            return res.status(200).json({
                firstName: user.first_name,
                lastName: user.last_name,
                phone: user.phone,
                email: user.email,
                city: user.city,
            })
        }
        catch (err: any) {
            errors.push(err.message)
        }

        if (errors.length) {
            return res.status(400).json({ errorMessage: errors[0] })
        }

    }
}