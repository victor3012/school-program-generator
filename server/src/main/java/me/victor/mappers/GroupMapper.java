package me.victor.mappers;

import me.victor.models.dto.group.CreateGroupDTO;
import me.victor.models.dto.group.GroupDTO;
import me.victor.models.entities.Group;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface GroupMapper {
    Group createDtoToGroup(CreateGroupDTO dto);
    Group updateDtoToGroup(GroupDTO dto);

    GroupDTO groupToDTO(Group group);
    List<GroupDTO> groupsToDTOs(List<Group> groups);
}
