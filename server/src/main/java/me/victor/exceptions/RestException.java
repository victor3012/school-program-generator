package me.victor.exceptions;

import org.springframework.http.HttpStatus;

public abstract class RestException extends RuntimeException {
    public RestException(String message) {
        super(message);
    }

    public abstract HttpStatus getStatus();
}
