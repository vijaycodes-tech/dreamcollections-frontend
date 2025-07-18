package com.dreamcollections.cartservice.service;

import com.dreamcollections.cartservice.model.Cart;
import com.dreamcollections.cartservice.model.CartItem;
import com.dreamcollections.cartservice.repository.CartRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public Cart getCart(String userId) {
        return cartRepository.findById(userId).orElse(new Cart());
    }

    public Cart addItemToCart(String userId, CartItem item) {
        Cart cart = getCart(userId);
        cart.setUserId(userId);
        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(i -> i.getProductId().equals(item.getProductId()))
                .findFirst();

        if (existingItem.isPresent()) {
            existingItem.get().setQuantity(existingItem.get().getQuantity() + item.getQuantity());
        } else {
            cart.getItems().add(item);
        }
        return cartRepository.save(cart);
    }

    public Cart removeItemFromCart(String userId, Long productId) {
        Cart cart = getCart(userId);
        cart.getItems().removeIf(item -> item.getProductId().equals(productId));
        return cartRepository.save(cart);
    }
}
