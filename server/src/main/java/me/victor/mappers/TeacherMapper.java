package me.victor.mappers;

import me.victor.models.dto.teacher.CreateTeacherDTO;
import me.victor.models.dto.teacher.RetrieveTeacherDTO;
import me.victor.models.entities.Teacher;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface TeacherMapper {
    @Mapping(target = "teacherRoles", expression = "java(java.util.List.of(dto.getRole()))")
    Teacher dtoToTeacher(CreateTeacherDTO dto);

    RetrieveTeacherDTO teacherToDto(Teacher teacher);
}
