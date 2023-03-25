import {Homework} from "edulinkone-api/build/types/result";
import {ScrollView, StyleSheet} from "react-native";
import React from "react";
import Task from "./Task";

type SectionProps = {
	homework: Array<Homework>
}

export default function Section(props: SectionProps) {
	let tasks: Array<JSX.Element> = [];

	for (let i = 0; i < props.homework.length; i++) {
		tasks.push(
			<Task dueDate={props.homework[i].due_date}
				  name={props.homework[i].activity}
				  class={props.homework[i].subject}
				  completed={props.homework[i].completed}
			/>
		)
	}

	return(
		<ScrollView style={styles.Section}>
			{tasks}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	Section: {
		width: "100%",
		borderBottomWidth: 2
	}
})