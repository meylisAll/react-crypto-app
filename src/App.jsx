
import AppLayout from './components/Layout/AppLayout';
import { CryptoContextProvider } from './context/crypto-context';


export default function App() {
  return (
    <CryptoContextProvider>
      <AppLayout />
    </CryptoContextProvider>
  )
}
