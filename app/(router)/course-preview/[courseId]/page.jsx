"use client"
import React, { use, useEffect, useState } from 'react'
import CourseVideoDescription from './_components/CourseVideoDescription';
import GlobalApi from '@/app/_utils/GlobalApi';

function CoursePreview({params}) {
  const [courseInfo, setCourseInfo] =useState();
  const resolvedParams = use(params);
  useEffect(()=>{
    resolvedParams&&getCourseInfoById()
  },[resolvedParams])

  /**
   * used to get Course Info By Slug/Id Name
   */
  const getCourseInfoById=()=>{
    GlobalApi.getCourseById(resolvedParams?.courseId).then(resp=>{
      setCourseInfo(resp?.courseList);
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

      </div>

    </div>
  )
}

export default CoursePreview