package com.dreamcollections.productcatalogservice.controller;

import com.dreamcollections.productcatalogservice.model.Category;
import com.dreamcollections.productcatalogservice.model.Product;
import com.dreamcollections.productcatalogservice.model.Subcategory;
import com.dreamcollections.productcatalogservice.service.ProductService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @GetMapping("/subcategory/{subcategoryId}")
    public List<Product> getProductsBySubcategory(@PathVariable Long subcategoryId) {
        return productService.getProductsBySubcategory(subcategoryId);
    }

    @GetMapping("/collections")
    public List<Category> getAllCollections() {
        return productService.getAllCategories();
    }

    @GetMapping("/subcategories")
    public List<Subcategory> getAllSubcategories() {
        return productService.getAllSubcategories();
    }

    @GetMapping("/collections/{collectionId}/subcategories")
    public List<Subcategory> getSubcategoriesByCollection(@PathVariable Long collectionId) {
        return productService.getSubcategoriesByCollection(collectionId);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Product createProduct(@RequestBody Product product) {
        return productService.createProduct(product);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
}
