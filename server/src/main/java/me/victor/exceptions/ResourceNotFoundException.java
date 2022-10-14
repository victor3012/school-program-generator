package me.victor.exceptions;

import org.springframework.http.HttpStatus;

/**
 * Error 404 - Not Found
 */
public class ResourceNotFoundException extends RestException {
    public ResourceNotFoundException(String message) {
        super(message);
    }

    @Override
    public HttpStatus getStatus() {
        return HttpStatus.NOT_FOUND;
    }
}
