package me.victor.exceptions;

import org.springframework.http.HttpStatus;

public class DataFormatException extends RestException {
    public DataFormatException(String message) {
        super(message);
    }

    @Override
    public HttpStatus getStatus() {
        return HttpStatus.BAD_REQUEST;
    }
}