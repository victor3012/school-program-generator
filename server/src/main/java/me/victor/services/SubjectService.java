package me.victor.services;

import me.victor.data.dao.SubjectRepository;
import org.springframework.stereotype.Service;

@Service
public class SubjectService {
    private final SubjectRepository subjectRepository;

    public SubjectService(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    public int getSubjectsCountBySchoolId(long id) {
        return this.subjectRepository.countBySchoolId(id);
    }
}
