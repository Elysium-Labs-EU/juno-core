import React from 'react'
import { motion } from 'framer-motion'

const AnimatedMountUnmount = ({ children }: { children: JSX.Element | JSX.Element[] | any }) => (
    <motion.div
        exit={{ opacity: 0, y: -20 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
    >
        {children}
    </motion.div>)

export default AnimatedMountUnmount