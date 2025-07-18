package com.dreamcollections.cartservice.model;

import lombok.Data;

@Data
public class CartItem {
    private Long productId;
    private int quantity;
    private double price;
}
