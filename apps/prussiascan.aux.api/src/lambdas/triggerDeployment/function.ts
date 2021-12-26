import axios from 'axios';

type TriggerDeploymentArgsType = Record<string, string>;

export const fn = async (args: TriggerDeploymentArgsType) => {
    const triggerUrl = process.env.DEPLOYMENT_TRIGGER_URL;
    if (!triggerUrl) {
        throw new Error('Trigger URL not set');
    }

    console.log('Executed!!!!!');
    return;

    // const result = await axios.post(triggerUrl);
    //
    // if (result.data?.job?.state === 'PENDING') {
    //     return true;
    // } else {
    //     throw new Error('Could not run re-deployment');
    // }
};
