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



    deleteMeetingItem: async (meetingItemId) => {
        try {
            const response = await fetch('/api/meetingitem/' + meetingItemId, {
                method: 'delete'
            })
            if (response.status !== 401) {
                const data = await response.json()
                return data
            }
            return { message: { msgBody: 'Unathorized' }, msgError: true };
        } catch (error) {
            return { message: { msgBody: 'Server Error' }, msgError: true };
        }
    }
}