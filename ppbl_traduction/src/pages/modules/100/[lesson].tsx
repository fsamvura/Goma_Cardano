import SLTs100 from "@/src/components/course-modules/100/100-SLTs";
import Lesson1001 from "@/src/components/course-modules/100/Lesson-1001";
import Lesson1002 from "@/src/components/course-modules/100/Lesson-1002";
import Lesson1003 from "@/src/components/course-modules/100/Lesson-1003";
import Lesson1004 from "@/src/components/course-modules/100/Lesson-1004";
import Status100 from "@/src/components/course-modules/100/Status100";
import ModuleLessons from "@/src/components/course-modules/Lesson";
import { items } from "@/src/data/modules/100";
import { GetStaticPaths, GetStaticProps } from "next";

const Module100Lessons = () => {

  const status = <Status100 />

  const lessons = [
    { key:"slts", component:<SLTs100 />},
    { key:"1001", component:<Lesson1001 />},
    { key:"1002", component:<Lesson1002 />},
    { key:"1003", component:<Lesson1003 />},
    { key:"1004", component:<Lesson1004 />}
  ]

  return (
    <ModuleLessons items={items} modulePath="/modules/100" selected={0} lessons={lessons} status={status}/>
  )
          
};

export default Module100Lessons;