package com.dreamcollections.orderservice.controller;

import com.dreamcollections.orderservice.dto.OrderDto;
import com.dreamcollections.orderservice.model.Order;
import com.dreamcollections.orderservice.service.OrderService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUserId(@PathVariable String userId) {
        return orderService.getOrdersByUserId(userId);
    }
}
