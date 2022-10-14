package me.victor.exceptions;

import org.springframework.http.HttpStatus;

/**
 * Error 400 - Bad Request
 */
public class DataFormatException extends RestException {
    public DataFormatException(String message) {
        super(message);
    }

    @Override
    public HttpStatus getStatus() {
        return HttpStatus.BAD_REQUEST;
    }
}