'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const baseStyles = {
  form: {
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px',
    marginTop: '24px',
    boxSizing: 'border-box' as const,
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    marginBottom: '16px',
    width: '100%',
  },
  label: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#555555',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '10px 2px',
    fontSize: '16px',
    border: 'none',
    borderBottom: '1px solid #CCCCCC',
    backgroundColor: 'white',
    color: '#333333',
    boxSizing: 'border-box' as const,
  },
  milkPreferenceContainer: {
    marginBottom: '24px',
    width: '100%',
  },
  milkPreferenceLabel: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#555555',
    marginBottom: '12px',
    display: 'block',
  },
  milkPreference: {
    display: 'flex',
    gap: '12px',
    width: '100%',
  },
  milkButton: {
    flex: 1,
    padding: '10px 16px',
    borderRadius: '9999px',
    border: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: '#EEEEEE',
    color: '#555555',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    minWidth: '0',
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  milkButtonActive: {
    backgroundColor: '#b1dd9e',
    color: 'white',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  submitButton: {
    width: '100%',
    padding: '14px 0',
    borderRadius: '9999px',
    backgroundColor: '#b1dd9e',
    color: 'white',
    fontSize: '16px',
    fontWeight: 500,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginTop: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  submitButtonHover: {
    backgroundColor: '#a3cf90',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  thankYou: {
    textAlign: 'center' as const,
    fontSize: '24px',
    fontWeight: 400,
    color: '#333333',
    marginBottom: '24px',
  },
  submitAnother: {
    padding: '12px 24px',
    borderRadius: '9999px',
    backgroundColor: '#EEEEEE',
    color: '#555555',
    fontSize: '16px',
    fontWeight: 500,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  },
};

// Responsive style adjustments
const getResponsiveStyles = () => {
  if (typeof window !== 'undefined') {
    const width = window.innerWidth;
    
    if (width < 360) {
      // Extra small screens (iPhone SE, etc.)
      return {
        milkButton: {
          padding: '10px 12px',
          fontSize: '13px',
        },
        submitButton: {
          padding: '12px 0',
        },
      };
    }
  }
  return {};
};

export default function MatchaForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    milkPreference: 'oat'
  });
  const [submitted, setSubmitted] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [styles, setStyles] = useState(baseStyles);

  useEffect(() => {
    // Set initial responsive styles
    const responsiveStyles = getResponsiveStyles();
    setStyles({
      ...baseStyles,
      ...(responsiveStyles as any),
      milkButton: {
        ...baseStyles.milkButton,
        ...(responsiveStyles as any)?.milkButton,
      },
      submitButton: {
        ...baseStyles.submitButton,
        ...(responsiveStyles as any)?.submitButton,
      },
    });
    
    // Update responsive styles on window resize
    const handleResize = () => {
      const responsiveStyles = getResponsiveStyles();
      setStyles({
        ...baseStyles,
        ...(responsiveStyles as any),
        milkButton: {
          ...baseStyles.milkButton,
          ...(responsiveStyles as any)?.milkButton,
        },
        submitButton: {
          ...baseStyles.submitButton,
          ...(responsiveStyles as any)?.submitButton,
        },
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    console.log(formData);
  };

  const handleSubmitAnother = () => {
    setSubmitted(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      milkPreference: 'oat'
    });
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', width: '100%' }}
      >
        <h2 style={styles.thankYou}>thank you for joining 🍵</h2>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmitAnother}
          style={styles.submitAnother}
        >
          submit another
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      style={styles.form}
    >
      <div style={styles.formGroup}>
        <label htmlFor="firstName" style={styles.label}>
          first name
        </label>
        <input
          type="text"
          id="firstName"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          style={styles.input}
          required
        />
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="lastName" style={styles.label}>
          last name
        </label>
        <input
          type="text"
          id="lastName"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          style={styles.input}
          required
        />
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="email" style={styles.label}>
          email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          style={styles.input}
          required
        />
      </div>

      <div style={styles.milkPreferenceContainer}>
        <label style={styles.milkPreferenceLabel}>
          milk preference
        </label>
        <div style={styles.milkPreference}>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, milkPreference: 'oat' })}
            style={{
              ...styles.milkButton,
              ...(formData.milkPreference === 'oat' ? styles.milkButtonActive : {})
            }}
          >
            Oat Milk 🧋
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, milkPreference: 'whole' })}
            style={{
              ...styles.milkButton,
              ...(formData.milkPreference === 'whole' ? styles.milkButtonActive : {})
            }}
          >
            Whole Milk 🥛
          </button>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onMouseEnter={() => setButtonHovered(true)}
        onMouseLeave={() => setButtonHovered(false)}
        type="submit"
        style={{
          ...styles.submitButton,
          ...(buttonHovered ? styles.submitButtonHover : {})
        }}
      >
        keep me posted 💌
      </motion.button>
    </motion.form>
  );
} 