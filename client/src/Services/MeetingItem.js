export default {
    getMeetingItems: () => {
        return fetch('/api/user/meetingitems')
            .then(response => {
                if (response.status !== 401) {
                    return response.json().then(data => data);
                }
                else
                    return { message: { msgBody: 'Unathorized' }, msgError: true };
            });
    },
    postMeetingItem: meetingitem => {
        return fetch('/api/meetingitem', {
            method: 'post',
            body: JSON.stringify(meetingitem),
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
    },
    deleteMeetingItem: meetingItemId =>{
        return fetch('/api/meetingitem/'+ meetingItemId, {
            method: 'delete'
        }).then(response => {
            if (response.status !== 401) {
                return response.json().then(data => data);
            }
            else
                return { message: { msgBody: 'Unathorized' }, msgError: true };
        });
    }
}