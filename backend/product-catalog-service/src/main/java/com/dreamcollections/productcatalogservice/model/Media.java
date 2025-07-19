package com.dreamcollections.productcatalogservice.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "media")
@Data
public class Media {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Enumerated(EnumType.STRING)
    private MediaType mediaType;
    
    private String url;
    private String altText;
    private Integer sortOrder;

    @ManyToOne
    private Product product;

    @ManyToOne
    private ColorVariant colorVariant;

    public enum MediaType {
        IMAGE, VIDEO
    }
}
