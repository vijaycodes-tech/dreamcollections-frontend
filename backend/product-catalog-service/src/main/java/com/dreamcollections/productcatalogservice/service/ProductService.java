package com.dreamcollections.productcatalogservice.service;

import com.dreamcollections.productcatalogservice.model.Category;
import com.dreamcollections.productcatalogservice.model.Product;
import com.dreamcollections.productcatalogservice.model.Subcategory;
import com.dreamcollections.productcatalogservice.repository.CategoryRepository;
import com.dreamcollections.productcatalogservice.repository.ProductRepository;
import com.dreamcollections.productcatalogservice.repository.SubcategoryRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SubcategoryRepository subcategoryRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public List<Product> getProductsBySubcategory(Long subcategoryId) {
        return productRepository.findBySubcategoryId(subcategoryId);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public List<Subcategory> getAllSubcategories() {
        return subcategoryRepository.findAll();
    }

    public List<Subcategory> getSubcategoriesByCollection(Long collectionId) {
        return subcategoryRepository.findAll().stream()
                .filter(sub -> sub.getCollection().getId().equals(collectionId))
                .toList();
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
