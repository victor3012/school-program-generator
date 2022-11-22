package me.victor.services;

import me.victor.data.dao.RequestRepository;
import me.victor.data.dto.request.RequestDTO;
import me.victor.data.entities.School;
import me.victor.data.entities.SpecialLesson;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestService {
    private final RequestRepository requestRepository;

    public RequestService(RequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }


}
