import React from 'react';
import { connect } from 'react-redux';
import { Container, Section, Title, Item } from './style';

const Menu = ({ schema }) => {
    if (!schema) {
        return null;
    }

    return (
        <Container>
            {!schema.isEmpty() && (
                <Section>
                    <Title>Content</Title>
                    {schema.getSchema().map(entity => (
                        <Item
                            to={`/data/${encodeURIComponent(entity.getName())}`}
                            key={entity.getName()}
                        >
                            {entity.getDisplayName()}
                        </Item>
                    ))}
                </Section>
            )}
            <Section>
                <Title>Settings</Title>
                <Item to="/schema">Schema</Item>
            </Section>
        </Container>
    );
};

export default connect(s => s.application)(Menu);
