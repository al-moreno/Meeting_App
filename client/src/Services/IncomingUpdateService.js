export default {
    getIncomingUpdates: () => {
        return fetch('/user/incomingupdates')
            .then(response => {
                if (response.status !== 401) {
                    return response.json().then(data => data);
                }
                else
                    return { message: { msgBody: 'Unathorized' }, msgError: true };
            });
    },
    postIncomingUpdate: incomingupdate => {
        return fetch('/user/incomingupdate', {
            method: 'post',
            body: JSON.stringify(incomingupdate),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status !== 401) {
                return response.json().then(data => data);
            }
            else
                return { message: { msgBody: 'Unathorized' }, msgError: true };
        });
    }
}