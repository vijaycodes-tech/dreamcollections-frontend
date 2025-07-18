package com.dreamcollections.orderservice.service;

import com.dreamcollections.orderservice.dto.OrderDto;
import com.dreamcollections.orderservice.dto.OrderItemDto;
import com.dreamcollections.orderservice.model.Order;
import com.dreamcollections.orderservice.model.OrderItem;
import com.dreamcollections.orderservice.repository.OrderRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Transactional
    public Order createOrder(OrderDto orderDto) {
        Order order = new Order();
        order.setCustomerName(orderDto.getCustomerName());
        order.setShippingAddress(orderDto.getShippingAddress());
        order.setCity(orderDto.getCity());
        order.setState(orderDto.getState());
        order.setZipCode(orderDto.getZipCode());
        order.setPhoneNumber(orderDto.getPhoneNumber());
        order.setEmail(orderDto.getEmail());
        order.setOrderStatus("CREATED");

        order.setOrderItems(orderDto.getOrderItems().stream()
                .map(orderItemDto -> toOrderItem(orderItemDto, order))
                .collect(Collectors.toList()));

        return orderRepository.save(order);
    }

    public List<Order> getOrdersByUserId(String userId) {
        // In a real application, you would have a userId field in the Order entity
        // and you would query by that. For now, we'll just return all orders.
        return orderRepository.findAll();
    }

    private OrderItem toOrderItem(OrderItemDto orderItemDto, Order order) {
        OrderItem orderItem = new OrderItem();
        orderItem.setProductId(orderItemDto.getProductId());
        orderItem.setQuantity(orderItemDto.getQuantity());
        orderItem.setPrice(orderItemDto.getPrice());
        orderItem.setOrder(order);
        return orderItem;
    }
}
