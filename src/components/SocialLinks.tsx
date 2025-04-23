'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaTiktok } from 'react-icons/fa';

const baseStyles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    marginTop: '40px',
    width: '100%',
    flexWrap: 'wrap' as const,
  },
  iconLink: {
    color: '#999999',
    transition: 'color 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px',
  },
  iconHover: {
    color: '#b1dd9e',
  },
};

export default function SocialLinks() {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [styles, setStyles] = useState(baseStyles);

  useEffect(() => {
    // No specific responsive styles needed for this component
    // But the structure is in place if needed in the future
    setStyles(baseStyles);
    
    const handleResize = () => {
      setStyles(baseStyles);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      style={styles.container}
    >
      <a 
        href="https://instagram.com/getmatchi" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
          ...styles.iconLink,
          ...(hoveredIcon === 'instagram' ? styles.iconHover : {})
        }}
        onMouseEnter={() => setHoveredIcon('instagram')}
        onMouseLeave={() => setHoveredIcon(null)}
      >
        <FaInstagram size={20} />
      </a>
      
      <a 
        href="https://tiktok.com/@getmatchi" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
          ...styles.iconLink,
          ...(hoveredIcon === 'tiktok' ? styles.iconHover : {})
        }}
        onMouseEnter={() => setHoveredIcon('tiktok')}
        onMouseLeave={() => setHoveredIcon(null)}
      >
        <FaTiktok size={20} />
      </a>
    </motion.div>
  );
} 