import SLTs204 from "@/src/components/course-modules/204/204-SLTs";
import ModuleLessons from "@/src/components/course-modules/Lesson";
import { items } from "@/src/data/modules/204";


const Module204Lessons = () => {

  const status = null

  const lessons = [
    { key:"slts", component:<SLTs204 />},
  ]

  return (
    <ModuleLessons items={items} modulePath="/modules/204" selected={0} lessons={lessons} status={status}/>
  )
          
};

export default Module204Lessons;