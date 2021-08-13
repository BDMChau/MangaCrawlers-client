import React from 'react'
import { motion } from "framer-motion";

export default function TransitionAnimate({ renderPart, transitionTime }) {
    return (
        <motion.div
            className="block"
            animate={{
                opacity: 1,
            }}
            initial={{
                opacity: 0,
            }}
            transition={{ duration: transitionTime ? transitionTime : 0.3 }}
        >
            {renderPart}
        </motion.div>
    )
}
