'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import MatchaForm from '@/components/MatchaForm';
import SocialLinks from '@/components/SocialLinks';

const styles = {
  main: {
    minHeight: '100vh',
    backgroundColor: '#f8f5f0',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    boxSizing: 'border-box' as const,
    width: '100%',
  },
  container: {
    maxWidth: '480px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '32px',
    padding: '24px',
    boxSizing: 'border-box' as const,
  },
  logo: {
    fontSize: '64px',
    marginBottom: '8px',
    textAlign: 'center' as const,
  },
  headline: {
    fontSize: '24px',
    fontWeight: 500,
    color: '#333333',
    textAlign: 'center' as const,
    marginBottom: '16px',
    width: '100%',
    wordWrap: 'break-word' as const,
  },
};

// Media query style adjustments for smaller screens
const getResponsiveStyles = () => {
  if (typeof window !== 'undefined') {
    const width = window.innerWidth;
    
    // Mobile adjustments
    if (width < 480) {
      return {
        container: {
          padding: '16px',
          gap: '24px',
        },
        logo: {
          fontSize: '56px',
        },
        headline: {
          fontSize: '22px',
        },
      };
    }
  }
  
  return {};
};

export default function Home() {
  const [typingDone, setTypingDone] = useState(false);
  const [responsiveStyles, setResponsiveStyles] = useState({});

  useEffect(() => {
    // Set initial responsive styles
    setResponsiveStyles(getResponsiveStyles());
    
    // Update responsive styles on window resize
    const handleResize = () => {
      setResponsiveStyles(getResponsiveStyles());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main style={styles.main}>
      <motion.div 
        style={{
          ...styles.container,
          ...(responsiveStyles as any)?.container
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            ...styles.logo,
            ...(responsiveStyles as any)?.logo
          }}
        >
          🍵
        </motion.div>

        {/* Animated Headline */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            ...styles.headline,
            ...(responsiveStyles as any)?.headline
          }}
        >
          <Typewriter
            words={['stay updated with matchi ✨']}
            loop={1}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
            onLoopDone={() => setTypingDone(true)}
          />
        </motion.h1>

        {/* Form */}
        <MatchaForm />
        
        {/* Social Links */}
        <SocialLinks />
      </motion.div>
    </main>
  );
}
