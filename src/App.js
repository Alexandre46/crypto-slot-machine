import { Suspense } from 'react';
import './App.css';
import CryptoGrid from './components/CryptoGrid';

function App() {
  return (
    <div className="App">
      <Suspense fallback={<p>loading...</p>}>
        <CryptoGrid />
      </Suspense>
    </div>
  );
}

export default App;
