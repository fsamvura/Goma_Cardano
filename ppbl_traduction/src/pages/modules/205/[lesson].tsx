import SLTs205 from "@/src/components/course-modules/205/205-SLTs";
import ModuleLessons from "@/src/components/course-modules/Lesson";
import { items } from "@/src/data/modules/205";


const Module205Lessons = () => {

  const status = null

  const lessons = [
    { key:"slts", component:<SLTs205 />},
  ]

  return (
    <ModuleLessons items={items} modulePath="/modules/205" selected={0} lessons={lessons} status={status}/>
  )
          
};

export default Module205Lessons;