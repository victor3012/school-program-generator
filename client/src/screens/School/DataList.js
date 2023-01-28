import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

import PlusIcon from "../../components/Icons/PlusIcon";
import SearchIcon from "../../components/Icons/SearchIcon";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from '../../components/Icons/Chevron';
import { SchoolContext } from "../../contexts/SchoolContext";
import { TEACHER_ROLES } from "../../services/util";

import Input from "../../components/Common/Input";
import OpacityButton from "../../components/Common/OpacityButton";
import DataItemContainer from './DataItemContainer'
import globalStyles from "../../styles/globalStyles";
import styleVar from "../../styles/styleVar";

export default function DataList({
    data,
    actions,
    filterCallback,
    DataItem,
    itemHeight = 90,
    addButtonShown = true,
    onAddButtonPress
}) {
    const { teacher } = useContext(SchoolContext);
    const [query, setQuery] = useState('');
    const { width } = useWindowDimensions();
    const [height, setHeight] = useState(0);

    const [itemsPerPage, setItemsPerPage] = useState(0);
    const [paginationIdx, setPaginationIdx] = useState(0);
    const [pagesCount, setPagesCount] = useState(1);

    useEffect(() => { //pagination
        setPaginationIdx(0);

        const maxItems = getMaxItems(height, itemHeight);
        const itemsCount = data.length;

        setItemsPerPage(maxItems);

        const newPages = Math.ceil(itemsCount / maxItems);
        setPagesCount(Math.max(newPages, 1));
    }, [height, data])

    useEffect(() => { // search
        setPaginationIdx(0);

        const filtered = data.filter(d => filterCallback(query, d));
        const itemsCount = filtered.length;
        const maxItems = getMaxItems(height, itemHeight);


        const newPages = Math.ceil(itemsCount / maxItems);
        setPagesCount(Math.max(newPages, 1));
    }, [query])


    const updateHeightHandler = (e) => {
        setHeight(e.nativeEvent.layout.height);
    }

    const queryChangeHandler = (value) => {
        setQuery(value);
    }

    const nextPageHandler = () => {
        setPaginationIdx(idx => {
            if (idx >= pagesCount - 1) {
                return pagesCount - 1;
            }

            return idx + 1;
        });
    }
    const prevPageHandler = () => {
        setPaginationIdx(idx => {
            if (idx <= 0) {
                return 0;
            }
            return idx - 1;
        });
    }
    const lastPageHandler = () => {
        setPaginationIdx(pagesCount - 1);
    }
    const firstPageHandler = () => {
        setPaginationIdx(0);
    }

    const SearchLabel = () => (
        <Text style={[globalStyles.text, { flexDirection: 'row' }]}>
            <SearchIcon size={styleVar.smallIconSize} /> Search
        </Text>
    )

    return (
        <View style={[styles.container, {
            width: Math.min(600, 0.95 * width)
        }]} onLayout={updateHeightHandler} >
            <View style={[globalStyles.basicContainer, styles.searchContainer]}>
                <Input
                    value={query}
                    setValue={setQuery}
                    onChange={queryChangeHandler}
                    label={<SearchLabel />}
                    style={styles.input}
                    containerStyle={styles.inputContainer}
                />
            </View>

            <View style={[globalStyles.basicContainer, styles.dataContainer]}>
                {(addButtonShown
                    && TEACHER_ROLES[teacher.role] > TEACHER_ROLES.TEACHER)
                    && <DataItemContainer
                        style={styles.addItem}
                        onPress={onAddButtonPress}>
                        <PlusIcon
                            size={70}
                            adjustsFontSizeToFit={true}
                            color={styleVar.blue} />
                    </DataItemContainer>
                }

                {data
                    .filter(d => filterCallback(query, d))
                    .slice(paginationIdx * itemsPerPage, (paginationIdx + 1) * itemsPerPage)
                    .map((d) => <DataItem key={d.id} data={d} actions={actions} />)}

                <View style={styles.paginationContainer}>
                    <OpacityButton onPress={firstPageHandler} style={styles.paginationButton}>
                        <ChevronDoubleLeftIcon size={styleVar.largeIconSize} />
                    </OpacityButton>
                    <OpacityButton onPress={prevPageHandler} style={styles.paginationButton}>
                        <ChevronLeftIcon size={styleVar.largeIconSize} />
                    </OpacityButton>

                    <Text style={[globalStyles.text, styles.paginationText]}>
                        {paginationIdx + 1} / {pagesCount}
                    </Text>

                    <OpacityButton onPress={nextPageHandler} style={styles.paginationButton}>
                        <ChevronRightIcon size={styleVar.largeIconSize} />
                    </OpacityButton>
                    <OpacityButton onPress={lastPageHandler} style={styles.paginationButton}>
                        <ChevronDoubleRightIcon size={styleVar.largeIconSize} />
                    </OpacityButton>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
    },
    addItem: {
        justifyContent: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 0
    },
    dataContainer: {
        margin: 20,
        padding: 0,
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: styleVar.white,
        borderRadius: 10,
    },
    searchContainer: {
        zIndex: 10,
        margin: 0,
        padding: 15,
        width: '100%',
        marginBottom: 30,
        flex: 'none',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    inputContainer: {
        marginTop: 0,
        width: '100%'
    },
    input: {
        width: '100%',
        textAlign: 'center'
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 15
    },
    paginationButton: {
        paddingHorizontal: 5,
        paddingVertical: 0,
        marginHorizontal: 5,
        marginVertical: 0,
        backgroundColor: styleVar.white,
    },
    paginationText: {
        paddingHorizontal: 5
    }
})

function getMaxItems(height, itemHeight) {
    const safeHeight = Math.max(height - 330, 0);
    return Math.floor(safeHeight / itemHeight) || 1;
}