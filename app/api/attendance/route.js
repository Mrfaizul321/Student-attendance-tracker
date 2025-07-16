import db from "@/utils";
import { ATTENDANCE, STUDENTS } from "@/utils/schema";
import { and, eq, isNull, like, or } from "drizzle-orm";
import { date } from "drizzle-orm/mysql-core";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const grade = searchParams.get("grade");
    const month = searchParams.get("month"); // e.g., "07-2025" or "2025-07"

    console.log("GRADE:", grade, "MONTH:", month);

    const result = await db
      .select({
        name: STUDENTS.name,
        present: ATTENDANCE.present,
        day: ATTENDANCE.day,
        date: ATTENDANCE.date,
        grade: STUDENTS.grade,
        studentId: STUDENTS.id,
        attendanceId: ATTENDANCE.id,
      })
      .from(STUDENTS)
      .leftJoin(ATTENDANCE, eq(STUDENTS.id, ATTENDANCE.studentId))
      .where(
        and(
          eq(STUDENTS.grade, grade),
          or(
            eq(ATTENDANCE.date, month),
            isNull(ATTENDANCE.date)
          )
        )
      );


    return NextResponse.json(result);
  } catch (error) {
    console.error("Attendance API error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req,res){
    const data=await req.json();
    const result=await db.insert(ATTENDANCE)
    .values({
        studentId:data.studentId,
        present:data.present,
        day:data.day,
        date:data.date
    })
    return NextResponse.json(result);
}

    export async function DELETE(req){
        const searchParams=req.nextUrl.searchParams;
        const studentId=searchParams.get('studentId');
        const date=searchParams.get('date');
        const day=searchParams.get('day');

        const result=await db.delete(ATTENDANCE)
        .where(
            and(
                eq(ATTENDANCE.studentId,studentId),
                eq(ATTENDANCE.date,date),
                eq(ATTENDANCE.day,day)

            )
        )    

        return NextResponse.json(result);
        
    }
