import { v2 as cloudinary } from "cloudinary"
import { auth } from "@clerk/nextjs/server"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req){
    const { userId } = auth()
    if (!userId) return new Response("Unauthorized", { status: 401 })

        const data = await req.json()
        const result = await cloudinary.uploader.upload(data.imagebasde64)
        return new Response(JSON.stringify({url: result.secure_url }))

}