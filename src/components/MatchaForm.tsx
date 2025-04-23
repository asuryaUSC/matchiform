'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const baseStyles = {
  form: {
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px',
    marginTop: '16px',
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
    const height = window.innerHeight;
    let styles = {};
    
    // Width-based mobile adjustments
    if (width < 480) {
      styles = {
        ...styles,
        form: {
          gap: '16px', // Reduced gap between form elements
        },
        formGroup: {
          marginBottom: '12px', // Reduce margin between form groups
        },
        milkPreferenceContainer: {
          marginBottom: '16px', // Reduced bottom margin
        },
        milkButton: {
          padding: '8px 12px', // Smaller padding on milk buttons
          fontSize: '13px',
        },
        submitButton: {
          padding: '12px 0', // Reduced padding on submit button
          marginTop: '4px', // Reduced top margin
        },
      };
    }
    
    // Height-based adjustments for laptop screens (targeting 1280x800)
    if (height < 800) {
      styles = {
        ...styles,
        form: {
          ...(styles as any)?.form,
          gap: '10px', // Further reduced gap
          marginTop: '8px', // Minimal top margin
        },
        formGroup: {
          ...(styles as any)?.formGroup,
          marginBottom: '8px', // Reduced margin
        },
        input: {
          ...(styles as any)?.input,
          padding: '8px 2px', // Reduced padding
        },
        milkPreferenceContainer: {
          ...(styles as any)?.milkPreferenceContainer,
          marginBottom: '8px', // Further reduced margin
        },
        milkPreferenceLabel: {
          ...(styles as any)?.milkPreferenceLabel,
          marginBottom: '6px', // Reduced margin
        },
        submitButton: {
          ...(styles as any)?.submitButton,
          padding: '10px 0', // Slightly reduced padding
          marginTop: '2px', // Minimal top margin
        },
        thankYou: {
          ...(styles as any)?.thankYou,
          marginBottom: '16px', // Reduced margin
        },
      };
    }
    
    // Height-based adjustments for small laptops
    if (height < 700) {
      styles = {
        ...styles,
        form: {
          ...(styles as any)?.form,
          gap: '8px', // Minimal gap
          marginTop: '6px',
        },
        formGroup: {
          ...(styles as any)?.formGroup,
          marginBottom: '6px',
        },
        input: {
          ...(styles as any)?.input,
          padding: '6px 2px',
        },
        milkPreferenceContainer: {
          ...(styles as any)?.milkPreferenceContainer,
          marginBottom: '6px',
        },
        milkPreferenceLabel: {
          ...(styles as any)?.milkPreferenceLabel,
          marginBottom: '4px',
        },
        milkButton: {
          ...(styles as any)?.milkButton,
          padding: '8px 10px',
        },
        submitButton: {
          ...(styles as any)?.submitButton,
          padding: '8px 0',
          marginTop: '2px',
        },
      };
    }
    
    // Extra small screens
    if (width < 360 || height < 600) {
      styles = {
        ...styles,
        form: {
          ...(styles as any)?.form,
          gap: '6px',
          marginTop: '4px',
        },
        formGroup: {
          ...(styles as any)?.formGroup,
          marginBottom: '4px',
        },
        milkPreferenceContainer: {
          ...(styles as any)?.milkPreferenceContainer,
          marginBottom: '4px',
        },
        milkButton: {
          ...(styles as any)?.milkButton,
          padding: '6px 8px', // Minimized but still tap-friendly
          fontSize: '12px',
        },
        submitButton: {
          ...(styles as any)?.submitButton,
          padding: '7px 0', // Minimized padding but preserved tap area
          marginTop: '0px',
        },
      };
    }
    
    return styles;
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
      form: {
        ...baseStyles.form,
        ...(responsiveStyles as any)?.form,
      },
      formGroup: {
        ...baseStyles.formGroup,
        ...(responsiveStyles as any)?.formGroup,
      },
      milkPreferenceContainer: {
        ...baseStyles.milkPreferenceContainer,
        ...(responsiveStyles as any)?.milkPreferenceContainer,
      },
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
        form: {
          ...baseStyles.form,
          ...(responsiveStyles as any)?.form,
        },
        formGroup: {
          ...baseStyles.formGroup,
          ...(responsiveStyles as any)?.formGroup,
        },
        milkPreferenceContainer: {
          ...baseStyles.milkPreferenceContainer,
          ...(responsiveStyles as any)?.milkPreferenceContainer,
        },
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          milk: formData.milkPreference,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        // Trigger confetti after a small delay to ensure animation is visible after component renders
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            disableForReducedMotion: true,
            gravity: 1.2, // Fall faster
            scalar: 0.8, // Smaller confetti
            ticks: 200, // Short duration (about 1-2 seconds)
            colors: ['#b1dd9e', '#a3cf90', '#90c17e', '#80b46c', '#72a45e'], // Different shades of green to match the theme
          });
        }, 300);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Network error. Please try again later.");
    }
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
        <h2 style={styles.thankYou}>lets gooooooo!!!</h2>
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
            oat milk 🧋
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, milkPreference: 'whole' })}
            style={{
              ...styles.milkButton,
              ...(formData.milkPreference === 'whole' ? styles.milkButtonActive : {})
            }}
          >
            whole milk 🥛
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