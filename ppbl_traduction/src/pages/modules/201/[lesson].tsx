import SLTs201 from "@/src/components/course-modules/201/201-SLTs";
import ModuleLessons from "@/src/components/course-modules/Lesson";
import { items } from "@/src/data/modules/201";


const Module201Lessons = () => {

  const status = null

  const lessons = [
    { key:"slts", component:<SLTs201 />},
  ]

  return (
    <ModuleLessons items={items} modulePath="/modules/201" selected={0} lessons={lessons} status={status}/>
  )
          
};

export default Module201Lessons;