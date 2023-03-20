import SLTs302 from "@/src/components/course-modules/302/302-SLTs";
import ModuleLessons from "@/src/components/course-modules/Lesson";
import { items } from "@/src/data/modules/302";


const Module302Lessons = () => {

  const status = null

  const lessons = [
    { key:"slts", component:<SLTs302 />},
  ]

  return (
    <ModuleLessons items={items} modulePath="/modules/302" selected={0} lessons={lessons} status={status}/>
  )
          
};

export default Module302Lessons;