import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const {userId } =auth();
    if (!userId) return NextResponse.json([], {status: 401})
    
    const items = await prisma.item.findMany({ where : { userId } })
    return NextResponse.json(items)
}

export async function POST(req) {
    const { userId } = auth()
    if (!userId) return NextResponse.json({error: "unauthorized"}, { status: 401})

    const {name, description, category, value } = await req.json()
    const newItem = await prisma.item.create({
        data: { name, description , category, value, userId },
    })
    return NextResponse.json(newItem)
}