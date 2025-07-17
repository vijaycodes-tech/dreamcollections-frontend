package com.dreamcollections.orderservice.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.List;
import lombok.Data;

@Entity
@Table(name = "orders")
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String customerName;
    private String shippingAddress;
    private String city;
    private String state;
    private String zipCode;
    private String phoneNumber;
    private String email;
    private String orderStatus;

    @OneToMany(mappedBy = "order")
    private List<OrderItem> orderItems;
}
