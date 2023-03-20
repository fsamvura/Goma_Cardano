import SLTs202 from "@/src/components/course-modules/202/202-SLTs";
import ModuleLessons from "@/src/components/course-modules/Lesson";
import { items } from "@/src/data/modules/202";


const Module202Lessons = () => {

  const status = null

  const lessons = [
    { key:"slts", component:<SLTs202 />},
  ]

  return (
    <ModuleLessons items={items} modulePath="/modules/202" selected={0} lessons={lessons} status={status}/>
  )
          
};

export default Module202Lessons;