import SLTs102 from "@/src/components/course-modules/102/102-SLTs";
import ModuleLessons from "@/src/components/course-modules/Lesson";
import { items } from "@/src/data/modules/102";


const Module102Lessons = () => {

  const status = null

  const lessons = [
    { key:"slts", component:<SLTs102 />},
  ]

  return (
    <ModuleLessons items={items} modulePath="/modules/102" selected={0} lessons={lessons} status={status}/>
  )
          
};

export default Module102Lessons;