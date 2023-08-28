import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
/** Cadastros/Logins/etc */
    container: { //Base: PRIMEIRO VIEW DE TODOS AZUL
        flex: 1,
        backgroundColor: "#16337E",
    },
    containerInner: {
        maxWidth: 500,
        width: "100%",
    },
    imagemTopo: { //logo DE CIMA
        alignItems: "center",
        paddingVertical: 40,
    },
    conteudo: { //CONTEÚDO ESCRITO COM BOTOES TEXTOS ETC => para cadastros
        backgroundColor: "#F4F4F4",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 40,
        paddingHorizontal: 40,
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    titulo: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
        color: '#16337E',
        fontWeight: 'bold',
        margin: 40,
    },
    input: {
        height: 50,
        width: "100%",
        fontSize: 17,
        padding: 10,
        alignSelf: 'stretch',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
        borderStyle: 'none',
        borderWidth: 1,
        backgroundColor: 'white',
        marginVertical: 12,
    },
    botao: {
        fontSize: 17,
        padding: 4,
        backgroundColor: '#16337E',
        borderRadius: 5,
        color: 'white',
        textDecorationColor: 'white',
        alignSelf: 'center',
        marginVertical: 40,
    },
    botaoPreto:{
        fontWeight: 'bolder',
    },
    linha: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
    },
    coluna: {
        flex: 1,
        alignItems: 'center',
    },
});