import { motion } from "framer-motion";


const Layout = ({ children }) => (
<motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0 }
      }}
    >
      {children}
    </motion.div>
);
export default Layout;