import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Buffer } from 'buffer';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './index.css';
import { store } from './redux/store.js';
window.Buffer = Buffer;
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <MantineProvider>
                <App />
            </MantineProvider>
        </QueryClientProvider>
    </Provider>,
);
