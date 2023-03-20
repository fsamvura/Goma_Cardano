import SLTs103 from "@/src/components/course-modules/103/103-SLTs";
import ModuleLessons from "@/src/components/course-modules/Lesson";
import { items } from "@/src/data/modules/103";


const Module103Lessons = () => {

  const status = null

  const lessons = [
    { key:"slts", component:<SLTs103 />},
  ]

  return (
    <ModuleLessons items={items} modulePath="/modules/103" selected={0} lessons={lessons} status={status}/>
  )
          
};

export default Module103Lessons;