
const ADD_MESSAGE = 'ADD-MESSAGE'

const firstState = { 
    messageData: [
        { id: 1, message: 'Hi, i you ready ?', forme: true },
        { id: 2, message: 'Lets go', forme: false },
        { id: 3, message: 'You bot', forme: true },
        { id: 4, message: 'Auto gladiators', forme: false },
        { id: 5, message: 'Reason', forme: true },

    ],

    newMessageText: 'Hi',

    dialogsData: [
        { id: 1, name: 'Dasha' },
        { id: 2, name: 'Polina' },
        { id: 3, name: 'Mamed' },
        { id: 4, name: 'Vanya' },
        { id: 5, name: 'Andrey' }
    ]
}

const messagesReducer = (state = firstState, action) => {

    const currentMessages = state.messageData ;

    switch (action.type) {


        case ADD_MESSAGE:
            if (!action.payload?.trim()) return state; // Проверка на пустое сообщение
            const body = { 
                id: currentMessages.length + 1,
                message: action.payload,
                forme: true
            };
            return { 
                ...state, 
                messageData: [...currentMessages, body]
            };
            default:
                return state
            

        
    }
}

export const addMessageActionCreator = (messageText) => {
    return {
        type: ADD_MESSAGE,
        payload: messageText
    }
}



export default messagesReducer;