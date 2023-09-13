import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";
import { ProductProvider } from "./ProductContext";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductPage from './components/ProductPage';

function App() {
  return (
    <ProductProvider>
      <Router>
        <div className="bg-gray-300 min-h-screen" >
          <Header />
          <Routes>
            <Route exact path="/" element={<ProductGrid />} />
            <Route path="/product/:productId" element={<ProductPage />} />
          </Routes>
        </div>
      </Router>
    </ProductProvider>
  );
}

export default App;
