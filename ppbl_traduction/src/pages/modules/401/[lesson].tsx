import SLTs401 from "@/src/components/course-modules/401/401-SLTs";
import ModuleLessons from "@/src/components/course-modules/Lesson";
import { items } from "@/src/data/modules/401";


const Module401Lessons = () => {

  const status = null

  const lessons = [
    { key:"slts", component:<SLTs401 />},
  ]

  return (
    <ModuleLessons items={items} modulePath="/modules/401" selected={0} lessons={lessons} status={status}/>
  )
          
};

export default Module401Lessons;