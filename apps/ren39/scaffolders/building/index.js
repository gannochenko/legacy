const path = require('path');
const slugify = require('transliteration').slugify;
const transliterate = require('transliteration').transliterate;

module.exports.Generator = class Generator {
    getName() {
        // this is the name your generator will appear in the list under
        return 'building';
    }

    async getQuestions() {
        // see inquirer docs to get more information on the format of questions
        // https://www.npmjs.com/package/inquirer#questions
        return [
            {
                message: 'What is the building name?',
                name: 'building_name',
            },
            {
                message: 'What are the coordinates?',
                name: 'building_coordinates',
            },
            {
                message: 'Capture date?',
                name: 'capture_date',
                default: '29/03/2021',
            },
        ];
    }

    async refineAnswers(answers) {
        answers.building_translit = transliterate(answers.building_name);

        answers.building_code = slugify(
            answers.building_name,
        );

        return answers;
    }
};
