import db from "@/utils";
import { STUDENTS } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req, res){
    const data=await req.json();

    const result=await db.insert(STUDENTS)
    .values({
        name:data?.name,
        grade:data?.grade,
        RollNo:data?.RollNo,
        contact:data?.contact,
    })

    return NextResponse.json(result);
}

export async function GET(req){
    const result=await db.select().from(STUDENTS);

    return NextResponse.json(result);
}

export async function DELETE(req){
    const searchparams=req.nextUrl.searchParams;
    const id=searchparams.get('id');

    const result=await db.delete(STUDENTS)
    .where(eq(STUDENTS.id,id))

    return NextResponse.json(result);
}