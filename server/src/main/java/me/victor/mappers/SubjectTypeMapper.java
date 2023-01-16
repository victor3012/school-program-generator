package me.victor.mappers;

import me.victor.models.dto.subject.type.SubjectTypeDTO;
import me.victor.models.entities.SubjectType;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface SubjectTypeMapper {
    SubjectTypeDTO subjectTypeToDTO(SubjectType type);

    List<SubjectTypeDTO> subjectTypesToDTOs(List<SubjectType> types);
}
