'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import MatchaForm from '@/components/MatchaForm';
import SocialLinks from '@/components/SocialLinks';

const baseStyles = {
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
    gap: '24px',
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
    marginBottom: '4px',
    width: '100%',
    wordWrap: 'break-word' as const,
  },
};

// Media query style adjustments for smaller screens
const getResponsiveStyles = () => {
  if (typeof window !== 'undefined') {
    const width = window.innerWidth;
    const height = window.innerHeight;
    let styles = {};
    
    // Width-based adjustments
    if (width < 480) {
      styles = {
        ...styles,
        container: {
          padding: '16px',
          gap: '16px',
        },
        logo: {
          fontSize: '56px',
          marginBottom: '4px',
        },
        headline: {
          fontSize: '22px',
          marginBottom: '2px',
        },
      };
    }
    
    // Height-based adjustments for laptop screens (targeting 1280x800)
    if (height < 800) {
      styles = {
        ...styles,
        main: {
          padding: '8px',
        },
        container: {
          ...(styles as any)?.container,
          gap: '16px',
          padding: '12px 20px',
        },
        logo: {
          ...(styles as any)?.logo,
          fontSize: '54px',
          marginBottom: '2px',
        },
        headline: {
          ...(styles as any)?.headline,
          marginBottom: '0px',
          fontSize: '22px',
        },
      };
    }
    
    // Height-based adjustments for smaller laptops
    if (height < 700) {
      styles = {
        ...styles,
        main: {
          ...(styles as any)?.main,
          padding: '4px',
        },
        container: {
          ...(styles as any)?.container,
          gap: '12px',
          padding: '10px 20px',
        },
        logo: {
          ...(styles as any)?.logo,
          fontSize: width < 480 ? '44px' : '48px',
          marginBottom: '2px',
        },
        headline: {
          ...(styles as any)?.headline,
          fontSize: '20px',
        },
      };
    }
    
    // Even smaller screens
    if (height < 600) {
      styles = {
        ...styles,
        main: {
          ...(styles as any)?.main,
          padding: '2px',
        },
        container: {
          ...(styles as any)?.container,
          gap: '8px',
          padding: '8px 16px',
        },
        logo: {
          ...(styles as any)?.logo,
          fontSize: '36px',
          marginBottom: '0px',
        },
        headline: {
          ...(styles as any)?.headline,
          fontSize: '18px',
        },
      };
    }
    
    return styles;
  }
  
  return {};
};

export default function Home() {
  const [typingDone, setTypingDone] = useState(false);
  const [styles, setStyles] = useState(baseStyles);

  useEffect(() => {
    // Set initial responsive styles
    setStyles({
      ...baseStyles,
      ...(getResponsiveStyles() as any),
    });
    
    // Update responsive styles on window resize
    const handleResize = () => {
      setStyles({
        ...baseStyles,
        ...(getResponsiveStyles() as any),
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main style={styles.main}>
      <motion.div 
        style={styles.container}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={styles.logo}
        >
          🍵
        </motion.div>

        {/* Animated Headline */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={styles.headline}
        >
          <Typewriter
            words={['stay updated with matchi']}
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
        <SocialLinks screenHeight={typeof window !== 'undefined' ? window.innerHeight : null} />
      </motion.div>
    </main>
  );
}
