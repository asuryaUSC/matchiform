'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaTiktok } from 'react-icons/fa';

interface SocialLinksProps {
  screenHeight: number | null;
}

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

export default function SocialLinks({ screenHeight }: SocialLinksProps) {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [styles, setStyles] = useState(baseStyles);

  useEffect(() => {
    // Apply responsive styles based on screen height
    let updatedStyles = { ...baseStyles };
    
    if (screenHeight && screenHeight < 800) {
      updatedStyles = {
        ...updatedStyles,
        container: {
          ...updatedStyles.container,
          marginTop: '16px',
          gap: '12px',
        },
        iconLink: {
          ...updatedStyles.iconLink,
          padding: '6px',
        }
      };
    }
    
    if (screenHeight && screenHeight < 700) {
      updatedStyles = {
        ...updatedStyles,
        container: {
          ...updatedStyles.container,
          marginTop: '12px',
          gap: '10px',
        },
        iconLink: {
          ...updatedStyles.iconLink,
          padding: '4px',
        }
      };
    }
    
    if (screenHeight && screenHeight < 600) {
      updatedStyles = {
        ...updatedStyles,
        container: {
          ...updatedStyles.container,
          marginTop: '8px',
          gap: '8px',
        }
      };
    }
    
    setStyles(updatedStyles);
    
    const handleResize = () => {
      let newStyles = { ...baseStyles };
      const currentHeight = window.innerHeight;
      
      if (currentHeight < 800) {
        newStyles = {
          ...newStyles,
          container: {
            ...newStyles.container,
            marginTop: '16px',
            gap: '12px',
          },
          iconLink: {
            ...newStyles.iconLink,
            padding: '6px',
          }
        };
      }
      
      if (currentHeight < 700) {
        newStyles = {
          ...newStyles,
          container: {
            ...newStyles.container,
            marginTop: '12px',
            gap: '10px',
          },
          iconLink: {
            ...newStyles.iconLink,
            padding: '4px',
          }
        };
      }
      
      if (currentHeight < 600) {
        newStyles = {
          ...newStyles,
          container: {
            ...newStyles.container,
            marginTop: '8px',
            gap: '8px',
          }
        };
      }
      
      setStyles(newStyles);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [screenHeight]);

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