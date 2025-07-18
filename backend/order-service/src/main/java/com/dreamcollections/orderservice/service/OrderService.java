package com.dreamcollections.orderservice.service;

import com.dreamcollections.orderservice.dto.OrderDto;
import com.dreamcollections.orderservice.dto.OrderItemDto;
import com.dreamcollections.orderservice.model.Order;
import com.dreamcollections.orderservice.model.OrderHistory;
import com.dreamcollections.orderservice.model.OrderItem;
import com.dreamcollections.orderservice.model.OrderStatus;
import com.dreamcollections.orderservice.repository.OrderRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
    public Order createGuestOrder(OrderDto orderDto) {
        return createOrder(orderDto, null);
    }

    @Transactional
    public Order createOrder(OrderDto orderDto, Long userId) {
        Order order = new Order();
        order.setUserId(userId);
        order.setCustomerName(orderDto.getCustomerName());
        order.setShippingAddress(orderDto.getShippingAddress());
        order.setCity(orderDto.getCity());
        order.setState(orderDto.getState());
        order.setZipCode(orderDto.getZipCode());
        order.setPhoneNumber(orderDto.getPhoneNumber());
        order.setEmail(orderDto.getEmail());
        order.setOrderStatus(OrderStatus.PAYMENT_PENDING);

        order.setOrderItems(orderDto.getOrderItems().stream()
                .map(orderItemDto -> toOrderItem(orderItemDto, order))
                .collect(Collectors.toList()));

        addOrderHistory(order, OrderStatus.PAYMENT_PENDING);
        return orderRepository.save(order);
    }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getGuestOrderByOrderId(Long orderId) {
        return orderRepository.findById(orderId).orElse(null);
    }

    private OrderItem toOrderItem(OrderItemDto orderItemDto, Order order) {
        OrderItem orderItem = new OrderItem();
        orderItem.setProductId(orderItemDto.getProductId());
        orderItem.setQuantity(orderItemDto.getQuantity());
        orderItem.setPrice(orderItemDto.getPrice());
        orderItem.setOrder(order);
        return orderItem;
    }

    private void addOrderHistory(Order order, OrderStatus status) {
        if (order.getOrderHistory() == null) {
            order.setOrderHistory(new ArrayList<>());
        }
        OrderHistory history = new OrderHistory();
        history.setOrder(order);
        history.setStatus(status);
        history.setTimestamp(LocalDateTime.now());
        order.getOrderHistory().add(history);
    }
}
