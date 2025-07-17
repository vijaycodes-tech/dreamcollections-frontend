package com.dreamcollections.productcatalogservice.service;

import com.dreamcollections.productcatalogservice.model.Category;
import com.dreamcollections.productcatalogservice.model.Product;
import com.dreamcollections.productcatalogservice.repository.CategoryRepository;
import com.dreamcollections.productcatalogservice.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}
