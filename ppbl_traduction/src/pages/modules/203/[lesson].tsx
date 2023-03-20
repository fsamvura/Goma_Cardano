import SLTs203 from "@/src/components/course-modules/203/203-SLTs";
import ModuleLessons from "@/src/components/course-modules/Lesson";
import { items } from "@/src/data/modules/203";


const Module203Lessons = () => {

  const status = null

  const lessons = [
    { key:"slts", component:<SLTs203 />},
  ]

  return (
    <ModuleLessons items={items} modulePath="/modules/203" selected={0} lessons={lessons} status={status}/>
  )
          
};

export default Module203Lessons;