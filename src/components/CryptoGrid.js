import React  from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import FetchCryptoData from './fetchCryptoData';
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient();

const CryptoGrid = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <FetchCryptoData /> 
            <ReactQueryDevtools initialIsOpen={true} />         
        </QueryClientProvider>
    );
}

export default CryptoGrid;
