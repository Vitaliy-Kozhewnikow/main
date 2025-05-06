
const MESSAGE_ACTION_TYPE = {
    ADD_MESSAGE: 'ADD-MESSAGE'
}

type messageDataType = {
    id: number
    message: string
    forMe: boolean
}
type DialogsDataType = {
    id: number
    name: string
}

type firstStateType = {
    messageData: messageDataType[]
    newMessageText:string
    dialogsData: DialogsDataType[]
}

type addMessageAction = {
    type : typeof MESSAGE_ACTION_TYPE.ADD_MESSAGE
    payload: string
}

type MessageActions =
    | addMessageAction

const firstState : firstStateType = {
    messageData: [
        { id: 1, message: 'Hi, i you ready ?', forMe: true },
        { id: 2, message: 'Lets go', forMe: false },
        { id: 3, message: 'You bot', forMe: true },
        { id: 4, message: 'Auto gladiators', forMe: false },
        { id: 5, message: 'Reason', forMe: true },

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

const messagesReducer = (state: firstStateType = firstState, action: MessageActions) => {

    const currentMessages = state.messageData ;

    switch (action.type) {


        case MESSAGE_ACTION_TYPE.ADD_MESSAGE:
            if (!action.payload?.trim()) return state; // Проверка на пустое сообщение
            const body = { 
                id: currentMessages.length + 1,
                message: action.payload,
                forMe: true
            };
            return { 
                ...state, 
                messageData: [...currentMessages, body]
            };
            default:
                return state
            

        
    }
}

export const addMessageActionCreator = (messageText: string) => {
    return {
        type: MESSAGE_ACTION_TYPE.ADD_MESSAGE,
        payload: messageText
    }
}



export default messagesReducer;