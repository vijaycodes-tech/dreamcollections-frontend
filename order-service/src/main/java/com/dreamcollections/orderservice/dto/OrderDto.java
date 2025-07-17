package com.dreamcollections.orderservice.dto;

import java.util.List;
import lombok.Data;

@Data
public class OrderDto {
    private String customerName;
    private String shippingAddress;
    private String city;
    private String state;
    private String zipCode;
    private String phoneNumber;
    private String email;
    private List<OrderItemDto> orderItems;
}
