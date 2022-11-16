package me.victor.api.rest.errors;

import me.victor.exceptions.RestException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Order(Ordered.HIGHEST_PRECEDENCE)
@RestControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(RestException.class)
    protected ResponseEntity<ApiError> handleResourceException(RestException ex) {
        ex.printStackTrace();
        return new ResponseEntity<>(getError(ex.getStatus(), ex), ex.getStatus());
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers,
                                                                  HttpStatus status, WebRequest request) {
        String rejectedValue = ex.getFieldError().getRejectedValue() == null
                ? "null"
                : ex.getFieldError().getRejectedValue().toString();

        return new ResponseEntity<>(new ApiError(HttpStatus.BAD_REQUEST, ex.getFieldError().getDefaultMessage(), ex)
                .setDebugMessage(rejectedValue),
                HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    protected ApiError handleUnknownException(RuntimeException ex) {
        ex.printStackTrace();
        return new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, ex);
    }

    private ApiError getError(HttpStatus status, Exception ex) {
        return new ApiError(status, ex.getMessage(), ex);
    }
}
