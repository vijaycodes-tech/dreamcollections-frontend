package com.dreamcollections.productcatalogservice.repository;

import com.dreamcollections.productcatalogservice.model.Media;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MediaRepository extends JpaRepository<Media, Long> {
}
