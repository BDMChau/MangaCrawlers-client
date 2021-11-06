import React from 'react'
import { motion } from "framer-motion";

export default function TransitionAnimate({ renderPart, transitionTime, initOpacity, EndOpacity }) {
    return (
        <motion.div
            animate={{
                opacity: EndOpacity ? EndOpacity : 1,
            }}
            initial={{
                opacity: initOpacity ? initOpacity : 0,
            }}
            transition={{ duration: transitionTime ? transitionTime : 0.3 }}
        >
            {renderPart}
        </motion.div>
    )
}
