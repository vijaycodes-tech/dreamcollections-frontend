package com.dreamcollections.orderservice.controller;

import com.dreamcollections.orderservice.dto.OrderDto;
import com.dreamcollections.orderservice.model.Order;
import com.dreamcollections.orderservice.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderDto orderDto) {
        Order order = orderService.createOrder(orderDto);
        return ResponseEntity.ok(order);
    }
}
