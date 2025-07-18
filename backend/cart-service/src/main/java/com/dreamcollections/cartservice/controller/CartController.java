package com.dreamcollections.cartservice.controller;

import com.dreamcollections.cartservice.model.Cart;
import com.dreamcollections.cartservice.model.CartItem;
import com.dreamcollections.cartservice.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/{userId}")
    public Cart getCart(@PathVariable String userId) {
        return cartService.getCart(userId);
    }

    @PostMapping("/{userId}")
    public Cart addItemToCart(@PathVariable String userId, @RequestBody CartItem item) {
        return cartService.addItemToCart(userId, item);
    }

    @DeleteMapping("/{userId}/{productId}")
    public Cart removeItemFromCart(@PathVariable String userId, @PathVariable Long productId) {
        return cartService.removeItemFromCart(userId, productId);
    }
}
