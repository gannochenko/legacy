import React from 'react';
import { connect } from 'react-redux';
import { Container, Section, Title, Item } from './style.js';
import { uCFirst } from 'ew-internals';

const makeDisplay = name => {
    return uCFirst(name).replace(/_/g, ' ');
};

const Menu = ({ structure }) => {
    if (!structure) {
        return null;
    }

    return (
        <Container>
            {!structure.isEmpty() && (
                <Section>
                    <Title>Content</Title>
                    {structure.get().map(entity => (
                        <Item to={`/data/${entity.name}`} key={entity.name}>
                            {makeDisplay(entity.name)}
                        </Item>
                    ))}
                </Section>
            )}
            <Section>
                <Title>Settings</Title>
                <Item to="/structure">Structure</Item>
            </Section>
        </Container>
    );
};

export default connect(s => s.application)(Menu);
