package com.dreamcollections.productcatalogservice.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.util.List;
import lombok.Data;

@Entity
@Table(name = "products")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private String size;
    private String slug;

    @ManyToOne
    private Subcategory subcategory;

    @OneToMany(mappedBy = "product")
    private List<ColorVariant> colorVariants;

    @OneToMany(mappedBy = "product")
    private List<Media> mediaList;
}
