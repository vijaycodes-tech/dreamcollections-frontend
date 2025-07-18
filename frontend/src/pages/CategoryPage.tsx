import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, Grid, List } from 'lucide-react';
import { fetchProducts, Product } from '../api';

const CategoryPage: React.FC = () => {
  const { category, subcategory } = useParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(err => console.error('Failed to load products', err));
  }, []);

  // Fallback sample data
  const sampleProducts = [
    {
      id: '1',
      name: 'Elegant Pearl Necklace',
      price: 89.99,
      originalPrice: 129.99,
      image: 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=500',
      rating: 4.5,
      colors: ['white', 'gold', 'silver'],
      category: 'necklaces'
    },
    {
      id: '2',
      name: 'Diamond Stud Earrings',
      price: 49.99,
      originalPrice: 79.99,
      image: 'https://images.pexels.com/photos/1454169/pexels-photo-1454169.jpeg?auto=compress&cs=tinysrgb&w=500',
      rating: 4.8,
      colors: ['silver', 'gold', 'rose-gold'],
      category: 'earrings'
    },
    {
      id: '3',
      name: 'Gold Chain Bracelet',
      price: 34.99,
      originalPrice: 54.99,
      image: 'https://images.pexels.com/photos/1454172/pexels-photo-1454172.jpeg?auto=compress&cs=tinysrgb&w=500',
      rating: 4.3,
      colors: ['gold', 'silver'],
      category: 'bracelets'
    },
    {
      id: '4',
      name: 'Vintage Ring Set',
      price: 64.99,
      originalPrice: 94.99,
      image: 'https://images.pexels.com/photos/1454173/pexels-photo-1454173.jpeg?auto=compress&cs=tinysrgb&w=500',
      rating: 4.6,
      colors: ['gold', 'silver', 'rose-gold'],
      category: 'rings'
    },
    {
      id: '5',
      name: 'Statement Necklace',
      price: 119.99,
      originalPrice: 169.99,
      image: 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=500',
      rating: 4.7,
      colors: ['gold', 'silver'],
      category: 'necklaces'
    },
    {
      id: '6',
      name: 'Hoop Earrings',
      price: 29.99,
      originalPrice: 44.99,
      image: 'https://images.pexels.com/photos/1454169/pexels-photo-1454169.jpeg?auto=compress&cs=tinysrgb&w=500',
      rating: 4.4,
      colors: ['gold', 'silver'],
      category: 'earrings'
    }
  ];

  const subcategories = {
    women: ['necklaces', 'earrings', 'bracelets', 'rings', 'sets'],
    men: ['chains', 'bracelets', 'rings', 'cufflinks'],
    kids: ['earrings', 'bracelets', 'rings', 'pendants'],
    bridal: ['mehendi', 'wedding']
  };

  const productList = products.length ? products : sampleProducts;
  const filteredProducts = productList.filter(product => {
    if (subcategory) {
      return product.category === subcategory;
    }
    return true;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 capitalize">
                {category?.replace('-', ' ')} {subcategory ? `- ${subcategory}` : 'Collection'}
              </h1>
              <p className="text-gray-600 mt-1">{filteredProducts.length} products found</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </h3>
              
              {/* Categories */}
              {!subcategory && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Categories</h4>
                  <div className="space-y-2">
                    {subcategories[category as keyof typeof subcategories]?.map((sub) => (
                      <Link
                        key={sub}
                        to={`/category/${category}/${sub}`}
                        className="block text-gray-600 hover:text-primary-600 transition-colors capitalize"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Colors */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Colors</h4>
                <div className="flex flex-wrap gap-2">
                  {['gold', 'silver', 'rose-gold', 'white'].map((color) => (
                    <button
                      key={color}
                      className={`w-6 h-6 rounded-full border-2 border-gray-300 ${
                        color === 'gold' ? 'bg-yellow-400' :
                        color === 'silver' ? 'bg-gray-400' :
                        color === 'rose-gold' ? 'bg-pink-400' :
                        'bg-white'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="lg:w-3/4">
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                >
                  <div className={`${viewMode === 'grid' ? 'aspect-square' : 'aspect-video lg:aspect-[4/3]'}`}>
                    <img
                      src={(product as any).image || (product as any).imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex">{renderStars(product.rating)}</div>
                      <span className="text-sm text-gray-500 ml-2">({product.rating})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gold-600">${product.price}</span>
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                      </div>
                      <div className="flex space-x-1">
                        {product.colors.map((color, index) => (
                          <div
                            key={index}
                            className={`w-4 h-4 rounded-full border ${
                              color === 'gold' ? 'bg-yellow-400' :
                              color === 'silver' ? 'bg-gray-400' :
                              color === 'rose-gold' ? 'bg-pink-400' :
                              'bg-white'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;