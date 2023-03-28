/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const speakOutputJson = require('./speakOutput.json');
const util = require('./util.js');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = speakOutputJson['WELCOME_FLOW_MESSAGE'];
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.flow = 'session_started';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const topics = ['Cursos de graduação', 'Pós graduação', 'Formas de ingresso', 'outros']
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        let speakOutput;
        
        if (sessionAttributes.flow == 'session_started') { 
            sessionAttributes.flow = '';
            speakOutput = `${speakOutputJson['HELP_FLOW_MESSAGE']} Você gostaria de saber sobre: ${util.setList(topics)}`;
        } else {
            speakOutput = `Certo, você gostaria de saber sobre: ${util.setList(topics)}`;
        }


        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const GraduationIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GraduationIntent';
    },
    handle(handlerInput) {
        const speakOutput = speakOutputJson['GRADUATION_FLOW_MESSAGE'];
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.flow = 'graduation_question';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


const GraduationCoursesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GraduationCoursesIntent';
    },
    handle(handlerInput) {
        let speakOutput;
        let course = Alexa.getSlotValue(handlerInput.requestEnvelope, "courses");
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
         
        if (sessionAttributes.flow == 'admission_forms_question' || course) {
            if (course.indexOf("engenharia") != -1) {
                sessionAttributes.flow = 'engineering_admission_forms';
            } else {
                sessionAttributes.flow = 'science_admission_forms';
            }
            return AdmissionFormsIntentHandler.handle(handlerInput);
        } else if (sessionAttributes.flow != 'graduation_question' || !course) {
            sessionAttributes.flow = '';
            return GraduationIntentHandler.handle(handlerInput);
        }
        
        sessionAttributes.flow = 'graduation_course_question';
        
        if (course.indexOf("engenharia") != -1) {
            speakOutput = speakOutputJson['COMPUTER_ENGINEERING_FLOW_MESSAGE'];
        } else {
            speakOutput = speakOutputJson['COMPUTER_SCIENCE_FLOW_MESSAGE'];
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const AdmissionFormsIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AdmissionFormsIntent';
    },
    handle(handlerInput) {
        let speakOutput = speakOutputJson['ADMISSION_FORMS_FLOW_MESSAGE'];
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        if (sessionAttributes.flow == 'science_admission_forms') {
            speakOutput = speakOutputJson['SCIENCE_ADMISSION_FORMS_FLOW_MESSAGE'] + " Deseja ouvir sobre as atividades complementares?";
            sessionAttributes.flow = 'admission_forms_second_question';
        } else if (sessionAttributes.flow == 'engineering_admission_forms') {
            speakOutput = speakOutputJson['ENGINEERING_ADMISSION_FORMS_FLOW_MESSAGE'] + " Deseja ouvir sobre as atividades complementares?";
            sessionAttributes.flow = 'admission_forms_second_question';
        } else {
            sessionAttributes.flow = 'admission_forms_question';
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const ResearchLinesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ResearchLinesIntent';
    },
    handle(handlerInput) {
        const speakOutput = speakOutputJson['RESEARCH_LINES_FLOW_MESSAGE'];
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.flow = 'research_lines_question';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const PostGraduationIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PostGraduationIntent';
    },
    handle(handlerInput) {
        const speakOutput = speakOutputJson['POST_GRADUATION_FLOW_MESSAGE'];
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.flow = 'post_graduation_question';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const AdditionalActivitiesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AdditionalActivitiesIntent';
    },
    handle(handlerInput) {
        const speakOutput = speakOutputJson['ADDITIONAL_ACTIVITIES_FLOW_MESSAGE'];
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.flow = 'additional_activities_question';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const OthersIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'OthersIntent';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.flow = 'others_first_question';
        const speakOutput = speakOutputJson['OTHERS_QUESTION_FLOW_MESSAGE'];
        

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const YesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent';
    },
    async handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        let speakOutput;
        
        switch (sessionAttributes.flow) {
            case `others_first_question`:
                sessionAttributes.flow = '';          
                return AdditionalActivitiesIntentHandler.handle(handlerInput);
            break;
            case `others_second_question`:
                sessionAttributes.flow = '';          
                return ResearchLinesIntentHandler.handle(handlerInput);
            break;
            case 'post_graduation_question':
                sessionAttributes.flow = '';          
                return ResearchLinesIntentHandler.handle(handlerInput);
            break;
            case 'research_lines_question':
                sessionAttributes.flow = '';          
                return GraduationIntentHandler.handle(handlerInput);
            break;
            case 'additional_activities_question':
                sessionAttributes.flow = '';          
                return PostGraduationIntentHandler.handle(handlerInput);
            break;
            case 'graduation_course_question':
                sessionAttributes.flow = '';          
                return AdmissionFormsIntentHandler.handle(handlerInput);
            break;
            case 'admission_forms_second_question':
                sessionAttributes.flow = '';          
                return AdditionalActivitiesIntentHandler.handle(handlerInput);
            break;
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const NoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent';
    },
    async handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        let speakOutput;
        let continuar
        let mensagem_continuar
        
        switch (sessionAttributes.flow) {
            case `others_first_question`:
                sessionAttributes.flow = 'others_second_question';       
                speakOutput = speakOutputJson['OTHERS_SECOND_QUESTION_FLOW_MESSAGE'];
            break;
            case `others_second_question`:
                sessionAttributes.flow = '';       
                return CancelAndStopIntentHandler.handle(handlerInput);
            break;
            case 'post_graduation_question':
                sessionAttributes.flow = '';          
                return HelpIntentHandler.handle(handlerInput);
            break;
            case 'research_lines_question':
                sessionAttributes.flow = '';          
                return HelpIntentHandler.handle(handlerInput);
            break;
            case 'additional_activities_question':
                sessionAttributes.flow = '';          
                return HelpIntentHandler.handle(handlerInput);
            break;
            case 'graduation_course_question':
                sessionAttributes.flow = '';          
                return OthersIntentHandler.handle(handlerInput);
            break;
            case 'admission_forms_second_question':
                sessionAttributes.flow = '';          
                return OthersIntentHandler.handle(handlerInput);
            break;
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = speakOutputJson['ENDING_FLOW_MESSAGE'];

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = speakOutputJson['OTHERS_QUESTION_FLOW_MESSAGE'];

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        GraduationIntentHandler,
        OthersIntentHandler,
        AdmissionFormsIntentHandler,
        GraduationCoursesIntentHandler,
        ResearchLinesIntentHandler,
        HelpIntentHandler,
        PostGraduationIntentHandler,
        AdditionalActivitiesIntentHandler,
        YesIntentHandler,
        NoIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();