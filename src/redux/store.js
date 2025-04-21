import messagesReducer from "./messagesReducer"
import profileReducer from "./profileReducer"


const store = {

    _state: {

        profilePage: {
            postsData: [
                { id: 1, text: 'Suck me Dick', likesCount: 123 },
                { id: 2, text: 'Suck me Di', likesCount: 1234 },
                { id: 3, text: 'Suck me ', likesCount: 12345 },
                { id: 4, text: 'Suck ', likesCount: 123456 }
            ],
            newPostText: 'New Text and'
        },

        messagesPage: {
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
        },

        sidebar: {
            nameFriends: [

            ]
        }

    },
    _callSub() {
        console.log('WW')
    },

    getState() {
        return this._state;
    },
    subcribe(observer) {
        this._callSub = observer;
    },


    dispatch(action) {    

        this._state.profilePage = profileReducer(this._state.profilePage , action)

        this._state.messagesPage = messagesReducer(this._state.messagesPage , action)

        this._callSub(this._state);
        
    }
}
  



export default store;
window.store = store;