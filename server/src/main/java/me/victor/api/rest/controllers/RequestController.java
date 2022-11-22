package me.victor.api.rest.controllers;

import me.victor.data.dto.request.RequestDTO;
import me.victor.data.entities.School;
import me.victor.data.entities.User;
import me.victor.exceptions.DataFormatException;
import me.victor.exceptions.ResourceNotFoundException;
import me.victor.services.RequestService;
import me.victor.services.SchoolService;
import me.victor.services.UserService;
import org.springframework.validation.SmartValidator;
import org.springframework.validation.annotation.Validated;
import org.springframework.validation.beanvalidation.SpringValidatorAdapter;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import javax.validation.*;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin
@RequestMapping("api/schools/{id}/requests")
public class RequestController {


}
