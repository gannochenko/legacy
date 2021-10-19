export const awsOptions = true
    ? {
          endpoint: 'http://localhost:4566',
          region: 'eu-central-1',
          accessKeyId: 'local',
          secretAccessKey: 'local',
      }
    : { region: process.env.AWS_REGION };
