import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const words = ['Build', 'Nurture', 'Grow', 'Share'];
// const staticText = ' your Community with People around the World';


const TypingEffect = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2500); 

    return () => clearInterval(interval);
  }, []);

  return (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWordIndex}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
            style={{ fontSize: '4rem', display: 'inline-block',  color: "#3d7100", fontFamily: "Inter", fontStyle: "normal", fontWeight: "400",  lineHeight: "normal",}}
          >
            {words[currentWordIndex]}
          </motion.div>
        </AnimatePresence>
  );

}

export default TypingEffect



// import { TypeAnimation } from 'react-type-animation';


// const TypingEffect = () => {
//   return (
//     <TypeAnimation
//     sequence={[
      
//         'Build',
//         1000,
//         'Nurture',
//         1000,
//         'Grow',
//         1000,
//         'Share',
//         1000,
//       ]}
//       wrapper="span"
//       speed={50}
//       style={{ fontSize: '4rem', display: 'inline-block',  color: "#3d7100", fontFamily: "Inter", fontStyle: "normal", fontWeight: "400", 
//    lineHeight: "normal",

//        }}
//       repeat={Infinity}
//      />
      
//   )
// }

// export default TypingEffect

