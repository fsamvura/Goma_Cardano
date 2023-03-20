import SLTs305 from "@/src/components/course-modules/305/305-SLTs";
import ModuleLessons from "@/src/components/course-modules/Lesson";
import { items } from "@/src/data/modules/305";


const Module305Lessons = () => {

  const status = null

  const lessons = [
    { key:"slts", component:<SLTs305 />},
  ]

  return (
    <ModuleLessons items={items} modulePath="/modules/305" selected={0} lessons={lessons} status={status}/>
  )
          
};

export default Module305Lessons;