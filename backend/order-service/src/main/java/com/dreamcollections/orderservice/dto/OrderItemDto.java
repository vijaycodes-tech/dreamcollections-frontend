package com.dreamcollections.orderservice.dto;

import lombok.Data;

@Data
public class OrderItemDto {
    private Long productId;
    private int quantity;
    private double price;
}
