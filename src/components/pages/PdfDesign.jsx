import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const PdfDesign = ({ results }) => {
    const styles = StyleSheet.create({
        page: {
            flexDirection: "row",
            backgroundColor: "#ffffff",
            margin: 10,
            padding: 25,
            flexGrow: 1,
        },
        logodiv: {
            alignItems: "center",
        },
        logo: {
            marginBottom: 10,
            fontSize: "24",
        },
        table: {
            borderColor: "black",
            marginBottom: 30,
            marginTop: 10,
            width: "100%",
        },
        row: {
            flexDirection: "row",
            backgroundColor: "#fff",
            alignItems: "center",
        },
        cell: {
            padding: 10,
            width: "19%",
            borderWidth: 1,
            textAlign: "center",
            fontSize: 12,
            color: "black",
            borderColor: "black",
            fontWeight: "semibold",
        },
        questiondiv: {
            alignItems: "flex-start",
            justifyContent: "flex-start",
            textAlign: "left",
        },
        question: {
            color: "#4ADE80",
            fontSize: 14,
            width: 450,
        },
        questiond: {
            color: "#FA3434",
            fontSize: 14,
            width: 450,
        },
        subquestiondiv: {
            margin: 20,
            gap: 7,
        },
        subquestionone: {
            borderWidth: 1,
            borderColor: "#9CA3AF",
            width: 400,
            paddingVertical: 7,
            paddingHorizontal: 15,
            borderRadius: 3,
            fontSize: 12,
            backgroundColor: "#f91f1fe7",
            color: "#fff",
        },
        subquestiontwo: {
            borderWidth: 1,
            width: 400,
            paddingVertical: 7,
            borderColor: "#9CA3AF",
            paddingHorizontal: 15,
            borderRadius: 3,
            fontSize: 12,
            backgroundColor: "#4ADE80",
            color: "#fff",
        },
        subquestionthree: {
            borderWidth: 1,
            width: 400,
            paddingVertical: 7,
            borderColor: "#9CA3AF",
            paddingHorizontal: 15,
            borderRadius: 3,
            fontSize: 12,
            color: "#000",
        },
        subquestionfour: {
            borderWidth: 1,
            width: 400,
            paddingVertical: 7,
            borderColor: "#9CA3AF",
            paddingHorizontal: 15,
            borderRadius: 3,
            fontSize: 12,
            color: "#000",
        },
    });
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View>
                    <View style={styles.logodiv}>
                        <Text style={styles.logo}>iCAN-IQ</Text>
                        {/* <Text style={styles.logo}>{userData.name}</Text> */}
                    </View>
                    <View style={styles.table}>
                        <View style={styles.row}>
                            <Text style={styles.cell}>Correct Answer</Text>
                            <Text style={styles.cell}>Wrong Answer</Text>
                            <Text style={styles.cell}>Total Question</Text>
                            <Text style={styles.cell}>Time Taken</Text>
                            <Text style={styles.cell}>Exam Time</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cell}>
                                {results.history.correct}
                            </Text>
                            <Text style={styles.cell}>
                                {results.history.wrong}
                            </Text>
                            <Text style={styles.cell}>
                                {results.history.total}
                            </Text>
                            <Text style={styles.cell}>
                                {results.history.time_taken}
                            </Text>
                            <Text style={styles.cell}>
                                {results.history.exam_time} mins
                            </Text>
                        </View>
                    </View>

                    {results.data.map((item, index) => (
                        <View style={styles.questiondiv} key={index}>
                            <Text
                                style={
                                    item.is_correct == 1
                                        ? styles.question
                                        : styles.questiond
                                }
                            >
                                {index + 1}. {item.question_test_text}
                            </Text>
                            <View style={styles.subquestiondiv}>
                                {item.choices.map((sitem, index) => (
                                    <Text
                                        key={sitem.id}
                                        style={
                                            !item.is_correct
                                                ? item.wrong_id == sitem.id
                                                    ? styles.subquestionone
                                                    : sitem.is_correct == 1
                                                    ? styles.subquestiontwo
                                                    : styles.subquestionthree
                                                : item.correct_id == sitem.id
                                                ? styles.subquestiontwo
                                                : styles.subquestionthree
                                        }
                                    >
                                        {index + 1}. {sitem.choice_text}
                                    </Text>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );
};

export default PdfDesign;
