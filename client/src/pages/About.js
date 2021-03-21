import React from 'react';
import bioPic from '../assets/family.jpeg';
import foodPic from '../assets/ingredients.jpeg';

const About = () => (
  <div
    className="text-center"
    style={{
      backgroundColor: '#122240',
      color: '#c0a98e',
      padding: '35px',
    }}
  >
    <h1 id="about">About Us</h1>
    <img src={bioPic} style={{ width: '35%', padding: '35px' }} alt="family pic" />
    <img src={foodPic} style={{ width: '35%', padding: '35px' }} alt="ingredients pic" />
    <p
      style={{
        fontSize: '20px',
      }}
    >
      From our family to yours, Full Stack Taco Shop dares to whisk you away to the streets of Mexico through the smells
      and taste of our authentic cuisine. Using only recipes handed down for generations, we delight in serving our
      customers with only the finest, freshest ingredients. Abuela Maria still comes in on weekends to help prepare her
      special guacamole.It was she who first started this idea of sharing her talents in the kitchen with others. Now
      forty-eight years later, the legacy lives on.
    </p>
    <p
      style={{
        fontSize: '20px',
      }}
    >
      While our menu may be small, the flavors aren’t! We pride ourselves in serving only the best and sticking with
      what we know will be the best Mexican dishes in town! Try our signature tacos, oversized burritos, satisfying
      nachos, or our mouth-watering quesadillas today!
    </p>
  </div>
);

export default About;
