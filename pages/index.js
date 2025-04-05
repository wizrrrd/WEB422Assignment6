/*********************************************************************************
*  WEB422 – Assignment 4
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: __Aditi Sharma__ Student ID: _145646238_ Date: ___3/21/2025____
********************************************************************************/ 

import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="mt-4 text-center">
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
        alt="Metropolitan Museum of Art"
        width={800}
        height={400}
        className="img-fluid rounded"
      />
      <h1 className="mt-4">Welcome to the Metropolitan Museum of Art Collection</h1>
      <p>
        The Metropolitan Museum of Art presents over 5,000 years of art from around the world for everyone to experience and enjoy. The Museum is located at two iconic sites in New York City—The Met Fifth Avenue and The Met Cloisters. Millions of people also take part in The Met experience online. Explore thousands of artworks from one of the world’s most prestigious museums. Learn more about the museum on{' '}
        <a
          href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wikipedia
        </a>.
      </p>
    </div>
  );
}
