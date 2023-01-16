package me.victor.mappers;

import me.victor.models.dto.subject.type.SubjectTypeDTO;
import me.victor.models.entities.SubjectType;

import java.util.List;

public interface SubjectTypeMapper {
    SubjectTypeDTO subjectTypeToDTO(SubjectType type);

    List<SubjectTypeDTO> subjectTypesToDTOs(List<SubjectType> types);
}
