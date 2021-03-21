import { useMutation } from '@apollo/client';
import React, { useState } from 'react';

import { validateEmail } from '../utils/helpers';
import { SEND_CONTACT_EMAIL } from '../utils/mutations';

function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [response, setResponse] = useState('');
  const { name, email, message } = formState;
  const [sendContactEmail] = useMutation(SEND_CONTACT_EMAIL);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errorMessage) {
      return;
    }

    const { data } = await sendContactEmail({ variables: formState });
    setResponse(data.sendContactEmail);
    setResponse('Thank you for your message! We will respond to you as quickly as possible.');
  };

  // error messages if nothing is entered in input boxes
  const handleChange = (e) => {
    if (e.target.name === 'email') {
      const isValid = validateEmail(e.target.value);
      if (!isValid) {
        setErrorMessage('Your email is invalid.');
        return;
      }
    } else if (!e.target.value.length) {
      setErrorMessage(`${e.target.name} is required.`);
      return;
    }
    setFormState((state) => ({ ...state, [e.target.name]: e.target.value }));
    setErrorMessage('');
  };

  return (
    <>
    <section>
      <h1 data-testid="h1tag">Contact Us</h1>
      <form id="contact-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" defaultValue={name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email Address:</label>
          <input type="email" name="email" defaultValue={email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea name="message" rows="5" defaultValue={message} onChange={handleChange} />
        </div>
        {errorMessage && (
          <div>
            <p className="error-text">{errorMessage}</p>
          </div>
        )}
        {response && (
          <div>
            <p className="">{response}</p>
          </div>
        )}
        <button data-testid="button" type="submit">
          Submit
        </button>
      </form>
    </section>
    {/* section for address and contact info */}
    <section>
      <div>
        <h3>Full Stack Taco Shop</h3>
        <p>55 Main Street</p>
        <p>Some Town, UT  12345</p>
        <p>Phone Number: 555-786-2839</p>
        <p>Email Address: <a href="fstacoshop@gmail.com">fstacoshop@gmail.com</a></p>
        <p>Hours of Operation: </p>
        <p>Monday-Friday 11:00 AM - 10:00 PM</p>
        <p>Saturday-Sunday 10:30 AM - 12:00 AM</p>        
      </div>
    </section>  
    </>
  );
}

export default Contact;
