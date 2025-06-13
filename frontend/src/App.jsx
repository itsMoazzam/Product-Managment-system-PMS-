import { Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import ProductDetail from "./components/ProductDetail";
import Header from "./components/Header";

const App = () => (
  <div className="container mx-auto p-4">
    <Header />

    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/add" element={<ProductForm />} />
      <Route path="/edit/:id" element={<ProductForm />} />
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  </div>
);

export default App;
