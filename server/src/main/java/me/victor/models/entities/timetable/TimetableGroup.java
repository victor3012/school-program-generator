package me.victor.models.entities.timetable;

import me.victor.models.entities.Group;
import me.victor.models.entities.ObjectWithId;
import me.victor.models.entities.Room;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.Set;

@Entity
@Table(name = "timetable_groups")
public class TimetableGroup extends ObjectWithId {
    @ManyToOne
    private Group group;

    @ManyToMany
    private Set<TimetableSubject> subjects;

    @ManyToOne
    private Room classRoom;

    @ManyToOne(optional = false)
    private Timetable timetable;
}
