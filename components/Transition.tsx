import { AnimatePresence, type Variants, motion } from "framer-motion";
import { useRouter } from "next/router";

const variants: Variants = {
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0.9,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  initial: {
    opacity: 0.9,
  },
};

interface Props {
  children: React.ReactNode;
}

const Transition: React.FC<Props> = ({ children }) => {
  const { asPath } = useRouter();

  return (
    <div style={{ overflow: "hidden" }}>
      <AnimatePresence>
        <motion.div
          key={asPath}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Transition;
