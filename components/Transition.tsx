import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

const variants = {
  in: {
    opacity: 1,
    transition: {
      delay: 0.25,
      duration: 0.25,
    },
    y: 0,
  },
  out: {
    opacity: 0,
    transition: {
      duration: 0.25,
    },
    y: 0,
  },
};

interface Props {
  children: React.ReactNode;
}

const Transition: React.FC<Props> = ({ children }) => {
  const { asPath } = useRouter();

  return (
    <div style={{ overflow: "hidden" }}>
      <AnimatePresence initial={false} exitBeforeEnter>
        <motion.div
          key={asPath}
          variants={variants}
          animate="in"
          initial="out"
          exit="out"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Transition;
