import SLTs301 from "@/src/components/course-modules/301/301-SLTs";
import ModuleLessons from "@/src/components/course-modules/Lesson";
import { items } from "@/src/data/modules/301";


const Module301Lessons = () => {

  const status = null

  const lessons = [
    { key:"slts", component:<SLTs301 />},
  ]

  return (
    <ModuleLessons items={items} modulePath="/modules/301" selected={0} lessons={lessons} status={status}/>
  )
          
};

export default Module301Lessons;