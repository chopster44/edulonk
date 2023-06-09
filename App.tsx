import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet, View } from 'react-native';
import React, {useCallback, useEffect, useState} from "react";
import Screen from "./components/Screen";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Timetable from "./pages/Timetable";
import {Homework} from "./pages/Homework";
import storage from "./storage/storage";


SplashScreen.preventAutoHideAsync();

export default function App() {
	const [screen, changeScreen] = useState(0);

	// hide the checking of user data behind loading screen
	const [appIsReady, setAppIsReady] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [schoolId, setSchoolId] = useState("");
	const [logged, setLogged] = useState(true);

	useEffect(() => {

		async function checkData() {
			await storage.load({
				key: 'loginData'
			}).then(data => {
				setUsername(data.username);
				setPassword(data.password);
				setSchoolId(data.schoolId);
			})
		}

		async function prepare() {
			try {
				await checkData();
			} catch (e) {
				setLogged(false);
			} finally {
				// Tell the application to render
				setAppIsReady(true);
			}
		}

		prepare();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			// This tells the splash screen to hide immediately! If we call this after
			// `setAppIsReady`, then we may see a blank screen while the app is
			// loading its initial state and rendering its first pixels. So instead,
			// we hide the splash screen once we know the root view has already
			// performed layout.
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return null;
	}

	return (
		<View style={styles.container} onLayout={onLayoutRootView}>
			<Screen screen={screen}>
				<Login changeScreen={changeScreen} quickLog={{login: logged, username, password, schoolId}}/>
				<Home changeScreen={changeScreen} />
				<Timetable changeScreen={changeScreen} />
				<Homework changeScreen={changeScreen} />
			</Screen>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: "100%",
		backgroundColor: "#F2F2F2"
	},
	box1: {
		width: "100%"
	}

});
