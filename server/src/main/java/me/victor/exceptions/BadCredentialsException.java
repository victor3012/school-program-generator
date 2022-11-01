package me.victor.exceptions;

import org.springframework.http.HttpStatus;

public class BadCredentialsException extends RestException {
    public BadCredentialsException(String message) {
        super(message);
    }

    @Override
    public HttpStatus getStatus() {
        return HttpStatus.UNAUTHORIZED;
    }
}
