import { useContext, useEffect, useState } from "react";
import { Platform, StyleSheet, Text, useWindowDimensions, View } from "react-native";

import AntDesignIcon from 'react-native-vector-icons/AntDesign'

import Icon from 'react-native-vector-icons/FontAwesome'
import { SchoolContext } from "../../contexts/SchoolContext";
import { TEACHER_ROLES } from "../../services/util";

import Input from "../../components/Common/Input";
import OpacityButton from "../../components/Common/OpacityButton";
import DataItemContainer from './DataItemContainer'
import globalStyles from "../../styles/globalStyles";
import styleVar from "../../styles/styleVar";

export default function DataList({
    data,
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
        setPagesCount(newPages === 0 ? 1 : newPages);
    }, [height])

    useEffect(() => {
        setPaginationIdx(0);

        const filtered = data.filter(d => filterCallback(query, d));
        const itemsCount = filtered.length;
        const maxItems = getMaxItems(height, itemHeight);


        const newPages = Math.ceil(itemsCount / maxItems);
        setPagesCount(newPages === 0 ? 1 : newPages);
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
            <Icon size={styleVar.smallIconSize} color={styleVar.darkBlue} name='search' /> Search
        </Text>
    )

    return (
        <View style={[styles.container, {
            width: Math.min(600, 0.9 * width)
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
                        <AntDesignIcon name="plus"
                            size={70}
                            adjustsFontSizeToFit={true}
                            color={styleVar.blue} />
                    </DataItemContainer>
                }

                {data
                    .filter(d => filterCallback(query, d))
                    .slice(paginationIdx * itemsPerPage, (paginationIdx + 1) * itemsPerPage)
                    .map((d) => <DataItem key={d.id} data={d} />)}

                <View style={styles.paginationContainer}>
                    <OpacityButton onPress={firstPageHandler} style={styles.paginationButton}>
                        <Icon size={styleVar.largeIconSize} color={styleVar.darkBlue} name='angle-double-left' />
                    </OpacityButton>
                    <OpacityButton onPress={prevPageHandler} style={styles.paginationButton}>
                        <Icon size={styleVar.largeIconSize} color={styleVar.darkBlue} name='angle-left' />
                    </OpacityButton>

                    <Text style={[globalStyles.text, styles.paginationText]}>
                        {paginationIdx + 1} / {pagesCount}
                    </Text>

                    <OpacityButton onPress={nextPageHandler} style={styles.paginationButton}>
                        <Icon size={styleVar.largeIconSize} color={styleVar.darkBlue} name='angle-right' />
                    </OpacityButton>
                    <OpacityButton onPress={lastPageHandler} style={styles.paginationButton}>
                        <Icon size={styleVar.largeIconSize} color={styleVar.darkBlue} name='angle-double-right' />
                    </OpacityButton>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
        paddingTop: 20
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
    return Math.floor((height - 330) / itemHeight);
}

/*
 <View style={{ flexDirection: 'row' }}>
    <Input style={styles.paginationInput}
        containerStyle={{ marginTop: 0 }}
        onChange={(value) => setPaginationIdx(value)}
        value={paginationIdx}
    />
    <Text>/{pagesCount}</Text>
</View>
paginationInput: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        marginTop: 0,
        width: 20,
        height: 20,
        borderRadius: 10,
        textAlign: 'center'
    }
*/