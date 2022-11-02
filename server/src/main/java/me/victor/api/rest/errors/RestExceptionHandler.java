package me.victor.api.rest.errors;

import me.victor.exceptions.RestException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Order(Ordered.HIGHEST_PRECEDENCE)
@RestControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(RestException.class)
    protected ResponseEntity<ApiError> handleResourceException(RestException ex) {
        return new ResponseEntity<>(getError(ex.getStatus(), ex), ex.getStatus());
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    protected ApiError handleUnknownException(RuntimeException ex) {
        ex.printStackTrace();
        return new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, ex);
    }

    private ApiError getError(HttpStatus status, RuntimeException ex) {
        return new ApiError(status, ex.getMessage(), ex);
    }
}
