import { AnimatePresence, motion } from "framer-motion";
import { seconds } from "@/styles/transitions";
import { useRouter } from "next/router";

const variants = {
  in: {
    opacity: 1,
    transition: {
      duration: seconds,
    },
  },
  out: {
    opacity: 0,
    transition: {
      duration: seconds,
    },
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
