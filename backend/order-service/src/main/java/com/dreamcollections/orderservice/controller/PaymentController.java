package com.dreamcollections.orderservice.controller;

import com.dreamcollections.orderservice.dto.RazorpayOrderRequest;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PaymentController {

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    @PostMapping("/create-razorpay-order")
    public String createRazorpayOrder(@RequestBody RazorpayOrderRequest request) throws RazorpayException {
        RazorpayClient razorpayClient = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", request.getAmount());
        orderRequest.put("currency", request.getCurrency());

        Order order = razorpayClient.orders.create(orderRequest);
        return order.toString();
    }
}
