'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DecryptedText from './DecryptedText'

interface IntroScreenProps {
    onComplete: () => void
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
    const [showIntro, setShowIntro] = useState(true)
    const [animationComplete, setAnimationComplete] = useState(false)

    const handleAnimationComplete = () => {
        setAnimationComplete(true)
        // Wait a moment after text is revealed, then fade out
        setTimeout(() => {
            setShowIntro(false)
            // Wait for fade out animation, then call onComplete
            setTimeout(() => {
                onComplete()
            }, 800)
        }, 1000)
    }

    return (
        <AnimatePresence>
            {showIntro && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
                >
                    <div className="text-center">
                        <DecryptedText
                            text="Welcome to SixthSense Legal"
                            animateOn="view"
                            sequential={true}
                            revealDirection="center"
                            speed={50}
                            maxIterations={15}
                            onComplete={handleAnimationComplete}
                            className="text-white"
                            encryptedClassName="text-gray-500"
                            parentClassName="text-4xl md:text-5xl lg:text-6xl font-daydream tracking-wider"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
