import db from "@/utils/index";
import { GRADES } from "@/utils/schema";// ← yeh line add karo
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const result = await db.select().from(GRADES);
     return NextResponse.json(result); 
  } catch (error) {
    console.error("🔥 API error:", error);
    return Response.json({ error: "Failed to fetch grades" }, { status: 500 });
  }
}


