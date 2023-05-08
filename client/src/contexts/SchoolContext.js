import { useFocusEffect, useLinkTo, useRoute } from "@react-navigation/native";
import { createContext, useCallback, useEffect, useState } from "react";
import * as service from "../services/schools";

export const SchoolContext = createContext();

export function SchoolProvider({ children }) {
    const route = useRoute();
    const linkTo = useLinkTo();
    const [school, setSchool] = useState(null);
    const [teacher, setTeacher] = useState(null);

    const fetchData = useCallback(() => {
        (async () => {
            try {
                const { teacher, ...school } = await service.getSchoolById(route.params?.id);
                setSchool(school);
                setTeacher(teacher)
            } catch (error) {
                alert(error.message);

                setSchool(null);
                setTeacher(null);
                linkTo('/');
            }
        })()
    }, [route.params]);

    useFocusEffect(fetchData);

    const isSchoolLoading = () => {
        return school === null
            || teacher === null;
    }

    return (
        <SchoolContext.Provider value={{
            school,
            teacher,
            isSchoolLoading: isSchoolLoading()
        }}>
            {children}
        </SchoolContext.Provider>
    )
}