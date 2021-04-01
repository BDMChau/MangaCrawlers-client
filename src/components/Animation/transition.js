import React from 'react'
import { motion } from "framer-motion";

export default function TransitionAnimate({ renderPart }) {
    return (
        <motion.div
            className="block"
            animate={{
                opacity: 1,
            }}
            initial={{
                opacity: 0,
            }}
            transition={{ duration: 0.2 }}
        >
            {renderPart}
        </motion.div>
    )
}
