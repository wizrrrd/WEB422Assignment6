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
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/Layout';
import RouteGuard from '../components/RouteGuard'; 
import { SWRConfig } from 'swr';

export default function App({ Component, pageProps }) {
  return (
    <RouteGuard> {}
      <SWRConfig
        value={{
          fetcher: async (url) => {
            const res = await fetch(url);
            if (!res.ok) {
              const error = new Error('An error occurred while fetching the data.');
              try {
                error.info = await res.json();
              } catch {
                error.info = { message: 'Invalid JSON response' };
              }
              error.status = res.status;
              throw error;
            }
            return res.json();
          },
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </RouteGuard>
  );
}