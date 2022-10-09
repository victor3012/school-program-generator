package me.victor.api.rest.errors;

import me.victor.api.rest.errors.ApiError;
import me.victor.exceptions.DataFormatException;
import me.victor.exceptions.ResourceNotFoundException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Order(Ordered.HIGHEST_PRECEDENCE)
@RestControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {DataFormatException.class, IllegalArgumentException.class, IllegalStateException.class})
    protected ResponseEntity<ApiError> handleInputExceptions(RuntimeException ex) {
        ApiError error = getError(HttpStatus.BAD_REQUEST, ex);
        return new ResponseEntity<>(error, error.getStatus());
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    protected ApiError handleResourceException(RuntimeException ex) {
        return getError(HttpStatus.NOT_FOUND, ex);
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    protected ApiError handleUnknownException(RuntimeException ex) {
        return new ApiError(HttpStatus.BAD_REQUEST, ex);
    }

    private ApiError getError(HttpStatus status, RuntimeException ex) {
        return new ApiError(status, ex.getMessage(), ex);
    }
}
