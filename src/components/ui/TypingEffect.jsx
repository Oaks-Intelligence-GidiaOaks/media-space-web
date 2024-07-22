import { TypeAnimation } from 'react-type-animation';


const TypingEffect = () => {
  return (
    <TypeAnimation
    sequence={[
      
        'Build',
        1000,
        'Nurture',
        1000,
        'Grow',
        1000,
        'Share',
        1000,
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '4rem', display: 'inline-block',  color: "#3d7100", fontFamily: "Inter", fontStyle: "normal", fontWeight: "400", 
   lineHeight: "normal",

       }}
      repeat={Infinity}
     />
      
  )
}

export default TypingEffect
