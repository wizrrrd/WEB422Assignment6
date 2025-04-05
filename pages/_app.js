/********************************************************************************* 
*  WEB422 – Assignment 3
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*  
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*  
*  Name: Aditi Sharma  Student ID: __145646238__ Date: ____14 Feb 2025_____
*
********************************************************************************/

import RouteGuard from '@/components/RouteGuard';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import Layout from '../components/Layout';
import { SWRConfig } from 'swr';

const fetcher = async (...args) => {
  const response = await fetch(...args);
  if (!response.ok) {
    throw new Error(`Request failed with status: ${response.status}`);
  }
  return response.json();
};

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <RouteGuard>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RouteGuard>
    </SWRConfig>
  );
}
