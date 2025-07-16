

export const getUniqueRecord=(attendanceList)=>{
        const UniqueRecord=[];
        const existingUser=new Set();

        attendanceList?.forEach(record => {
            if (!existingUser.has(record.studentId)) {
                existingUser.add(record.studentId);
                UniqueRecord.push(record);
            }
        });
        return UniqueRecord;
    }