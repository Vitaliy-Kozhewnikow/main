import React from 'react';
import {create, act} from 'react-test-renderer'
import ProfileStatus from "./ProfileStatus";


describe('ProfileStatus component', () => {
    test('Статус из props должен попасть в state', () => {
        let component;

        act(()=> {
            component = create(<ProfileStatus status = "vitos" updateStatus = {() => {}}/>);
        })

        const root = component.root;

        const span = root.findByType('span');
        expect(span.children[0]).toBe('vitos');
    })
})

