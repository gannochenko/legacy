import React from 'react';
import { Container, Section, Title, Item } from './style.js';

export default () => (
    <Container>
        <Section>
            <Title>Content</Title>
            <Item to="/data/important-person">
                Important person Important person
            </Item>
            <Item to="/data/pet">Pet</Item>
            <Item to="/data/partner">Partner</Item>
        </Section>
        <Section>
            <Title>Settings</Title>
            <Item to="/structure">Structure</Item>
        </Section>
    </Container>
);
