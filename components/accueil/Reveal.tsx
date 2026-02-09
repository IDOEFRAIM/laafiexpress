import { motion } from 'framer-motion'
import { Ephesis } from 'next/font/google'

const Reveal = ({ children, delay = 0, y = 30 }: { children: React.ReactNode, delay?: number, y?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: y, filter: "blur(10px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] }} // Courbe de Bézier pour fluidité
  >
    {children}
  </motion.div>

)

export default Reveal