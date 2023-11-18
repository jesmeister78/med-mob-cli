import { ActivityIndicator, Button, Text, TouchableOpacity, View } from "react-native";
import { StackNavigation } from "../App";
import styles from "../styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCases, selectAllCases } from "../store/cases";
import { AppDispatch, RootState } from "../store";
import { useAppDispatch, useAppSelector } from "../hooks";
import { unwrapResult } from "@reduxjs/toolkit";


interface CaseScreenProps {
    navigation: StackNavigation;
}

const CaseScreen: React.FC<CaseScreenProps> = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state: RootState) => state.cases);
    const cases = useAppSelector(selectAllCases);

    useEffect(() => {
        dispatch(fetchCases()).unwrap()
            .then((originalPromiseResult) => {
                // handle result here
                console.log(originalPromiseResult)
            })
            .catch((rejectedValueOrSerializedError) => {
                // handle error here
                console.log(rejectedValueOrSerializedError)
                console.log('blah')
            });
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" style={styles.loader} />;
    }
    const handleReload = async () => {
        await dispatch(fetchCases())
          .then(unwrapResult)
          .then(originalPromiseResult => {<View style={styles.dataContainer}>
            <Text>{originalPromiseResult.toString()}</Text>
          </View>})
          .catch(rejectedValueOrSerializedError => {
            <Text>{rejectedValueOrSerializedError.toString()}</Text>})
      }
    return (
        <View>
      <Button title={'Reload'} onPress={handleReload} />
      {cases.map((c) => {
        return (
          <View style={styles.container} key={c.id}>
            <View>
              <View style={styles.dataContainer}>
                <Text>
                  {c.id} {c.name}
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
