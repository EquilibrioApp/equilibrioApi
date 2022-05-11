import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(1,1,1, 0.5)',
        // justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 22
    },
    subcontainer: {
        height: '80%',
        width: '90%',
        backgroundColor: '#fff',
        padding: 10,
        // marginTop: 22
    },
    headerContainer: {
        height: 45,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    subcontainerExpediente: {
        height: '60%',
        width: '90%',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
    },
    headerContainerExpediente: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    btnClose: {
        width: 25,
        height: 25,
        tintColor: '#CACACA',
    }
});