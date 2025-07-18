package com.dreamcollections.productcatalogservice.repository;

import com.dreamcollections.productcatalogservice.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findBySubcategoryId(Long subcategoryId);
    Optional<Product> findBySlug(String slug);
}
