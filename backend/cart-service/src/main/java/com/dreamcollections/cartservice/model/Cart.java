package com.dreamcollections.cartservice.model;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Data
@RedisHash("Cart")
public class Cart {
    @Id
    private String userId;
    private List<CartItem> items = new ArrayList<>();
}
