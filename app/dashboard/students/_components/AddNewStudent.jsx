'use client'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';
import { LoaderIcon } from 'lucide-react';


function AddNewStudent({refreshData}) {
    const [open, setOpen] = useState(false);
    const [grades,setGrades]=useState([]);
    const [loading,setLoading]=useState(false);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    useEffect(()=>{
        GetAllGradesList();
    },[])
     
    const GetAllGradesList=()=>{
        GlobalApi.GetAllGrades().then(resp=>{            
            setGrades(resp.data);
        })
    }




    const onSubmit = (data) => {
        setLoading(true)
        GlobalApi.CreateNewStudent(data).then(resp=>{
            console.log("--",resp);
            if(resp.data)
            {
                reset();
                refreshData();
                setOpen(false);
                toast("New Student Added !")
            }
            setLoading(false)
        })
    }
    return (
        <div>
            <Button onClick={() => setOpen(true)}>+ Add New Student</Button>
            <Dialog open={open}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Student</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='py-2'>
                                    <label>Full Name</label>
                                    <Input placeholder='Ex. Faizul Rahman'
                                        {...register('name', { required: true })}
                                    />
                                </div>
                                <div className='flex flex-col py-2'>
                                    <lablel>Select Semester</lablel>
                                    <select className='p-3 border rounded-lg'
                                        {...register('grade', { required: true })}>
                                            {grades.map((item,index)=>(
                                                <option key={index} value={item.grade}>{item.grade}</option>
                                            ))}
                                    </select>
                                </div>
                                <div className='py-2'>
                                    <label>RollNo</label>
                                    <Input placeholder='Ex. 363/CSE/2k21'
                                        {...register('RollNo', { required: true })}
                                    />
                                </div>
                                <div className='py-2'>
                                    <label>Contact No. </label>
                                    <Input type="number" placeholder='Ex. 000 000 0000'
                                        {...register('contact', { required: true })}
                                    />
                                </div>

                                <div className='flex gap-3 items-center justify-end mt-5'>
                                    <Button type="button" 
                                    onClick={() => setOpen(false)} variant='ghost'>Cancel</Button>
                                    <Button
                                        type="submit"
                                        disable={loading}
                                    >
                                      {loading? <LoaderIcon className='animate-spin'/>:  
                                        'Save'}</Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewStudent