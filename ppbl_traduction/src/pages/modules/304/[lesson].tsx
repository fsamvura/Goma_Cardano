import SLTs304 from "@/src/components/course-modules/304/304-SLTs";
import ModuleLessons from "@/src/components/course-modules/Lesson";
import { items } from "@/src/data/modules/304";


const Module304Lessons = () => {

  const status = null

  const lessons = [
    { key:"slts", component:<SLTs304 />},
  ]

  return (
    <ModuleLessons items={items} modulePath="/modules/304" selected={0} lessons={lessons} status={status}/>
  )
          
};

export default Module304Lessons;