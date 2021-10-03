export const awsOptions = true
    ? {
          endpoint: 'http://localhost:4566',
          region: 'us-east-1',
          accessKeyId: 'local',
          secretAccessKey: 'local',
      }
    : { region: 'eu-central-1', apiVersion: '2012-08-10' };
