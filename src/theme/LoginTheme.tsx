import { StyleSheet } from "react-native";



export const loginStyles = StyleSheet.create({
    formContainer: {
        flex: 1,
        paddingHorizontal: 80,
        justifyContent: 'center',
        height: 600,
        marginBottom: 70,
        borderTopLeftRadius: 75,
        top: 33
    },
    title: {
        color: 'black',
        fontSize: 28,
        justifyContent: 'center',
        fontWeight: 'bold',
        fontFamily: 'Comfortaa', 
        top: 25
    },
    label: {
        top: 5,
        marginVertical: -5,
        color: 'black',
        marginTop: 35,
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Comfortaa',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputField: {
        color: 'black',
        fontSize: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        fontWeight: 'light'
    },
    inputFieldIOS: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingBottom: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 85
    },
    button: {
        borderWidth: 2,
        borderColor: 'black',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        color: 'black'
    },
    bottomLinks: {
        marginTop: 22,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomLinksText: {
        fontWeight: 'bold',
        fontSize: 12,
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonReturn: {
        position: 'absolute',
        bottom: 10,
        right: 20,
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 100
    }
});