package com.dreamcollections.productcatalogservice.repository;

import com.dreamcollections.productcatalogservice.model.ColorVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ColorVariantRepository extends JpaRepository<ColorVariant, Long> {
}
