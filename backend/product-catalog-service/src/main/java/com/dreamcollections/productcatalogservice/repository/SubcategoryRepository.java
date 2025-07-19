package com.dreamcollections.productcatalogservice.repository;

import com.dreamcollections.productcatalogservice.model.Subcategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SubcategoryRepository extends JpaRepository<Subcategory, Long> {
    Optional<Subcategory> findBySlug(String slug);
}
