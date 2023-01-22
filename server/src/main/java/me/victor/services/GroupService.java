package me.victor.services;

import me.victor.exceptions.DataFormatException;
import me.victor.exceptions.ResourceNotFoundException;
import me.victor.mappers.GroupMapper;
import me.victor.models.dto.group.CreateGroupDTO;
import me.victor.models.dto.group.GroupDTO;
import me.victor.models.dto.subject.RetrieveSubjectDTO;
import me.victor.models.entities.Group;
import me.victor.models.entities.School;
import me.victor.repositories.GroupRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Comparator;
import java.util.List;

@Service
@Transactional
public class GroupService {
    private final GroupRepository repository;
    private final GroupMapper mapper;

    public GroupService(GroupRepository repository, GroupMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public void createGroup(School school, CreateGroupDTO dto) {
        if (this.repository.findByNameAndSchoolId(dto.getName(), school.getId()).isPresent()) {
            throw new DataFormatException("Group already exists");
        }

        Group group = mapper.createDtoToGroup(dto);
        group.setSchool(school);

        repository.save(group);
    }

    public void updateGroup(School school, long groupId, CreateGroupDTO dto) {
        Group group = this.repository.findByIdAndSchoolId(groupId, school.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Group not found"));

        group.setName(dto.getName());

        this.repository.save(group);
    }

    public GroupDTO getGroup(School school, long groupId) {
        return this.mapper.groupToDTO(this.repository
                .findByIdAndSchoolId(groupId, school.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Group not found")));
    }

    public List<GroupDTO> getGroups(School school) {
        List<GroupDTO> groupDTOS = this.mapper.groupsToDTOs(this.repository
                .findBySchoolId(school.getId()));

        groupDTOS.sort(Comparator.comparing(CreateGroupDTO::getName));

        return groupDTOS;
    }

    public GroupDTO getGroupInSchool(long groupId, long id) {
        return mapper.groupToDTO(this.repository.findByIdAndSchoolId(groupId, id)
                .orElseThrow(() -> new IllegalArgumentException("This group doesn't exist")));
    }

    public void deleteGroup(long groupId, long id) {
        this.repository.deleteByIdAndSchoolId(groupId, id);
    }
}
