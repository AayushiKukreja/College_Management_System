import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Protected.css";

function Protected({ authUser, children }) {
  let navigate = useNavigate();
  const pageVariants = {
    initial: {
      opacity: 0,
      y: -50,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "easeOut",
    duration: 0.7,
  };

  if (!authUser) {
    return (
      <motion.div
        className="error-page"
        initial="initial"
        animate="animate"
        variants={pageVariants}
        transition={pageTransition}
      >
        <h1 className="error-message">ERROR!!!! Please Login First</h1>
        <motion.button
          className="login-button"
          onClick={() => {
            navigate("/");
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Login
        </motion.button>
      </motion.div>
    );
  } else {
    return children;
  }
}

export default Protected;
