import messagesReducer, { addMessageActionCreator } from './messagesReducer';

describe('messagesReducer', () => {
  const initialState = {
    messageData: [
      { id: 1, message: 'Hi, i you ready ?', forme: true },
      { id: 2, message: 'Lets go', forme: false },
      { id: 3, message: 'You bot', forme: true },
      { id: 4, message: 'Auto gladiators', forme: false },
      { id: 5, message: 'Reason', forme: true },
    ],
    dialogsData: [] // Добавляем для соответствия структуре редьюсера
  };

  it('должен добавить новое сообщение', () => {
    // 1. Подготовка данных
    const action = addMessageActionCreator('hi, boy');
    
    // 2. Вызов редьюсера
    const newState = messagesReducer(initialState, action);
    
    // 3. Проверки
    expect(newState.messageData).toHaveLength(6);
    
    // Проверяем последнее добавленное сообщение
    const lastMessage = newState.messageData[newState.messageData.length - 1];
    expect(lastMessage).toEqual({
      id: 6,
      message: 'hi, boy',
      forme: true
    });
  });
});