"use client"

import Header from "@/components/Header";
import StudentInfo from "@/components/StudentInfo";
import { useState, useEffect } from "react";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { FacebookShareButton } from "react-share";


export default function Page({ params }) {

  const router = useRouter()

  const [studentsData, setStudentsData] = useState([])
  const [student, setStudent] = useState()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/dessoq-data.json')
      .then((res) => res.json())
      .then((students) => {
        setStudentsData(students)
        console.log(students)


        const studentBack = students.find((student) => parseInt(student.id) === parseInt(params.id));

        if( studentBack ) {
          setStudent(studentBack)
        } else {

          setTimeout(() => {
            router.push('/')
          }, 3000)
        }

        setTimeout(() => {
          setLoading(false)
        }, 1000)
      })
      .then(student => console.log(student))
  }, [])


  const getStudentData = () => {

    const studentBack = studentsData.find((student) => parseInt(student.id) === parseInt(id));

    (() => {
      setStudent((prevStudent) => {
        // Update the state immediately with the latest value
        return studentBack;
      });
    })()
    {/* 30502081501815 */ }

  }

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-[500px]   flex justify-center items-center h-[500px] flex-col gap-8 ">
          <Spinner size="lg" />
          <h3 className="text-xl font-medium">
            يرجي الانتظار حتي يتم تحميل النتيجة
          </h3>

        </div>
      </div>
    )
  }

  if (student) {
    return (
      <div className="">
        <Header />
        <div className="relative">
          <div className="absolute left-24">
            <Link href="/">
              <Button
                color="primary"
                
              >
                العودة الى الرئيسية
              </Button>
            </Link>
          </div>

          <div className="max-w-[800px] mt-24 mx-auto">
            <StudentInfo student={student} />
          </div>

        </div>
      </div>
    )
  }

  else {
    return (
      <div>
        <Header />

        <div className="max-w-[800px] mt-24 mx-auto">
            <p className="text-4xl text-center">
              لا يوجد طالب مسجل لدينا <br />
              بالرقم القومى المدخل
            </p>
          </div>
      </div>
    )
  }

}