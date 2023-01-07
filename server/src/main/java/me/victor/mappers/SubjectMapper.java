package me.victor.mappers;

import me.victor.models.dto.subject.RetrieveSubjectDTO;
import me.victor.models.entities.Subject;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper
public interface SubjectMapper {

    @Mapping(target = "type", expression = "java(subject.getType() == null ? null : subject.getType().getName())")
    @Mapping(target = "roomType", expression = "java(subject.getRoomType() == null ? null : subject.getRoomType().getName())")
    RetrieveSubjectDTO subjectToDTO(Subject subject);

    List<RetrieveSubjectDTO> subjectsToDTOs(List<Subject> subjects);
}
