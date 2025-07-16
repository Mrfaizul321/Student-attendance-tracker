import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

// AG Grid Styles
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

// Module Setup
import { ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community'; // use this instead of AllCommunityModule
import moment from 'moment';
import { date } from 'drizzle-orm/mysql-core';
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';
import { getUniqueRecord } from '@/app/_services/services';


ModuleRegistry.registerModules([ClientSideRowModelModule]);

const pagination = true;
const paginationPageSize = 100;
const paginationPageSizeSelector = [25, 50, 100];

function AttendanceGrid({ attendanceList, selectedMonth }) {

    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([
        { field: 'studentId', filter: true },
        { field: 'name', filter: true }
    ])

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const numberOfDays = daysInMonth(moment(selectedMonth).format('yyyy'), moment(selectedMonth).format('MM'))
    const daysArrays = Array.from({ length: numberOfDays }, (_, i) => i + 1)

    useEffect(() => {
        if (!attendanceList) return;

        const uniqueUsers = getUniqueRecord(attendanceList);

        const updatedUsers = uniqueUsers.map(user => {
            const obj = { ...user };
            for (let i = 1; i <= numberOfDays; i++) {
                obj[i] = ispresent(user.studentId, i);
            }
            return obj;
        });

        const dayColumns = daysArrays.map((date) => ({
            field: date.toString(),
            width: 50,
            headerName: date.toString(),
            cellRenderer: (params) => (
                <input
                    type="checkbox"
                    checked={params.value}
                    onChange={(e) => {
                        params.node.setDataValue(date.toString(), e.target.checked);
                    }}
                />
            )
        }));

        setColDefs([
            { field: 'studentId', headerName: 'Student Id' },
            { field: 'name', headerName: 'Name' },
            ...dayColumns
        ]);

        setRowData(updatedUsers);
    }, [attendanceList, selectedMonth]);
    /* 
    used to check if user is present or not 
    */

    const ispresent = (studentId, day) => {
        const result = attendanceList.find(item => item.day == day && item.studentId == studentId)
        return result ? true : false
    }

    //used to mark student attendance.
    const onMarkAttendance = (day, studentId, presentStatus) => {

        const date = moment(selectedMonth).format('MM/yyyy')
        if (presentStatus) {
            const data = {
                day: day,
                studentId: studentId,
                present: presentStatus,
                date: date
            }

            GlobalApi.MarkAttendance(data).then(resp => {
                console.log(resp);
                toast("Student Id:" + studentId + " Marked as present")
            })
        }
        else {
            GlobalApi.MarkAbsent(studentId, day, date)
                .then(resp => {
                    toast("Student Id:" + studentId + " Marked as absent")
                })
        }
    }


    return (
        <div className='ag-theme-quartz' style={{ height: 500 }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={{ sortable: true, filter: true }}
                onCellValueChanged={(e) => onMarkAttendance(e.colDef.field, e.data.studentId, e.newValue)}
                pagination={pagination}
                paginationPageSize={paginationPageSize}
                paginationPageSizeSelector={paginationPageSizeSelector}
            />
        </div>
    );
}

export default AttendanceGrid;
