// Importar las dependencias necesarias
const Alexa = require('ask-sdk-core');

// Intenciones personalizadas del juego
const StartGameIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest'
            || (Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && Alexa.getIntentName(handlerInput.requestEnvelope) === 'StartGameIntent');
    },
    handle(handlerInput) {
        // Aquí inicia tu juego
        // Puedes inicializar el tablero, establecer el turno inicial, etc.
        // Responde a Alexa para que inicie el juego
        const speechText = '¡Hola! Bienvenido a Ta Te Ti. Tú empiezas. Di la posición donde quieres jugar, por ejemplo, "superior izquierda" o "centro".';
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    },
};

const MakeMoveIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MakeMoveIntent';
    },
    handle(handlerInput) {
        // Aquí procesas el movimiento del jugador y juegas el turno de la máquina
        // Puedes verificar si el movimiento es válido, si alguien ganó o si hay un empate
        // Responde a Alexa con el resultado del movimiento y el nuevo estado del tablero
        const speechText = 'La máquina hizo su movimiento. Es tu turno.';
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    },
};

// Manejador para cuando el usuario detiene la habilidad
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Puedes realizar acciones de limpieza o guardar el estado del juego si es necesario
        return handlerInput.responseBuilder.getResponse();
    },
};

// Manejador para cuando ocurre un error
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.error(`Error ocurrido: ${error.message}`);
        const speechText = 'Lo siento, ha ocurrido un error.';
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    },
};

// Configurar el SDK de Alexa
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        StartGameIntentHandler,
        MakeMoveIntentHandler,
        SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
