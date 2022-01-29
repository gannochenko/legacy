import axios from 'axios';

export const sendMessage = (email: string, subject: string, body: string) => {
    return axios.post(
        'https://api.sendinblue.com/v3/smtp/email',
        {
            sender: {
                name: 'Администратор сайта Архитектурный архив',
                email: 'noreply@prussiascan.ru',
            },
            to: [
                {
                    email,
                },
            ],
            subject,
            htmlContent: body,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'api-key': process.env.SENDIN_BLUE_API_KEY!,
            },
        },
    );
};
