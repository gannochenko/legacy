export const template = `
html
    body
        h1 New message from Архитектурный Архив!
        h2 Message:
        p(style='white-space:pre-wrap') #{text}
        if contact
            h3 How to contact the author:
            p #{contact}
`;
