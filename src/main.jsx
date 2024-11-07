import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.jsx';
import './index.css';
import { persistor, store } from './redux/store.js';
import { Buffer } from 'buffer';
window.Buffer = Buffer;
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <QueryClientProvider client={queryClient}>
            <MantineProvider>
                <App />
            </MantineProvider>
        </QueryClientProvider>
        {/* </PersistGate> */}
    </Provider>,
);
