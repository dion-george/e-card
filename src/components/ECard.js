import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';

const ECard = () => {
  const [text, setText] = useState('Happy weekend guys');
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Adjust the height of the textarea based on its content
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleInputFocus = () => {
    setIsEditing(true);
  };

  const handleInputBlur = () => {
    if (text.trim() === '') {
      setText('Happy weekend guys');
    }
    setIsEditing(false);
  };

  const handleCaptureClick = () => {
    const ecardElement = document.getElementById('ecard');
    html2canvas(ecardElement).then((canvas) => {
      canvas.toBlob((blob) => {
        const file = new File([blob], 'ecard.png', { type: 'image/png' });
        const filesArray = [file];

        if (navigator.share) {
          navigator
            .share({
              files: filesArray,
              title: 'My E-card',
              text: 'Check out this e-card!',
            })
            .then(() => console.log('Share was successful.'))
            .catch((error) => console.log('Sharing failed', error));
        } else {
          console.log('Web Share API is not supported in this browser.');
        }
      });
    });
  };

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <h1 style={styles.headerText}>E-Card</h1>
      </header>
      <div style={styles.container} id="ecard">
        <img src="/balloons-2.png" alt="E-card background" style={styles.image} />
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          style={styles.textInput}
        />
      </div>
      <button onClick={handleCaptureClick} style={styles.button}>
        Capture and Share
      </button>
    </div>
  );
};

const styles = {
  wrapper: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0',
    boxSizing: 'border-box',
  },
  header: {
    width: '100%',
    height: '32px',
    backgroundColor: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  headerText: {
    color: 'black',
    fontSize: '16px',
    margin: 0,
    padding: 0,
  },
  container: {
    width: '85vw',
    height: 'auto',
    textAlign: 'center',
    margin: '24px 0',
    position: 'relative',
    flex: 1,
  },
  image: {
    width: '100%',
    height: 'auto',
    maxHeight: 'calc(100vh - 32px - 48px - 48px)', // Adjusted for header and button
    objectFit: 'contain',
    borderRadius: '10px',
  },
  textInput: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    fontSize: '4vw',
    padding: '2vw',
    textAlign: 'center',
    backgroundColor: 'transparent',  // Completely transparent background
    color: 'black',  // Text color
    border: 'none',  // Remove border
    outline: 'none', // Remove the outline when focused
    cursor: 'text',  // Indicate it can be edited
  },
  button: {
    width: '90vw',
    padding: '1.5vh 0',
    fontSize: '4vw',
    cursor: 'pointer',
    borderRadius: '5px',
    backgroundColor: '#fc8019',
    color: 'white',
    border: 'none',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '16px',
  },
};

export default ECard;
