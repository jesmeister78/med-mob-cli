import { ActivityIndicator, Button, Text, TouchableOpacity, View } from "react-native";
import { StackNavigation } from "../App";
import styles from "../styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCases, selectAllCases } from "../store/cases";
import { AppDispatch, RootState } from "../store";


interface CaseScreenProps {
    navigation: StackNavigation;
}

const CaseScreen: React.FC<CaseScreenProps> = ({ navigation }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: RootState) => state.cases);
    const cases = useSelector(selectAllCases);

    useEffect(() => {
        dispatch(fetchCases());
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" style={styles.loader} />;
    }

    return (
        <View>
            <Button title={'Reload'} onPress={() => dispatch(fetchCases())} />
            {cases.map((c) => {
                return (
                    <View style={styles.container} key={c.id}>
                        <View>
                            <View style={styles.dataContainer}>
                                <Text>
                                    {c.name}
                                </Text>
                            </View>
                            <View style={styles.dataContainer}>
                                <Text>{c.year}</Text>
                            </View>
                        </View>
                    </View>
                );
            })}
        </View>
    );
}

export default CaseScreen;
