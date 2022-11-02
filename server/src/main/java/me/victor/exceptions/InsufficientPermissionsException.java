package me.victor.exceptions;

import org.springframework.http.HttpStatus;

public class InsufficientPermissionsException extends RestException {
    public InsufficientPermissionsException(String message) {
        super(message);
    }

    @Override
    public HttpStatus getStatus() {
        return HttpStatus.FORBIDDEN;
    }
}
