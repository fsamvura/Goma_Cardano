import SLTs303 from "@/src/components/course-modules/303/303-SLTs";
import ModuleLessons from "@/src/components/course-modules/Lesson";
import { items } from "@/src/data/modules/303";


const Module303Lessons = () => {

  const status = null

  const lessons = [
    { key:"slts", component:<SLTs303 />},
  ]

  return (
    <ModuleLessons items={items} modulePath="/modules/303" selected={0} lessons={lessons} status={status}/>
  )
          
};

export default Module303Lessons;