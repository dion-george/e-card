import React, { useState } from 'react';
import html2canvas from 'html2canvas';

const ECard = () => {
  const [text, setText] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
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

          alert('Web Share API is not supported in this browser.')
          // You could handle cases where the Web Share API is not supported,
          // e.g., fall back to a different method or show an error message.
        }
      });
    });
  };

  return (
    <div>
      <div style={styles.container} id="ecard">
        <img
          src="https://via.placeholder.com/300x200.png?text=Your+Image+Here"
          alt="E-card background"
          style={styles.image}
        />
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          style={styles.textInput}
          placeholder="Your message here"
        />
      </div>
      <button onClick={handleCaptureClick} style={styles.button}>
        Capture and Share
      </button>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '300px',
    height: '200px',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  textInput: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    fontSize: '18px',
    padding: '5px',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Optional for readability
    border: 'none',
    borderRadius: '5px',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default ECard;
