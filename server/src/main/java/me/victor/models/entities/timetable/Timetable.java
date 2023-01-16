package me.victor.models.entities.timetable;

import me.victor.models.entities.ObjectWithName;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "timetables")
public class Timetable extends ObjectWithName {
    @OneToMany(mappedBy = "timetable", cascade = CascadeType.ALL)
    private List<TimetableGroup> groups;

    /*
    //
     */

    //TODO: RESTRICTIONS
}
