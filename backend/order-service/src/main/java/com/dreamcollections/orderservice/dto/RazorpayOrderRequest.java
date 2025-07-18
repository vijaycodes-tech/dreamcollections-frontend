package com.dreamcollections.orderservice.dto;

import lombok.Data;

@Data
public class RazorpayOrderRequest {
    private int amount;
    private String currency;
}
