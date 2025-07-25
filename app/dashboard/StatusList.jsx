import React, { useEffect, useState } from 'react'
import { getUniqueRecord } from '../_services/services';
import moment from 'moment';
import Card from './_components/Card';
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react';

function StatusList({attendanceList}) {
     const [totalStudent,setTotalStudent]=useState(0);
     const [presentperc,setPresentPerc]=useState(0);
    
    useEffect(()=>{
        if(attendanceList)
        {
            const totalSt=getUniqueRecord(attendanceList);
            setTotalStudent(totalSt.length);

            const today=moment().format('D');
            const PresentPrec=(attendanceList.length/(totalSt.length*Number(today))*100)
            setPresentPerc(PresentPrec)
        }
    },[attendanceList]) 
  return (
    <div className='grid grid-cols-1
    md:grid-cols-2 lg:grid-cols-3 gap-5 my-6'>
       <Card icon={<GraduationCap/>} title='Total Student' value={totalStudent} /> 
       <Card icon={<TrendingUp/>} title='Total Present' value={presentperc.toFixed(1)+'%'} /> 
       <Card icon={<TrendingDown/>} title='Total Absent' value={(100-presentperc).toFixed(1)+'%'} /> 
    </div>
  )
}

export default StatusList