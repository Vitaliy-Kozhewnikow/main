import { jest } from '@jest/globals';
import profileReducer, { addPostActionCreator, deletePost } from "./profileReducer.ts";

const state = {
    postsData: [
        { id: 1, text: 'Post 1', likesCount: 10 },
        { id: 2, text: 'Post 2', likesCount: 20 }
    ]
};


describe('profileReducer', () => {
    it('should increment posts length', () => {
        //1.test data
        const action = addPostActionCreator('New post');
        //2.action
        const newState = profileReducer(state, action);
        //3.expectation
        expect(newState.postsData).toHaveLength(3);
        expect(newState.postsData[2].text).toBe('New post');
    });
});


//tdd ( протестировали логику, которой еще нет в нашем проекте)
describe('profileReducer', () => {
    it('after deleting lenght of messages should be decrement', () => {
        //1.test data
        const action = deletePost(1);

        //2.action
        const newState = profileReducer(state, action);
        //3.expectation
        expect(newState.postsData).toHaveLength(1);
    });
});