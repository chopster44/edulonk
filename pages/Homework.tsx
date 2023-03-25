import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {edulink} from "./Login";
import storage from "../storage/storage";
import Section from "../components/homework/Section";

export function Homework() {
	let [homework, setHomework] = useState([]);
	let [username, setUsername] = useState(null);
	let [isReady, makeReady] = useState(false);
	useEffect(() => {
		async function getData() {
			try {
				let data = await edulink.getCurrentHomework();
				// @ts-ignore
				setHomework(data);

				await storage.load({
					key: 'username'
				}).then(data => {
					setUsername(data.user)
				});
			} catch (e) {
				console.warn(e);
			} finally {
				makeReady(true);
			}
		}

		getData();
	}, []);

	if(!isReady) {
		return null;
	}

	return (
		<View style={styles.container}>
			<View style={styles.box1}>
				<Button title={"Back"} />
				<Text style={styles.h2}>Homework: {username ?? "12x34567"}</Text>
			</View>
			<View style={styles.box2}>
				<Section homework={homework} />
			</View>

		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: "20%",
		width: "100%",
		flexDirection: "column",
		backgroundColor: "#F2F2F2"
	},
	box1: {
		width: "100%",
		alignItems: "center",
		flexDirection: "row",
		paddingBottom: "5%",
		justifyContent: "center",
		gap: 20
	},
	box2: {
		width: "100%",
		paddingLeft: "5%",
		paddingRight: "5%",
		marginBottom: "15%"
	},
	h2: {
		fontSize: 25,
		color: "#333333",
	},
})