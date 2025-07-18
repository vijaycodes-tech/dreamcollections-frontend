package com.dreamcollections.cartservice.repository;

import com.dreamcollections.cartservice.model.Cart;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends CrudRepository<Cart, String> {
}
