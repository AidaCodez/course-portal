"use client"
import React, { use, useEffect, useState } from 'react'
import CourseVideoDescription from './_components/CourseVideoDescription';
import GlobalApi from '@/app/_utils/GlobalApi';
import CourseEnrollSection from './_components/CourseEnrollSection';
import CourseContentSection from './_components/CourseContentSection';
import { useUser } from '@clerk/nextjs';

function CoursePreview({params}) {
  const {user} = useUser();
  const [courseInfo, setCourseInfo] =useState();
  const [isUserAlreadyEnrolled,setIsUserAlreadyEnrolled]=useState();
  const resolvedParams = use(params);
  useEffect(()=>{
    resolvedParams&&getCourseInfoById()
  },[resolvedParams])

  useEffect(()=>{
    courseInfo&&user&&checkUserEnrolledToCourse();
  },[courseInfo,user])
  /**
   * used to get Course Info By Slug/Id Name
   */
  const getCourseInfoById=()=>{
    GlobalApi.getCourseById(resolvedParams?.courseId).then(resp=>{
      setCourseInfo(resp?.courseList);
      
    })
  }

  /**
   * To check user already enrolled to course
   */
  const checkUserEnrolledToCourse=()=>{
    GlobalApi.checkUserEnrolledToCourse(courseInfo.slug,user.primaryEmailAddress.emailAddress)
    .then(resp=>{
      if(resp?.userEnrollCourses){
        console.log(resp);
        setIsUserAlreadyEnrolled(resp?.userEnrollCourses[0]?.id);
      }

    })
  }

  return courseInfo&&(
    <div className='grid grid-cols-1 md:grid-cols-3 p-5 gap-3'>
      {/* Title Video, Description */}
      <div className='col-span-2 bg-white p-3'>
        <CourseVideoDescription courseInfo={courseInfo}/>

      </div>

      {/* Course Content */}
      <div>
        <CourseEnrollSection courseInfo={courseInfo}
          isUserAlreadyEnrolled={isUserAlreadyEnrolled}/>

        <CourseContentSection courseInfo={courseInfo}
        isUserAlreadyEnrolled={isUserAlreadyEnrolled}/>
      </div>

    </div>
  )
}

export default CoursePreview