/** This allows the *particular* env variables to be loaded from the system,
 *  when we dont want the systemvars option of Dotenv to be enabled,
 *  and when we dont have .env file either.
 */

module.exports.allowedEnvVariables = [
    'SENDIN_BLUE_API_KEY',
    'CONTRIBUTOR_API_KEY',
    'CICD_API_KEY',
    'AWS_REGION',
];
